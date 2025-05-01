import { useState } from "react";
import QUESTIONS from '../questions.js';
import quizComplete from '../assets/quiz-complete.png';

export default function Quiz() {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const activeQuestionIndex = selectedAnswers.length;
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer) {
        setSelectedAnswers(prevState => {
            return [...prevState, selectedAnswer];
        })
    }

    let quizContent = {};

    if (quizIsCompleted) {
        quizContent = (
            <div id="summary">
                <img src={quizComplete} />
                <h2>Quiz Completed!</h2>
            </div>
        );
    } else {
        const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
        shuffledAnswers.sort(() => Math.random() - 0.5);

        quizContent = (
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer, index) => {
                        return (
                            <li
                                key={activeQuestionIndex + "" + index}
                                className="answer"
                                onClick={() => { handleSelectAnswer(answer) }}
                            >
                                <button>
                                    {answer}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <div id="quiz">
            {quizContent}
        </div>
    )
}