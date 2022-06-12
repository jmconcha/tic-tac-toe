import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import { BOARD, initializePlayerMoveData, WINNING_COMBINATIONS } from './utils';
import GameContext from './GameContext';

import Tile from './Tile';

const StyledBoard = styled.div`
  margin: 50px auto;
  width: 120px;
  height: 120px;
  display: grid;
  grid-template-columns: repeat(3, auto);
`;

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
  return WINNING_COMBINATIONS.some(combination => (
    mappedPlayerMoves[combination[0]] === currentPlayer &&
    mappedPlayerMoves[combination[1]] === currentPlayer &&
    mappedPlayerMoves[combination[2]] === currentPlayer
  ));
}

function Board() {
  const initialPlayerMoveData = initializePlayerMoveData();
  const [playerMoves, setPlayerMoves] = useState(initialPlayerMoveData);

  const {
    currentPlayer, setCurrentPlayer,
    setWinner,
    playerMovesHistory, setPlayerMovesHistory,
    playerWentBackTo, setPlayerWentBackTo,
    isGameOver, setIsGameOver,
   } = useContext(GameContext);

  const handlePlayerMoves = (targetLocation) => {
    const targetPositionIsNotEmpty  = playerMoves[targetLocation.x][targetLocation.y] !== null;
    if (isGameOver || targetPositionIsNotEmpty) return;

    if (playerWentBackTo > -1) {
      setPlayerMovesHistory(prevState => {
        const prevStateClone = _.cloneDeep(prevState);
        const newState = prevStateClone.slice(0, playerWentBackTo + 1);
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

  useEffect(() => {
    const previousPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const isPreviousPlayerWinner = checkWinner(playerMoves, previousPlayer);
    if (isPreviousPlayerWinner) {
      setWinner(previousPlayer);
      setIsGameOver(isPreviousPlayerWinner);
    }
  }, [playerMoves, currentPlayer, setWinner, setIsGameOver]);

  useEffect(() => {
    if (playerWentBackTo > -1) {
      setPlayerMoves(playerMovesHistory[playerWentBackTo]);
      const nextPlayer = playerWentBackTo % 2 === 0 ? 'X' : 'O';
      setCurrentPlayer(prevState => nextPlayer);
    }
  }, [playerMovesHistory, playerWentBackTo, setCurrentPlayer]);

  useEffect(() => {
    if ((playerMovesHistory.length - 1) === (BOARD.row * BOARD.column)) {
      if (!isGameOver) {
        setIsGameOver(true);
      }
    }
  }, [isGameOver, playerMovesHistory, setIsGameOver]);

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
    </div>
  );
}

export default Board;

