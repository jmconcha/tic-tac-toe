export const BOARD = {
  row: 3,
  column: 3,
};

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function initializePlayerMoveData() {
  return Array.from({ length: BOARD.row }).map(
    (_, rowIndex) => Array(BOARD.column).fill(null)
  );
}