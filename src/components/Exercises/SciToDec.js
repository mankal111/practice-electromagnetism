import React from "react"
import { Exercise } from "react-exercise-component"
import * as math from 'mathjs'
import {getRandomScientificNotationNumber} from "../../utils"

export default class SciToDec extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: {coefficient: 0, exponent: 0}
        };

        this.generateValues = this.generateValues.bind(this);
    }

    generateValues(event) {
        this.setState({
            number: getRandomScientificNotationNumber()
        });
    }

    componentDidMount() {
        math.config({
            number: 'BigNumber',
            precision: 64
        })
        this.generateValues();
    }

    generateSolutionArray() {
        let solutionArray = [];
        const {coefficient, exponent} = this.state.number;
        solutionArray.push([]);
        for (let i = exponent; i != 0; i = exponent > 0 ? i - 1 : i + 1 ) {
            solutionArray[0].push(`${math.eval(`${coefficient}*10^${exponent - i}`)}\\times10^{${i}}`);
        }
        solutionArray[0].push(`${math.eval(`${coefficient}*10^${exponent}`)}\\times10^0`);
        solutionArray[0].push(`${math.eval(`${coefficient}*10^${exponent}`)}\\times1`);
        solutionArray.push(`${math.eval(`${coefficient}*10^${exponent}`)}`);
        return solutionArray;
    }

    render() {
        const {coefficient, exponent} = this.state.number;
        return <Exercise 
            title="Convert Scientific to Decimal notation"
            description="Practice on converting Scientific to Decimal notation"
            question={`\\text{Write the number } ${coefficient}\\times10^{${exponent}} \\text{ in Decimal notation}`}
            answer={[{type: "text-input", value: coefficient*Math.pow(10, exponent)}]}
            solution={this.generateSolutionArray()}
            generateNewValues={this.generateValues}
        />;
    }
}
