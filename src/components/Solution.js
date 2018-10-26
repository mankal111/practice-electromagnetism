import React from "react"
import 'katex/dist/katex.min.css'
import {BlockMath} from "react-katex"

export default class Solution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {steps: [], animationIndex: 0};
        this.stepComponent = this.stepComponent.bind(this);
    }

    componentDidMount() {
        this.setState({steps: this.props.steps, animationIndex: 0});
        setInterval(() => { this.setState({animationIndex: this.state.animationIndex + 1}) }, 1000);
    }

    stepComponent(content) {
        if (content.constructor === Array) {
            return <BlockMath math={content[this.state.animationIndex % content.length]} />
        } else {
            return <BlockMath math={content} />
        }
    }

    render() {
        return <div>
            <h3>Solution:</h3>
            {this.state.steps.map(step => this.stepComponent(step))}
        </div>;
    }
}
