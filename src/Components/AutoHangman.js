import React, { useState } from 'react'
import GameArea from '../Elements/GameArea'
import Main from './Main'

const AutoHangman = ({
    SVGhangman,
    hangman,
    paths,
    guessesLeft,
    setGuessesLeft,
    guessed,
    setGuessed,
    word,
    setWord,
    displayWord,
    setDisplayWord,
    startup,
    setHangman,
    guess
}) => {

    // const [guessesLeft, setGuessesLeft] = useState(10)

    // const [word, setWord] = useState(null)

    // const [guessed, setGuessed] = useState([])

    return (
        <div>
            <GameArea
                guessesLeft = { guessesLeft }
                word = { word }
                displayWord = { displayWord? displayWord : '...'}
                guess = { guess }
                guessed = { guessed }
                currMan = {  <object height="100ch" height="400ch" ref={SVGhangman} data={hangman}></object> }
            />
        </div>
    )
}

export default AutoHangman
