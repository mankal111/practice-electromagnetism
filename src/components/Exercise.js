import React from "react"
import 'katex/dist/katex.min.css'
import {BlockMath, InlineMath} from "react-katex"
import Solution from "./Solution";
import exerciseStyles from "./Exercise.module.css"
import * as math from 'mathjs'

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {answerValue: '', solutionVisible: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSolution = this.toggleSolution.bind(this);
        this.newExercise = this.newExercise.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        if (this.checkAnswer()) {
            alert("Correct!");
        } else {
            alert(`Sorry... ${this.state.answerValue} is not the correct answer.`)
        }
        event.preventDefault();
    }

    toggleSolution() {
        this.setState({ solutionVisible: !this.state.solutionVisible })
    }

    checkAnswer() {
        for (let i = 0; i < this.props.answer.length; i++) {
            let item = this.props.answer[i];
            if (((item.type === "text") && (item.value !== Number(this.state[`${i}-value`]))) ||
                (item.type === "scientific-notation") && (
                    (item.exponent !== Number(this.state[`${i}-exponent`]) ||
                    (item.coefficient.toString() !== this.state[`${i}-coefficient`]))
                )) {
                    return false;
            }
        };
        return true;
    }

    newExercise() {
        this.props.generateNewValues();
        this.setState({ answerValue: '', solutionVisible: false });
    }

    inputElements() {
        const i = 0;
        if (this.props.answer[i].type === "scientific-notation") {
            return <span className={exerciseStyles["scientific-notation-container"]} >
                <input
                    type="text"
                    className={exerciseStyles["coefficient"]}
                    onChange={this.handleChange}
                    name={`${i}-coefficient`}
                />
                <InlineMath math="\times 10" />
                <input
                    type="text"
                    className={exerciseStyles["exponent"]}
                    onChange={this.handleChange}
                    name={`${i}-exponent`}
                />
            </span>
        } 
        return <input
            type="text"
            value={this.state[`${i}-value`]}
            onChange={this.handleChange}
            className={exerciseStyles["decimal-input"]}
            name={`${i}-value`}
        />
    }

    render() {
        return <div className={exerciseStyles.container}>
            <h2 className={exerciseStyles.title}>{this.props.title}</h2>
            <div>{this.props.description}</div>
            <BlockMath math={this.props.question} />
            <div className={exerciseStyles["answer-section"]}>
                <span>Answer: </span>
                {this.inputElements()}
            </div>
            <span className={exerciseStyles.button} onClick={this.handleSubmit}>Check</span>
            <span className={exerciseStyles.button} onClick={this.toggleSolution}>Solution</span>
            <span className={exerciseStyles.button} onClick={this.newExercise}>New Exercise</span>
            {this.state.solutionVisible && <Solution steps={this.props.solution}/>}
        </div>;
    }
}
