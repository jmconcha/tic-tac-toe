import React, { useState } from 'react';
import styled from 'styled-components';

import GameContext from './GameContext';
import { initializePlayerMoveData } from './utils';

import Board from './Board';
import GameStatus from './GameStatus';

const StyledAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function App() {
  const initialPlayerMoveData = initializePlayerMoveData();

  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('');
  const [playerMovesHistory, setPlayerMovesHistory] = useState([initialPlayerMoveData]);
  const [playerWentBackTo, setPlayerWentBackTo] = useState(-1);
  const [isGameOver, setIsGameOver] = useState(false);

  const providerValue = {
    currentPlayer, setCurrentPlayer,
    winner, setWinner,
    playerMovesHistory, setPlayerMovesHistory,
    playerWentBackTo, setPlayerWentBackTo,
    isGameOver, setIsGameOver,
  };

  return (
    <GameContext.Provider value={providerValue}>
      <StyledAppContainer>
        <Board />
        <GameStatus />
      </StyledAppContainer>
    </GameContext.Provider>
  );
}

export default App;
