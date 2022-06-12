import React, { useContext } from 'react';
import styled from 'styled-components';

import GameContext from './GameContext';

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;

  button {
    flex: 1;
    margin: 5px 5px;
    padding: 8px 12px;
    cursor: pointer;
  }
`;

function GameStatus() {
  const {
    currentPlayer,
    winner,
    playerMovesHistory,
    setPlayerWentBackTo,
    isGameOver,
  } = useContext(GameContext);

  let prompt = isGameOver ? `Winner: ${winner}` : `Next player: ${currentPlayer}`;

  const handleClick = index => {
    setPlayerWentBackTo(index);
  };

  const moveHistory = playerMovesHistory.map((_, index) => (
    <StyledButtonContainer key={index}>
      {`${index + 1 }. `}
      <button onClick={() => handleClick(index)}>Go to {index === 0 ? 'game start' : `move #${index}`}</button>
    </StyledButtonContainer>
  ));
  

  return (
    <div>
      <span>
        {prompt}
      </span>
      {moveHistory}
    </div>
  )
}

export default GameStatus;