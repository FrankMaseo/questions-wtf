import { ref, update } from "firebase/database";
import { database } from '../config/firebase';

export default function updateAnswerCount(questionId, answerIndex, currentAnswerCount) {
    //Adds +1 to the currentAnswer count and submits the data to the server
    const newAnswerCount = currentAnswerCount + 1;

    const updates = {};

    updates['/questions/' + questionId + '/answers/' + answerIndex + '/answerCount'] = newAnswerCount;

    return update(ref(database), updates);
}