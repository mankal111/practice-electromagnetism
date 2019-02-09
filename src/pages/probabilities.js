import React from "react"
import SampleSpace from '../components/Exercises/SampleSpace'
import RuleOfProduct from '../components/Exercises/RuleOfProduct'
import indexStyles from "./index.module.css"
import { Link } from 'gatsby'

export default () => (
    <div className={indexStyles.main}>
        <h1>Probabilities</h1>
        <Link to="/">
            Back to main page
        </Link>
        <SampleSpace />
        <RuleOfProduct />
    </div>
);
