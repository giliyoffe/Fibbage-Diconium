import React from 'react';
import './Question.css';

const Question = ({ message }) => {
	return (
		<div className="question-wrap">
			<div className="question">
				{message && message.text.replace('<BLANK>', '________')}
			</div>
		</div>
	);
};

export default Question;
