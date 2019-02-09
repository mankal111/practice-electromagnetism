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
                question: (randomVariables) => [
                    `The seats of a theater are numbered by ${randomVariables.numberOfLetters === 1 ? 'a letter' : randomVariables.numberOfLetters + ' letters'} (A-${String.fromCharCode(64+randomVariables.rangeOfLetters)}),`,
                    `followed by ${randomVariables.numberOfDigits === 1 ? 'a digit' : randomVariables.numberOfDigits + ' digits'}. How many seats can we number that way?`,
                ],
                randomVariables: [
                    { name: 'rangeOfLetters', type: { min: 3, max: 6, type: 'integer' } },
                    { name: 'numberOfLetters', type: { min: 1, max: 3, type: 'integer' } },
                    { name: 'numberOfDigits', type: { min: 1, max: 5, type: 'integer' } },
                ],
                answer: (randomVariables) => {
                    return (Math.pow(randomVariables.rangeOfLetters, randomVariables.numberOfLetters) * Math.pow(10, randomVariables.numberOfDigits));
                }
            },
            {
                questionId: 'carPlate',
                question: (randomVariables) => [
                    `The car plates of a city are coded by ${randomVariables.numberOfCharacters} characters.`,
                    `The ${randomVariables.numberOfLetters} of them are letters (26 different letters),`,
                    `and the rest are digits. How many car plates can we number that way?`,
                ],
                randomVariables: [
                    { name: 'numberOfCharacters', type: { min: 4, max: 6, type: 'integer' } },
                    { name: 'numberOfLetters', type: { min: 2, max: 3, type: 'integer' } },
                ],
                answer: (randomVariables) => {
                    return (Math.pow(26, randomVariables.numberOfLetters) * Math.pow(10, randomVariables.numberOfCharacters - randomVariables.numberOfLetters));
                }
            },
        ]

        var newQuestion;
        do {
            newQuestion = JXRand.getRandomElement(questionList);
        } while (newQuestion.questionId === this.state.questionId);
        const randomVariables = newQuestion
            .randomVariables
            .reduce((result, item) => {
                    result[item.name] = JXRand.getNumber(item.type);
                    return result;
                },
            {});
        const renderedQuestion = newQuestion.question(randomVariables);

        this.setState({question: renderedQuestion, answer: newQuestion.answer(randomVariables), questionId: newQuestion.questionId });
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
