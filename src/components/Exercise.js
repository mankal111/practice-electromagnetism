import React from "react"
import 'katex/dist/katex.min.css'
import {BlockMath, InlineMath} from "react-katex"
import Solution from "./Solution";
import exerciseStyles from "./Exercise.module.css"

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
        this.setState({ answerValue: event.target.value });
    }

    handleSubmit(event) {
        if (Number(this.state.answerValue) === this.props.answer) {
            alert("Correct!");
        } else {
            alert(`Sorry... ${this.state.answerValue} is not the correct answer.`)
        }
        event.preventDefault();
    }

    toggleSolution() {
        this.setState({ solutionVisible: !this.state.solutionVisible })
    }

    newExercise() {
        this.props.generateNewValues();
        this.setState({ answerValue: '', solutionVisible: false });
    }

    inputElement() {
        if (this.props.inputType === "scientific-notation") {
            return <span className={exerciseStyles["scientific-notation-container"]} >
                <input type="number" className={exerciseStyles["coeficient"]} />
                <InlineMath math="\times 10" />
                <input type="number" className={exerciseStyles["exponent"]} />
            </span>
        } 
        return <input
            type="text"
            value={this.state.answerValue}
            onChange={this.handleChange}
            className={exerciseStyles["decimal-input"]}
        />
    }

    render() {
        return <div className={exerciseStyles.container}>
            <h2 className={exerciseStyles.title}>{this.props.title}</h2>
            <div>{this.props.description}</div>
            <BlockMath math={this.props.question} />
            <div className={exerciseStyles["answer-section"]}>
                <span>Answer: </span>
                {this.inputElement()}
            </div>
            <span className={exerciseStyles.button} onClick={this.handleSubmit}>Check</span>
            <span className={exerciseStyles.button} onClick={this.toggleSolution}>Solution</span>
            <span className={exerciseStyles.button} onClick={this.newExercise}>New Exercise</span>
            {this.state.solutionVisible && <Solution steps={this.props.solution}/>}
        </div>;
    }
}
