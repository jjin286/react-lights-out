import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just three props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * - idx: string, coordinates for cell rec'd from the board
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  /** Flips a cell and the adjacent cells around it
   * Activated with click event
   **/
  // function flip() {flipCellsAroundMe(idx)}
  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
