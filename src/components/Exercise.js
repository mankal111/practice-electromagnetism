import React from "react"
import 'katex/dist/katex.min.css'
import {BlockMath} from "react-katex"
import Solution from "./Solution";

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
        this.setState({answerValue: event.target.value});
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
        this.setState({solutionVisible: !this.state.solutionVisible})
    }

    newExercise() {
        this.props.generateNewValues();
        this.setState({solutionVisible: false});
    }

    render() {
        return <div>
            <h2>{this.props.title}</h2>
            <div>{this.props.description}</div>
            <BlockMath math={this.props.question} />
            <form onSubmit={this.handleSubmit}>
                <label>
                    Answer:
                    <input type="text" value={this.state.answerValue} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Check" />
            </form>
            <button onClick={this.toggleSolution}>Solution</button>
            <button onClick={this.newExercise}>New Exercise</button>
            {this.state.solutionVisible && <Solution steps={this.props.solution}/>}
        </div>;
    }
}
