import React from "react"
import Exercise from "../Exercise"
import JXRand from "jxrand"

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
            coefficient: JXRand.getNumber({min: 1, max: 1.999})
                .toFixed(JXRand.getNumber({min: 0, max: 4, type: 'integer'})),
            exponent: JXRand.getNumber({min: -6, max: 6, type: 'integer'})
        });
    }

    componentDidMount() {
        this.generateValues();
    }

    render() {
        return <Exercise 
            title="Convert Scientific to Decimal notation"
            description="Practice on converting Decimal to Scientific notation"
            question={`\\text{Write the number } ${this.state.coefficient}\\times10^{${this.state.exponent}} \\text{ in Decimal notation}`}
            answer={this.state.coefficient*Math.pow(10, this.state.exponent)}
            generateNewValues={this.generateValues}
        />;
    }
}
