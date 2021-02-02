import React from 'react';
import Button from 'react-bootstrap/Button';
import './Answers.css';

const Answers = ({ answers }) => {
	let buttons = answers.map((answer, index) => {
		const { text } = answer;

		const handleClick = () => {
			console.log('TODO: emit selected answer');
		};

		return (
			<Button key={index} size="lg" onClick={() => handleClick()}>
				{text}
			</Button>
		);
	});
	return <div className="buttons"> {buttons}</div>;
};

export default Answers;
