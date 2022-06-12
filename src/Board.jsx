import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Tile from './Tile';
import GameStatus from './GameStatus';

const BOARD = {
  row: 3,
  column: 3,
};
const TILE_COUNT = BOARD.row * BOARD.column;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const StyledBoard = styled.div`
  margin: 50px auto;
  width: 120px;
  height: 120px;
  display: grid;
  grid-template-columns: repeat(3, auto);
`;

// function generatePlayerMoveData(moves, player, moveLocation) {
//   const movesData

//   if (movesData[moveLocation.x][moveLocation.y] === null) {
//     movesData[moveLocation.x][moveLocation.y] = player;
//   }

//   return movesData;
// }

function initializePlayerMoveData() {
  return Array.from({ length: BOARD.row }).map(
    (_, rowIndex) => Array(BOARD.column).fill(null)
  );
}

function updatePlayerMoves(playerMoves, currentPlayer, targetLocation) {
  return playerMoves.map((rowValues, rowIndex) => {
    const newRowValues = [...rowValues];

    if (rowIndex === targetLocation.x && rowValues[targetLocation.y] === null) {
      newRowValues[targetLocation.y] = currentPlayer;
    }

    return newRowValues;
  });
}

function checkWinner(playerMoves, currentPlayer) {
  const mappedPlayerMoves = playerMoves.flat();
  console.log('mappedPlayerMoves', mappedPlayerMoves);
  return WINNING_COMBINATIONS.some(combination => (
    mappedPlayerMoves[combination[0]] === currentPlayer &&
    mappedPlayerMoves[combination[1]] === currentPlayer &&
    mappedPlayerMoves[combination[2]] === currentPlayer
  ));
}

function Board() {
  const initialPlayerMoveData = initializePlayerMoveData();
  const [playerMoves, setPlayerMoves] = useState(initialPlayerMoveData);
  const [playerMovesHistory, setPlayerMovesHistory] = useState([initialPlayerMoveData]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [playerWentBackTo, setPlayerWentBackTo] = useState(-1);

  const handlePlayerMoves = (targetLocation) => {
    const targetPositionIsNotEmpty  = playerMoves[targetLocation.x][targetLocation.y] !== null;
    if (isGameOver || targetPositionIsNotEmpty) return;

    if (playerWentBackTo > -1) {
      setPlayerMovesHistory(prevState => {
        const prevStateClone = _.cloneDeep(prevState);
        const newState = prevStateClone.slice(0, playerWentBackTo);
        return newState;
      });
      setPlayerWentBackTo(-1);
    }

    const newPlayerMovesData = updatePlayerMoves(playerMoves, currentPlayer, targetLocation);
    setPlayerMoves(newPlayerMovesData);
    setPlayerMovesHistory(prevState => ([
      ...prevState,
      newPlayerMovesData,
    ]));
    setCurrentPlayer(prevState => prevState === 'X' ? 'O' : 'X');
  };

  console.log('playerMoves', playerMoves);
  useEffect((props) => {
    const previousPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const isPreviousPlayerWinner = checkWinner(playerMoves, previousPlayer);
    if (isPreviousPlayerWinner) {
      setWinner(previousPlayer);
      setIsGameOver(isPreviousPlayerWinner);
    }
    console.log('isCurrentPlayerWinner', isPreviousPlayerWinner);
  }, [playerMoves, currentPlayer]);

  useEffect(() => {
    if (playerWentBackTo > -1) {
      setPlayerMoves(playerMovesHistory[playerWentBackTo]);
      const tempPlayer = playerWentBackTo % 2 === 0 ? 'X' : 'O';
      console.log('here playerWentBackTo', playerWentBackTo);
      console.log('tempPlayer', tempPlayer);
      setCurrentPlayer(prevState => tempPlayer);
    }
  }, [playerWentBackTo]);

  return (
    <div>
      <StyledBoard>
        {playerMoves.map((rowValues, rowIndex) => {
          return rowValues.map((val, columnIndex) => {
            return (
              <Tile
                key={`${rowIndex}${columnIndex}`}
                text={val}
                handlePlayerMoves={() => handlePlayerMoves({ x: rowIndex, y: columnIndex })}
              />
            );
          });
        })}
      </StyledBoard>
      <GameStatus
        currentPlayer={currentPlayer}
        isGameOver={isGameOver}
        winner={winner}
        playerMovesHistory={playerMovesHistory}
        setPlayerWentBackTo={setPlayerWentBackTo}
      />
    </div>
  );
}

export default Board;

