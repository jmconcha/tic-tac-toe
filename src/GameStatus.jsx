function GameStatus({ currentPlayer, winner, isGameOver, playerMovesHistory, setPlayerWentBackTo }) {
  let prompt = isGameOver ? `Winner: ${winner}` : `Next player: ${currentPlayer}`;

  const handleClick = index => {
    setPlayerWentBackTo(index);
  };

  const moveHistory = playerMovesHistory.map((_, index) => (
    <div key={index}>
      {`${index + 1 }. `}
      <button onClick={() => handleClick(index)}>Go to {index === 0 ? 'game start' : `move # ${index}`}</button>
    </div>
  ));

  return (
    <>
      <p>
        {prompt}
      </p>
      {moveHistory}
    </>
  )
}

export default GameStatus;