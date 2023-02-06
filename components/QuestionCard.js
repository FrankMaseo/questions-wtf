import { ref, onValue } from "@firebase/database";
import { database } from '../config/firebase';
import React, { useState, useContext, createContext, useEffect } from 'react';


const QuestionCard = () => {

    const [question, setQuestion] = useState({});
    const [questionCount, setQuestionCount] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [questionId, setQuestionId] = useState(0);
    const [displayResults, setDisplayResults] = useState(false);

    useEffect(() => {
        

        let questionRef = ref(database, 'questions/' + questionId);

        onValue(questionRef, (snapshot) => {
            setIsLoading(true);
            setQuestion(snapshot.val());
            setIsLoading(false);
        });
        
        
    }, [questionId])

    useEffect(() => {


        let questionRef = ref(database, 'questionCount');
        console.log('questions/' + questionId);

        onValue(questionRef, (snapshot) => {
            setIsLoading(true);
            setQuestionCount(snapshot.val());
            setIsLoading(false);
        });


    },)


    const displayQuestionResults = () => {
        setDisplayResults(!displayResults)
    }
    const updateQuestionId = () => {
        displayQuestionResults();
        setQuestionId(Math.floor(Math.random() * Math.floor(questionCount)));
    }


    
    return (
        //<div className="question-container">
        <>
            {isLoading ?
                <div className = "question-card">loading</div> :
                <div className="question-card">
                    <QuestionHeader questions={question} />
                    <QuestionAnswer questions={question} displayResults={displayResults} displayQuestionResults={displayQuestionResults} />
                    <NextQuestion updateFunction={updateQuestionId} />
                </div>
            }
        </>
        //</div>
    )
}

const QuestionHeader = (props) => {
    console.log(props.questions.answers)
    return (
        <span className="question">{props.questions.question}</span>
    );
}

const QuestionAnswer = (props) => {
    

    const submitAnswer = (e) => {
        e.preventDefault();
        props.displayQuestionResults();
        //add function coming from props to submit answer to backend
    }

    return (
        <>
            <div className="questions answer">
                {
                    props.questions.answers.map((value) => {
                        return (<button
                            key={value}
                            onClick={submitAnswer}
                            disabled={props.displayResults}
                        >{value.answer}</button>
                        );
                    })
                }

            </div>
            
            <ul className = "results">
                {props.displayResults ?
                    props.questions.answers.map((value) => {
                        return (<li
                            key={value}
                        >{value.answer} : {value.answerCount}</li>
                        );
                    })
                    : null
                }
            </ul>

        </>
    );
}
const NextQuestion = (props) => {

    const newQuestion = () => {
        props.updateFunction()
    }
    return (
        <div className="questions new">
            <button onClick={newQuestion }>New question</button>
        </div>
    );
}

export default QuestionCard;