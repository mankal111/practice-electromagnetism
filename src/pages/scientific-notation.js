import React from "react"
import SciToDec from "../components/Exercises/SciToDec"
import DecToSci from "../components/Exercises/DecToSci"
import SciAddition from "../components/Exercises/SciAddition"
import indexStyles from "./index.module.css"
import { Link } from 'gatsby'

export default () => (
    <div className={indexStyles.main}>
        <h1>Scientific Notation</h1>
        <Link to="/">
            Back to main page
        </Link>
        <SciToDec />
        <DecToSci />
        <SciAddition />
    </div>
);
