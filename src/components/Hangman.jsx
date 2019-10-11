import React from 'react';
import styled from 'styled-components';
// import ReactHelpers from '../../utils/react-helpers.js';

// import helpers from '../../utils'
// const helpers = new ReactHelpers();
// import png1 from '../img/1.png';
// import png2 from '../img/2.png';
// import png3 from '../img/3.png';
// import png4 from '../img/4.png';
// import png5 from '../img/5.png';
// import png6 from '../img/6.png';
// import png7 from '../img/7.png';

// display: ${props => (props.newGame ? 'block' : 'none')};
// opacity: ${props => (props.newGame ? 1 : 0)};

// background: url(${png1}) no-repeat center center;
// console.log(helpers)

const Wrapper = styled.div`
  width: 295px;
  height: 295px;
  background-size: 100%;
  margin: 0 15px;
  transition: all 0.3s linear;
  background-image: ${props.imgProp}
`;

const HangmanContainer = props => (
  <Wrapper {...props} data-order={props.currentDiagram} className="diagram" />
);

export default HangmanContainer;

//I love frontend
//I have 35 medals
