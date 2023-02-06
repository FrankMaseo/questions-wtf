import React, { useState } from 'react';


const questions = {
    question: "Would you rather give 1 million euros to 1 person or 1000 euros to 1000 people?",
    answers: [
        {
            key: 0,
            value: "1 million to a single person",
            answerCount: 23
        },
        {
            key: 1,
            value: "1000euros to 1000 people",
            answerCount: 38
        }
    ],
    results: [
        {
            key: 0,
            value: 23
        },
        {
            key: 1,
            value: 38
        }
    ]
}



const QuestionCard = () => {

    return (
        //<div className="question-container">
            <div className="question-card">
                <QuestionHeader questions={questions} />
                <QuestionAnswer questions={questions} />
                <NextQuestion questions={questions} />
            </div>

        //</div>
    )
}

const QuestionHeader = (props) => {
    return (
        <span className="question">{props.questions.question}</span>
    );
}

const QuestionAnswer = (props) => {
    const [displayResults, setDisplayResults] = useState(false);

    const submitAnswer = (e) => {
        e.preventDefault();
        setDisplayResults(true);
        //add function coming from props to submit answer to backend
    }

    return (
        <>
            <div className="questions answer">
                {props.questions.answers.map((value) => {
                    return <button
                        key={value.key}
                        onClick={submitAnswer}
                        disabled={displayResults}
                    >{value.value}</button>
                })}

            </div>
            {
                displayResults ?
                    <ul className="results">
                        {props.questions.answers.map((value) => {
                            return <li key={value.key}>{value.value}: {value.answerCount}</li>
                        })}
                    </ul>
                    : null
            }


        </>
    );
}
const NextQuestion = () => {
    return (
        <div className="questions new">
            <button>New question</button>
        </div>
    );
}

export default QuestionCard;