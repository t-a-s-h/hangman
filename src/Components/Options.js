import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Options = () => <div className={'App options'}>
    <Link to='/game'>You guess the word</Link><br/>
    <Link to='/auto'>The computer guesses the word</Link></div>

export default Options