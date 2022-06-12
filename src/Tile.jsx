import styled from 'styled-components';

const StyledTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid black;
  border-right-width: 0;
  border-bottom-width: 0;
  font-weight: bold;
  font-size: 30px;

  :nth-child(3),
  :nth-child(6),
  :nth-child(9) {
    border-right-width: 1px;
  }

  :nth-child(7),
  :nth-child(8),
  :nth-child(9) {
    border-bottom-width: 1px;
  }
`;

function Tile({ text, handlePlayerMoves }) {
  return (
    <StyledTile onClick={handlePlayerMoves}>
      {text}
    </StyledTile>
  );
}

export default Tile;