import React from 'react';
import styled from 'styled-components';

const StyledScores = styled.ul`
  display: inline-block;
  padding: 0;
  font-family: 'Mansalva', sans-serif;
  position:absolute;
  top: 30%;
  left: 60%;
  `;

const Scoreboard = (props) => {
  let place = 0;
  return (
    <StyledScores>
      {props.score.map((score, i) => {
        place++;
        return (
          <li key={i}>
            {`${place}: ${score.player_name} ${score.score} points`}
          </li>
        )
      })}
    </StyledScores>
  )
};

export default Scoreboard;






