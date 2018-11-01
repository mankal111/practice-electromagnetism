import React from "react"
import SciToDec from "../components/Exercises/SciToDec"
import DecToSci from "../components/Exercises/DecToSci"
import SciAddition from "../components/Exercises/SciAddition"
import indexStyles from "./index.module.css"

export default () => (
    <div className={indexStyles.main}>
        <h1>Electromagnetism exercises</h1>
        <SciToDec />
        <DecToSci />
        <SciAddition />
    </div>
);
