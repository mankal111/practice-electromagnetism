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
                    "followed by 2 digits. How many seats can we number that way?",
                ],
                randomVariables: [
                    { name: 'rangeOfLetters', range: [3, 6] },
                    { name: 'numberOfLetters', range: [1, 3] },
                    { name: 'numberOfDigits', range: [1, 5] },
                ],
                answer: (rangeOfLetters, numberOfLetters, numberOfDigits) => {
                    return (Math.pow(rangeOfLetters, numberOfLetters) * Math.pow(10, numberOfDigits));
                }
            },
            {
                questionId: 'theater2',
                question: [
                    "The seats of a theater are numbered by the letter A, B or C,",
                    "followed by 3 digits. How many seats can we number that way?",
                ],
                answer: 3000,
            },
        ]

        // var newQuestion;
        // do {
        //     newQuestion = JXRand.getRandomElement(questionList);
        // } while (newQuestion.questionId === this.state.questionId);
        const randomVariables = questionList[0].randomVariables.map((item) => JXRand.getNumber({min: item.range[0], max: item.range[1], type: 'integer'}));
        const renderedQuestion = [
            `The seats of a theater are numbered by ${randomVariables[1] === 1 ? 'a letter' : randomVariables[1] + ' letters'} (A-${String.fromCharCode(64+randomVariables[0])}),`,
            `followed by ${randomVariables[2]} digits. How many seats can we number that way?`,
        ];

        this.setState({question: renderedQuestion, answer: questionList[0].answer(randomVariables[0], randomVariables[1], randomVariables[2])});
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
