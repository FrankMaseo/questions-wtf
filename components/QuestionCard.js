import { ref, onValue, get, child } from "@firebase/database";
import { database } from '../config/firebase';
import React, { useState, useContext, createContext, useEffect } from 'react';
import updateAnswerCount from '../utils/updateAnswerCount';

const QuestionCard = () => {

    const [question, setQuestion] = useState({});
    const [questionCount, setQuestionCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [questionId, setQuestionId] = useState(0);
    const [displayResults, setDisplayResults] = useState(false);
    const [answerIndex, setAnswerIndex] = useState(null);

    useEffect(() => {

        let questionRef = ref(database, 'questions/' + questionId);
        let questionCountRef = ref(database, 'questionCount');

        onValue(questionCountRef, (snapshot) => {
            setQuestionCount(snapshot.val());
        }, {
            onlyOnce: true
        });

        onValue(questionRef, (snapshot) => {
            setIsLoading(true);
            setQuestion(snapshot.val());
            setIsLoading(false);
        });


    }, [questionId])

    const displayQuestionResults = () => {
        setDisplayResults(!displayResults)
    }
    const updateQuestionId = () => {
        updateAnswerCount(questionId, answerIndex, question.answers[answerIndex].answerCount);
        displayQuestionResults();
        nextQuestion();
    }

    const nextQuestion = () => {
        setQuestionId(Math.floor(Math.random() * Math.floor(questionCount)));
    }

    const updateAnswerIndex = (indexId) => {
        setAnswerIndex(indexId);
    }


    return (
        //<div className="question-container">
        <>
            {isLoading ?
                <div className="question-card">loading</div> :
                <div className="question-card">
                    <QuestionHeader questions={question} />
                    <QuestionAnswer
                        questions={question}
                        displayResults={displayResults}
                        displayQuestionResults={displayQuestionResults}
                        updateAnswerIndex={updateAnswerIndex}
                        totalAnswers={
                            question.answers.reduce((total, currentObject) => { return total + currentObject.answerCount }, 0)
                        }
                    />
                    <NextQuestion
                        updateFunction={updateQuestionId}
                        skipQuestion={nextQuestion}
                        displayResults={displayResults}
                    />
                </div>
            }
        </>
        //</div>
    )
}

const QuestionHeader = (props) => {
    return (
        <span className="question">{props.questions.question}</span>
    );
}

const QuestionAnswer = (props) => {

    const submitAnswer = (e) => {
        //e.preventDefault();
        props.displayQuestionResults();
        props.updateAnswerIndex(e.target.value);
        //add function coming from props to submit answer to backend
    }


    return (
        <>
            <div className="questions answer">
                {
                    props.questions.answers.map((value, index) => {
                        return (<button
                            key={index}
                            value={index}
                            onClick={submitAnswer}
                            disabled={props.displayResults}
                        >{value.answer}</button>
                        );
                    })
                }

            </div>

            <div className="results">
                <div style={{width:"100%", marginBottom: "15px"} }>
                    All answers:
                </div>
                {props.displayResults ?
                    props.questions.answers.map((value, index) => {
                        return (
                            <div key={index}>
                                <strong>{value.answer}</strong>
                                <span>{(value.answerCount / props.totalAnswers * 100).toFixed(1)}%</span>
                            </div>
                        );
                    })
                    : null
                }
            </div>

        </>
    );
}

const NextQuestion = (props) => {

    const newQuestion = () => {
        props.updateFunction()
    }

    const skipQuestion = () => {
        props.skipQuestion()
    }

    return (
        <div className="questions new">
            {
                props.displayResults ? 
                    <button onClick={newQuestion}>New question</button> :
                    <button onClick={skipQuestion}>Skip</button>
            }
            
        </div>
    );
}

export default QuestionCard;