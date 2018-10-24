import React from "react"
import Exercise from "../Exercise"

export default class DecToSci extends React.Component {
    render() {
        return <Exercise 
            title="Convert Decimal to Scientific notation"
            description="Practice on converting Decimal to Scientific notation. Work in progress... do not use this component yet"
            question="\text{Write the number } 1.2354\times10^3 \text{ in Scientific notation}"
            answer="1235.4"
        />;
    }
}
