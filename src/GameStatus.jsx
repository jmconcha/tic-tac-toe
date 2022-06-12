function GameStatus({ currentPlayer, winner, isGameOver }) {
  let prompt = isGameOver ? `Winner: ${winner}` : `Next player: ${currentPlayer}`;

  return (
    <p>
      {prompt}
    </p>
  )
}

export default GameStatus;