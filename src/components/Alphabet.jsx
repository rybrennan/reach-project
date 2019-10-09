import React from 'react';
import styled from 'styled-components';

const Block = styled.ul`
padding: 0;

list-style-type: none;
margin: 5px 0;
li {
  cursor: pointer;
  margin-right: 11px;
  padding: 1px;
  text-transform: uppercase;
  font-size: 22px;
  display: inline-block;
}
li[disabled] {
  text-decoration: line-through;
  opacity: 0.4;
  pointer-events: none;
}
`;
const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Alphabet(props) {
  console.log(props)
    return (
      <div>
        <Block>
          {alpha.map((alphabetLetter) => {
            return (
              <li
                key={alphabetLetter}
                className='character'
                disabled={props.choosenLetters.includes(alphabetLetter) ? true : false}
                onClick={props.onClick}
              >
                {alphabetLetter}
              </li>
            )
          })}
        </Block>
      </div>
    )
  }




export default Alphabet;

// padding: 0;
// display: ${props => (props.newGame ? 'block' : 'none')};
// list-style-type: none;
// margin: 5px 0;
// li {
//   cursor: pointer;
//   margin-right: 11px;
//   padding: 1px;
//   text-transform: uppercase;
//   font-size: 22px;
//   display: inline-block;
// }
// li[disabled] {
//   text-decoration: line-through;
//   opacity: 0.4;
//   pointer-events: none;
// }




