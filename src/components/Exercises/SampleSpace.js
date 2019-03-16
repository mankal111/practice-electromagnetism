import React from "react"
import JXRand from 'jxrand'
import { Exercise } from "react-exercise-component"

export default class SampleSpace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answerComment: [],
            answer: {},
            questionId: '',
        };

        this.generateValues = this.generateValues.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    generateValues() {
        const questionList = [
            {
                questionId: 'die',
                question: "What is the Sample Space of throwing a die (6 faces)?",
                answerComment: ["Write the numbers of the faces separated by ','."],
                answer: new Set(['1', '2', '3', '4', '5', '6']),
            },
            {
                questionId: 'coins',
                question: "What is the Sample Space of throwing a coin?",
                answerComment: ["Write 'H' for heads and 'T' for tails separated by ','."],
                answer: new Set(['H', 'T']),
            },
            {
                questionId: '2coins',
                question: "What is the Sample Space of throwing two coins?",
                answerComment: [
                    "Write 'HT' to express the outcome coin1: heads and coin2: tails.",
                    "Separate the outcomes by ','."
                ],
                answer: new Set(['HH', 'TH', 'TT', 'HT']),
            },
            {
                questionId: '1ColoredBallFrom3',
                question: "A box has one red, one green and one blue ball.\nWhat is the Sample Space of picking up a ball?",
                answerComment: ["Write 'R' for red, 'G' for green and 'B' for red, separate by ','."],
                answer: new Set(['R', 'G', 'B']),
            },
            {
                questionId: '2ColoredBallsFrom3',
                question: "A box has one red, one green and one blue ball.\nWhat is the Sample Space of picking up two balls?",
                answerComment: [
                        "Write 'BG' to express the outcome of picking one blue and then one green.",
                        "Separate the outcomes by ','."
                    ],
                answer: new Set(['RG', 'RB', 'BG', 'BR', 'GR', 'GB']),
            },
            {
                questionId: '2ColoredBallsFrom3PutBack',
                question: "A box has one red, one green and one blue ball.\nWhat is the Sample Space of picking up a ball,\nput it back and then pick another one up?",
                answerComment: [
                        "Write 'BG' to express the outcome of picking one blue and then one green.",
                        "Separate the outcomes by ','."
                    ],
                answer: new Set(['RG', 'RB', 'BG', 'BR', 'GR', 'GB', 'RR', 'BB', 'GG']),
            },
        ]

        var newQuestion;
        do {
            newQuestion = JXRand.getRandomElement(questionList);
        } while (newQuestion.questionId === this.state.questionId);
        this.setState(newQuestion);
    }

    componentWillMount() {
        this.generateValues();
    }

    checkAnswer(answer) {
        const answerArray = answer.replace(/\s+/g, '').split(',').filter(item => item !== '');
        const correctAnswerSet = this.state.answer;
        const wrongOutcomesArray = answerArray.filter(value => !correctAnswerSet.has(value));
        if (wrongOutcomesArray.length > 0) {
            return { 
                isCorrect: false,
                message: `Wrong... ${wrongOutcomesArray[0]} is not a possible outcome.`,
            };
        } else if (answerArray.length < correctAnswerSet.size) {
            return { 
                isCorrect: false,
                message: 'Wrong... You didn\'t find all possible outcomes.',
            };
        } else if (answerArray.length > correctAnswerSet.size) {
            return { 
                isCorrect: false,
                message: 'Wrong... The Sample Space should not have dublicates.',
            };
        } else if (wrongOutcomesArray.length === 0) {
            return {isCorrect: true};
        } else {
            return { 
                isCorrect: false,
                message: 'Wrong...',
            };
        }
    }

    render() {
        return <Exercise 
            title="Find the Sample Space of a random experiment"
            description="Given a random experiment find the space that describes all the possible outcomes."
            question={this.state.question}
            answerFields={[{type: "text-input"}]}
            answerComment={this.state.answerComment}
            checkAnswer={this.checkAnswer}
            generateNewValues={this.generateValues}
        />;
    }
}
