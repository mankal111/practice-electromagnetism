import React from "react"
import { Exercise } from "react-exercise-component"
import * as math from 'mathjs'
import {getRandomScientificNotationNumber} from "../../utils"


export default class DecToSci extends React.Component {
    constructor(props) {
        super(props);
        this.state = {number: {coefficient: 0, exponent: 0}};

        this.generateValues = this.generateValues.bind(this);
    }

    generateValues() {
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
        for (let i = 0; i != exponent; i = exponent > 0 ? i + 1 : i - 1 ) {
            solutionArray[0].push(`${math.eval(`${coefficient.toString()}*10^${exponent - i}`)}\\times10^{${i}}`);
        }
        solutionArray[0].push(`${coefficient.toString()}\\times10^{${exponent}}`);
        solutionArray.push(`${coefficient.toString()}\\times10^{${exponent}}`);
        return solutionArray;
    }
    
    render() {
        const { coefficient, exponent } = this.state.number;

        return <Exercise 
            title="Convert Decimal to Scientific notation"
            description="Practice on converting Decimal to Scientific notation"
            question={`\\text{Write the number } ${math.eval(`${coefficient.toString()}*10^${exponent}`)} \\text{ in Scientific notation}`}
            answer={[{
                type: "scientific-notation",
                coefficient: coefficient,
                exponent: exponent
            }]}
            solution={this.generateSolutionArray()}
            generateNewValues={this.generateValues}
        />;
    }
}
