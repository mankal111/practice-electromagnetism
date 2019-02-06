import React from "react"
import JXRand from 'jxrand'
import Exercise from "../Exercise"

export default class SampleSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answerComment: '',
            answer: '',
        };

        this.generateValues = this.generateValues.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    generateValues() {
        const questionList = [
            {
                question: "What is the Sample Space of throwing a die (6 faces)?",
                answerComment: "Write the numbers of the faces separated by ','.",
                answer: new Set(['1', '2', '3', '4', '5', '6']),
            },
            {
                question: "What is the Sample Space of throwing a coin?",
                answerComment: "Write 'H' for heads and 'T' for tails separated by ','.",
                answer: new Set(['H', 'T']),
            },
        ]
        this.setState(JXRand.getRandomElement(questionList));
    }

    componentDidMount() {
        this.generateValues();
    }

    checkAnswer(answer) {
        const answerArray = answer.replace(/\s+/g, '').split(',');
        const answerSet = new Set(answerArray);
        const correctAnswerSet = this.state.answer;
        if (answerArray.length !== correctAnswerSet.size) {
            return false;
        } else if (answerArray.filter(value => !correctAnswerSet.has(value)).length === 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return <Exercise 
            title="Find the Sample Space of a random experiment"
            description="Given a random experiment find the space that describes all the possible outcomes."
            question={`\\text{${this.state.question}}`}
            answerFields={[{type: "text-input"}]}
            checkAnswer={this.checkAnswer}
            generateNewValues={this.generateValues}
        />;
    }
}
