import React from "react"
import Exercise from "../Exercise"
import JXRand from "jxrand"
import * as math from 'mathjs'

export default class DecToSci extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coefficient: 0,
            exponent: 0
        };

        this.generateValues = this.generateValues.bind(this);
    }

    generateValues(event) {
        this.setState({
            coefficient: math.bignumber(JXRand.getNumber({min: 1, max: 9.999})
                .toFixed(JXRand.getNumber({min: 0, max: 4, type: 'integer'}))),
            exponent: JXRand.getNumber({min: -6, max: 6, type: 'integer'})
        });
    }

    componentDidMount() {
        this.generateValues();
    }

    generateSolutionArray() {
        let solutionArray = [];
        solutionArray.push([]);
        for (let i = 0; i != this.state.exponent; i = this.state.exponent > 0 ? i + 1 : i - 1 ) {
            solutionArray[0].push(`${math.eval(`${this.state.coefficient}*10^${this.state.exponent - i}`)}\\times10^{${i}}`);
        }
        solutionArray[0].push(`${this.state.coefficient}\\times10^{${this.state.exponent}}`);
        solutionArray.push(`${this.state.coefficient}\\times10^{${this.state.exponent}}`);
        return solutionArray;
    }

    render() {
        return <Exercise 
            title="Convert Decimal to Scientific notation"
            description="Practice on converting Decimal to Scientific notation"
            question={`\\text{Write the number } ${math.eval(`${this.state.coefficient}*10^${this.state.exponent}`)} \\text{ in Scientific notation}`}
            answer={[{
                type: "scientific-notation",
                coefficient: this.state.coefficient,
                exponent: this.state.exponent
            }]}
            solution={this.generateSolutionArray()}
            generateNewValues={this.generateValues}
        />;
    }
}
