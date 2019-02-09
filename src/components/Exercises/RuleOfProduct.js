import React from "react"
import JXRand from 'jxrand'
import Exercise from "../Exercise"

export default class RuleOfProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: [],
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
                questionId: 'theater',
                question: [
                    "The seats of a theater are numbered by the letter A, B or C,",
                    "followed by 2 digits, how many seats can we number that way?",
                ],
                answer: 300,
            },
        ]

        var newQuestion;
        do {
            newQuestion = JXRand.getRandomElement(questionList);
        } while (newQuestion.questionId === this.state.questionId);
        this.setState(newQuestion);
    }

    componentDidMount() {
        this.generateValues();
    }

    checkAnswer(answer) {
        const correctAnswer = this.state.answer;
        if (correctAnswer === Number(answer)) {
            return {
                isCorrect: true,
            }
        } else {
            return { 
                isCorrect: false,
                message: 'Wrong...',
            };
        }
    }

    render() {
        return <Exercise 
            title="Rule of Product"
            description="Find the number of different combinations using the rule of product."
            question={this.state.question.map(item => `\\text{${item}}`)}
            answerFields={[{type: "text-input"}]}
            answerComment={this.state.answerComment}
            checkAnswer={this.checkAnswer}
            generateNewValues={this.generateValues}
        />;
    }
}
