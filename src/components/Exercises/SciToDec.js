import React from "react"
import Exercise from "../Exercise"
import JXRand from "jxrand"
import * as math from 'mathjs'

export default class SciToDec extends React.Component {
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
            coefficient: JXRand.getNumber({min: 1, max: 9.999})
                .toFixed(JXRand.getNumber({min: 0, max: 4, type: 'integer'})),
            exponent: JXRand.getNumber({min: -6, max: 6, type: 'integer'})
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
        solutionArray.push([]);
        for (let i = this.state.exponent; i != 0; i = this.state.exponent > 0 ? i - 1 : i + 1 ) {
            solutionArray[0].push(`${math.eval(`${this.state.coefficient}*10^${this.state.exponent - i}`)}\\times10^{${i}}`);
        }
        solutionArray[0].push(`${math.eval(`${this.state.coefficient}*10^${this.state.exponent}`)}\\times10^0`);
        solutionArray[0].push(`${math.eval(`${this.state.coefficient}*10^${this.state.exponent}`)}\\times1`);
        solutionArray.push(`${math.eval(`${this.state.coefficient}*10^${this.state.exponent}`)}`);
        return solutionArray;
    }

    render() {
        return <Exercise 
            title="Convert Scientific to Decimal notation"
            description="Practice on converting Scientific to Decimal notation"
            question={`\\text{Write the number } ${this.state.coefficient}\\times10^{${this.state.exponent}} \\text{ in Decimal notation}`}
            answer={[{type: "text", value: this.state.coefficient*Math.pow(10, this.state.exponent)}]}
            solution={this.generateSolutionArray()}
            generateNewValues={this.generateValues}
        />;
    }
}
