import React, { useRef, useState } from 'react'
import { getWord } from '../functions/main'
import AutoHangman from './AutoHangman'
import Main from './Main'

import { Route } from "react-router-dom";

const Source = () => {
    
    const totalGuesses = 10

    const [guessesLeft, setGuessesLeft] = useState(totalGuesses)
        
    const [guessed, setGuessed] = useState([])
    
    const gameStatus = useRef('')

    const [gameOver, setGameOver] = useState(false)

    const [buttonStates, setButtonStates] = useState({})

    const startup = () => {
        setGameOver(false)
        setGuessed([])
        setButtonStates({})
        setGuessesLeft(totalGuesses)
    }

    const sourceProps = {
        buttonStates,
        setButtonStates,
        guessesLeft,
        setGuessesLeft,
        guessed,
        setGuessed,
        gameStatus,
        getWord,
        startup,
        gameOver,
        setGameOver
    }

    return (
        <>
            <Route exact path="/game" key="main">
                <Main 
                    totalGuesses = { totalGuesses }
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




