import React from "react"
import 'katex/dist/katex.min.css'
import {BlockMath} from "react-katex"

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {answerValue: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({answerValue: event.target.value});
    }

    handleSubmit(event) {
        if (Number(this.state.answerValue) === this.props.answer) {
            alert("Correct!");
        } else {
            alert(`Sorry... ${this.state.answerValue} is not the correct answer.`+this.props.answer)
        }
        event.preventDefault();
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
            <button onClick={this.props.generateNewValues}>New Exercise</button>
        </div>;
    }
}
