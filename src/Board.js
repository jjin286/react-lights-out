import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let y = 0; y < nrows; y++) {
      initialBoard[y] = [];
      for (let x = 0; x < ncols; x++) {
        const lightOn = Math.random() > chanceLightStartsOn ? false : true;
        initialBoard[y].push(lightOn);
      }
    }
    return initialBoard;
  }

  /** Evaluates whether board has true in any cells
   * variables board, nrows, and ncols are all pulled from state
   * returns false if true is present, true if not
   */
  function hasWon() {
    for (let y = 0; y < nrows; y++) {
      for (let x = 0; x < ncols; x++) {
        if (board[y][x] === true) return false;
      }
    }

    return true;
  }

  /** Takes coordinates of a cell, flips it and adjacent cells
   * Sets new state with a deep copy of updated board
   */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);

      return boardCopy;
    });
  }

  if (hasWon())
    return (
      <div>
        You won!
      </div>
    );

  return (
    <div>
      <table>
        <tbody>
          {board.map((row, yIdx) => {
            return (
              <tr key={`row ${yIdx}`}>
                {
                  row.map((el, xIdx) => {
                    return (
                      <Cell
                        key={`${yIdx}-${xIdx}`}
                        flipCellsAroundMe={function () { flipCellsAround(`${yIdx}-${xIdx}`) }}
                        isLit={el}
                      />);
                  })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
