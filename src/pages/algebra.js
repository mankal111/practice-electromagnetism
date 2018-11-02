import React from "react"
import indexStyles from "./index.module.css"
import { Link } from 'gatsby'

export default () => (
    <div className={indexStyles.main}>
        <h1>Algebra</h1>
        <Link to="/">
            Back to main page
        </Link>
    </div>
);
