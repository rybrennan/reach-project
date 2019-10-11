import React from 'react';
import styled from 'styled-components';

const TilesWrapper = styled.section`padding: 20px 0 0; text-align: center`;
const StyledTiles = styled.ul`
  display: inline-block;
  padding: 0;

  li {
    display: inline-block;
    text-transform: uppercase;
    width: 26px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }
  li.titleLetter {
    border-bottom: 1px solid #666;
    margin-right: 4px;
    font-weight: bold;
    font-size: 26px;
    span {
      visibility: hidden;
    }
    span.visible {
      visibility: visible;
    }
    &[data-red='true'] span {
      visibility: visible;
      color: #8e3333;
    }
  }
  &:last-child li:last-child {
    display: none;
  }
`;

const Tiles = props => {
  const secretWord = props.secretWord.split('');
  const words = [secretWord]


  const phrase = words.map((word, i) => (
    <StyledTiles key={i}>
      {word.map((char, i) => {
        console.log('letter ', char)
        return (
          <li
            key={i}
            className="titleLetter"
            data-red='false'
          >
            <span className={props.choosenLetters.includes(char) ? 'visible' : ''}>
              {char}
            </span>
          </li>
        )
      })}
      <li>&nbsp;</li>
    </StyledTiles>
  ));
  // this goes on line 51 : {props.missedLetters.includes(letter) ? 'true' : 'false'}
  return <TilesWrapper className="title">{phrase}</TilesWrapper>;
};
export default Tiles;












