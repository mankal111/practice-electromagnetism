import React from "react"
import Exercise from "../Exercise"
import JXRand from 'jxrand'
import * as math from 'mathjs'


export default class OpProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {operation: 0, property: 0};

        this.generateValues = this.generateValues.bind(this);
    }

    properties = {
        operations: ['of Addition', 'of Multiplication'],
        properties: ['Commutative', 'Associative', 'Identity', 'Inverse', 'Distributive'],
        formulas: [
            ['\\alpha+\\beta=\\beta+\\alpha', '\\alpha\\cdot \\beta=\\beta\\cdot \\alpha'],
            ['\\alpha+(\\beta+\\gamma)=(\\alpha+\\beta)+\\gamma', '\\alpha(\\beta\\gamma)=(\\alpha\\beta)\\gamma'],
            ['\\alpha+0=\\alpha', '\\alpha\\cdot 1=\\alpha'],
            ['\\alpha+(-\\alpha)=0', '\\alpha\\cdot \\fr\\alphac{1}{\\alpha}=1, \\alpha\\neq0'],
            ['\\alpha(\\beta+\\gamma)=\\alpha\\cdot \\beta+\\alpha\\cdot \\gamma', '\\alpha(\\beta+\\gamma)=\\alpha\\cdot \\beta+\\alpha\\cdot \\gamma']
        ]
    }

    generateValues() {
        this.setState({
            operation: JXRand.getNumber({
                min: 0,
                max: this.properties.operations.length - 1, type: 'integer'
            }),
            property: JXRand.getNumber({
                min: 0,
                max: this.properties.properties.length - 1, type: 'integer'
            })
        });
    }

    componentDidMount() {
        this.generateValues();
    }
    
    render() {
        console.log(this.properties.formulas[this.state.property][this.state.operation],this.state.property)

        return <Exercise 
            title="Basic operations properties"
            description="Practice on recognizing the basic operations properties"
            question={`\\text{Name the following property: } ${this.properties.formulas[this.state.property][this.state.operation]}`}
            answer={[{
            }]}
            generateNewValues={this.generateValues}
        />;
    }
}
