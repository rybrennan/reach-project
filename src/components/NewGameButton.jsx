import React from 'react';
import img from '../img/swirlyswirl.png';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 24px;
  border: none;
  color: blue;
  background: none;
  position:absolute;
  top: 40%;
  right: 70%;
  cursor: pointer;
  transition: all 2s linear;
  display: ${props => (props.newGame ? 'none' : 'block')};
  opacity: ${props => (props.newGame ? 0 : 1)};
  font-family: 'Mansalva', sans-serif;
  &:after {
    content: '';
    width: 36px;
    height: 36px;
    position: absolute;
    background: url(${img}) no-repeat;
    background-size: 100%;
    top: 100%;
    left: 50px;
  }
  &:hover:after {
    transform: rotate(360deg);
    transition: 600ms linear all;
  }
`;

function NewGame(props) {
  return (
    <Button {...props} onClick={props.onClick}>
    Play Again
  </Button>
  )
};

export default NewGame;

