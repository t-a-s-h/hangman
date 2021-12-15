import React, { useEffect, useReducer, useRef, useState } from 'react'
import { getWord, getWordsArr } from '../API/main'
import AutoHangman from './AutoHangman'
import Main from './Main'

import { Route } from "react-router-dom";

const Source = () => {
    
    const [guessesLeft, setGuessesLeft] = useState(10)
    
    const [word, setWord] = useState(null)
    
    const [guessed, setGuessed] = useState([])
    
    const [displayWord, setDisplayWord] = useState(null)

    const [gameOver, setGameOver] = useState(false)

    const startup = () => {
        setGameOver(false)
        setGuessed([])
        setGuessesLeft(10)
        getWord((w) => {
            setWord(w)
            setDisplayWord(w.replace(/[a-z]/ig,'_'))
        })
    }

    const sourceProps = {
        guessesLeft,
        setGuessesLeft,
        guessed,
        setGuessed,
        word,
        setWord,
        displayWord,
        setDisplayWord,
        getWord,
        startup,
        gameOver,
        setGameOver
    }

    return (
        <>
            <Route exact path="/Hangman" key="main">
                <Main 
                    { ...sourceProps }
                    component = { 'main' }
                />
            </Route>
            <Route exact path="/auto" key="auto">
                <AutoHangman
                    { ...sourceProps }
                    component = { 'auto' }
                />
            </Route>
        </>
    )
}

export default Source




