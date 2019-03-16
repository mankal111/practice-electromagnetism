import React from "react"
import JXRand from 'jxrand'
import { Exercise } from "react-exercise-component"

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
                question: (randomVariables) => 
                    `The seats of a theater are numbered by ${randomVariables.numberOfLetters === 1 ? 'a letter' : randomVariables.numberOfLetters + ' letters'} (A-${String.fromCharCode(64+randomVariables.rangeOfLetters)}),\n
                    followed by ${randomVariables.numberOfDigits === 1 ? 'a digit' : randomVariables.numberOfDigits + ' digits'}. How many seats can we number that way?`
                ,
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
                question: (randomVariables) => 
                    `The car plates of a city are coded by ${randomVariables.numberOfCharacters} characters.\n
                    The ${randomVariables.numberOfLetters === 1 ? 'one is letter' : `${randomVariables.numberOfLetters} are letters`} (26 different letters) and the rest are digits.\n
                    How many car plates can we number that way?`
                ,
                randomVariables: [
                    { name: 'numberOfCharacters', type: { min: 4, max: 6, type: 'integer' } },
                    { name: 'numberOfLetters', type: { min: 1, max: 3, type: 'integer' } },
                ],
                answer: (randomVariables) => {
                    return (Math.pow(26, randomVariables.numberOfLetters) * Math.pow(10, randomVariables.numberOfCharacters - randomVariables.numberOfLetters));
                }
            },
            {
                questionId: 'balls',
                question: (randomVariables) => 
                    `A factory can create balls colored in ${randomVariables.numberOfColors} different colors, \n
                    in ${randomVariables.numberOfSizes} different sizes and made of ${randomVariables.numberOfMaterials} different materials.\n
                    How many different balls can the factory create?`
                ,
                randomVariables: [
                    { name: 'numberOfColors', type: { min: 2, max: 6, type: 'integer' } },
                    { name: 'numberOfSizes', type: { min: 2, max: 4, type: 'integer' } },
                    { name: 'numberOfMaterials', type: { min: 2, max: 4, type: 'integer' } },
                ],
                answer: (randomVariables) => {
                    return (randomVariables.numberOfColors * randomVariables.numberOfSizes * randomVariables.numberOfMaterials);
                }
            },
        ]

        var newQuestion;
        do {
            newQuestion = JXRand.getRandomElement(questionList);
        } while (newQuestion.questionId === this.state.questionId);
        const randomVariables = JXRand.getRandomValuesObject(newQuestion.randomVariables);
        const renderedQuestion = newQuestion.question(randomVariables);

        this.setState({question: renderedQuestion, answer: newQuestion.answer(randomVariables), questionId: newQuestion.questionId });
    }

    componentWillMount() {
        this.generateValues();
    }

    checkAnswer(answer) {
        const correctAnswer = this.state.answer;
        if (correctAnswer === Number(answer.answer)) {
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
            question={this.state.question}
            answerFields={[{type: "text-input", id: "answer"}]}
            answerComment={this.state.answerComment}
            checkAnswer={this.checkAnswer}
            generateNewValues={this.generateValues}
        />;
    }
}
