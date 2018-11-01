import React from "react"
import Exercise from "../Exercise"
import * as math from 'mathjs'
import {getRandomScientificNotationNumber} from "../../utils"


export default class SciAddition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number1: {coefficient: 0, exponent: 0}, number2: {coefficient: 0, exponent: 0}};

        this.generateValues = this.generateValues.bind(this);
    }

    generateValues() {
        this.setState({
            number1: getRandomScientificNotationNumber(),
            number2: getRandomScientificNotationNumber()
        });
    }

    componentDidMount() {
        math.config({
            number: 'BigNumber',
            precision: 64
        })
        this.generateValues();
    }

    // generateSolutionArray() {
    //     let solutionArray = [];
    //     const {coefficient, exponent} = this.state.number;
    //     solutionArray.push([]);
    //     for (let i = 0; i != exponent; i = exponent > 0 ? i + 1 : i - 1 ) {
    //         solutionArray[0].push(`${math.eval(`${coefficient.toString()}*10^${exponent - i}`)}\\times10^{${i}}`);
    //     }
    //     solutionArray[0].push(`${coefficient.toString()}\\times10^{${exponent}}`);
    //     solutionArray.push(`${coefficient.toString()}\\times10^{${exponent}}`);
    //     return solutionArray;
    // }
    
    render() {
        const { coefficient: coefficient1, exponent: exponent1 } = this.state.number1;
        const { coefficient: coefficient2, exponent: exponent2 } = this.state.number2;
        console.log(this.state)
        return <Exercise 
            title="Scientific notation addition"
            description="Practice on adding two numbers in scientific notation"
            question={`${coefficient1}\\times10^{${exponent1}}+${coefficient2}\\times10^{${exponent2}}=`}
            answer={[{
                type: "scientific-notation",
                coefficient: coefficient1,
                exponent: exponent1
            }]}
            solution={[]}//this.generateSolutionArray()}
            generateNewValues={this.generateValues}
        />;
    }
}
