import React, { useEffect } from 'react'
import './Splash.module.css';
import addTransition from '../functions'

const Splash = () => {

    useEffect(()=> {
        addTransition('/Hangman')
    },[])

    return (
        <header id='Splash'>
            <a href='/Hangman'>

                <h1>
                    <span><span>H</span>_</span>
                    <span><span>a</span>_</span>
                    <span><span>n</span>_</span>
                    <span><span>g</span>_</span>
                    <span><span>m</span>_</span>
                    <span><span>a</span>_</span>
                    <span><span>n</span>_</span>
                </h1>
                </a>
        </header>
        
    )
}

export default Splash
