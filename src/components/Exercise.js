import React from "react"
import 'katex/dist/katex.min.css'
import {BlockMath, InlineMath} from "react-katex"
import Solution from "./Solution";
import exerciseStyles from "./Exercise.module.css"

export default class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {solutionVisible: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSolution = this.toggleSolution.bind(this);
        this.newExercise = this.newExercise.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        const checkAnswerObject = this.props.checkAnswer(this.state['0-value']);
        if (checkAnswerObject.isCorrect) {
            if (window.confirm("Correct!\nDo you want to try this exercise with new values?")) {
                this.newExercise();
            };
        } else {
            alert(checkAnswerObject.message);
        }
        event.preventDefault();
    }

    toggleSolution() {
        this.setState({ solutionVisible: !this.state.solutionVisible })
    }

    checkAnswer() {
        for (let i = 0; i < this.props.answerFields.length; i++) {
            let item = this.props.answerFields[i];
            if (typeof item.correct !== 'undefined') {
                if (((item.type === "text-input") && (item.value !== Number(this.state[`${i}-value`]))) ||
                    ((item.type === "scientific-notation") && (
                        (item.exponent !== Number(this.state[`${i}-exponent`]) ||
                        (item.coefficient.toString() !== this.state[`${i}-coefficient`]))
                    )) || 
                    ((item.type === "select-correct") && (item.correct !== Number(this.state[`${i}-selected-item`])))) {
                        return false;
                }
            }
        };
        return true;
    }

    newExercise() {
        this.props.generateNewValues();
        this.resetInputFields();
        this.setState({ solutionVisible: false });
    }

    inputElements() {
        return this.props.answerFields.map((answerComponent, i) => {
            if (answerComponent.type === "scientific-notation") {
                return <span
                    className={exerciseStyles["scientific-notation-container"]}
                    key={i}
                >
                    <input
                        type="text"
                        className={exerciseStyles["coefficient"]}
                        onChange={this.handleChange}
                        value={this.state[`${i}-coefficient`]}
                        name={`${i}-coefficient`}
                    />
                    <InlineMath math="\times 10" />
                    <input
                        type="text"
                        className={exerciseStyles["exponent"]}
                        onChange={this.handleChange}
                        value={this.state[`${i}-exponent`]}
                        name={`${i}-exponent`}
                    />
                </span>
            } else if (answerComponent.type === "text-input") {
                return <input
                    type="text"
                    value={this.state[`${i}-value`]}
                    onChange={this.handleChange}
                    className={exerciseStyles["decimal"]}
                    name={`${i}-value`}
                    key={i}
                />
            } else if (answerComponent.type === "select-correct") {
                return typeof answerComponent.correct !== 'undefined' ? <select 
                    key={i}
                    onChange={this.handleChange}
                    name={`${i}-selected-item`}
                    value={this.state[`${i}-selected-item`]}
                >
                    {answerComponent.items.map((item, i) => <option key={i} value={i}>{item}</option>)}
                </select> : null;
            } else if (answerComponent.type === "text") {
                return <InlineMath key={i} math={answerComponent.content} />
            }
        })
    }

    resetInputFields() {
        this.props.answerFields.forEach((answerComponent, i) => {
            if (answerComponent.type === "scientific-notation") {
                this.setState({
                    [`${i}-coefficient`]: '',
                    [`${i}-exponent`]: '' 
                });
            } else if (answerComponent.type === "text-input") {
                this.setState({[`${i}-value`]: ''});
            } else if (answerComponent.type === "select-correct") {
                this.setState({[`${i}-selected-item`]: 0});
            }
        })
    }

    componentWillMount() {
        this.resetInputFields();
    }

    render() {
        console.log(this.state, this.props)
        return <div className={exerciseStyles.container}>
            <h2 className={exerciseStyles.title}>{this.props.title}</h2>
            <div>{this.props.description}</div>
            <div>
                {this.props.question.map(item => <BlockMath math={item} />)}
            </div>
            <div>
                {this.props.answerComment.map((item, i) => <div key={i}>{item}</div>)}
            </div>
            <div className={exerciseStyles["answer-section"]}>
                {this.inputElements()}
            </div>
            <span className={exerciseStyles.button} onClick={this.handleSubmit}>Check</span>
            {this.props.solution && <span className={exerciseStyles.button} onClick={this.toggleSolution}>Solution</span>}
            <span className={exerciseStyles.button} onClick={this.newExercise}>New Exercise</span>
            {this.state.solutionVisible && <Solution steps={this.props.solution}/>}
        </div>;
    }
}
