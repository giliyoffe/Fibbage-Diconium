import React from 'react';

const Answers = ({ answers }) => answers.map((answer, index) => {
  const { text } = answer;

  const handleClick = () => {
    console.log('TODO: emit selected answer')
  }
  
  return (
    <button key={index} type="button" onClick={() => handleClick()}>
      {text}
    </button>
    )
})

export default Answers;
