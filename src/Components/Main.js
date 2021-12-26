import React, { useEffect, useState, useRef } from 'react'
import GameArea from '../Elements/GameArea'
import Score from '../Elements/Score'
import GameOver from '../Elements/GameOver'

const Main = ({         
    guessesLeft,
    setGuessesLeft,
    guessed,
    setGuessed,
    word,
    displayWord,
    setDisplayWord,
    startup,
    gameOver,
    setGameOver,
    component,
    buttonStates,
    setButtonStates
 }) => {

    const letters = useRef([])

    const [gameWon, setGameWon] = useState(false)

    const gameOverBtnRef = useRef(null)

    useEffect(() => {
        document.querySelector('.App').focus()
        startup()
    },[startup])
    
    const wordRef = useRef(null)

    useEffect(() => {
        if (!gameOver) wordRef.current = word
    }, [word, gameOver])

    const guess = (letter) => {

        letter = letter.toLowerCase()
    
        if (guessed.includes(letter)) return
        if (displayWord === word) return
        if (!guessesLeft) return
    
        setGuessed([...guessed, letter])    
    
        if (word && word.includes(letter)) {
            const newDisplay = displayWord.split('').map((displayed,i) => {
                if (word[i] === letter) {
                    return letter
                }
                else return displayed
            }).join('')
    
            setDisplayWord(newDisplay)
        } 
    
        else {
            setGuessesLeft(guessesLeft - 1)
        }
        document.querySelector('.App').focus()
    }

    const [areGuessesLeft,setAreGuessesLeft] = useState(!!guessesLeft)

    useEffect(() => {
        setAreGuessesLeft(!!guessesLeft)
    }, [guessesLeft])

    useEffect(() => {
        if (!areGuessesLeft || (word && (displayWord === word))) setGameOver(true)
    },[areGuessesLeft, word, displayWord, setGameOver])

    useEffect(() => {
        if (word === displayWord && gameOver) setGameWon(true)
    }, [gameOver, word, displayWord])

    return (
        <div 
            className='App spin-in'
            tabIndex='0'
            onKeyDown={ (e) => {
                const letter = e.key.toUpperCase()
                setButtonStates({...buttonStates,[letter]:'active'})
            }}
            onKeyUp={ (e) => {
                if (e.key.match(/^[a-z]$/i)) {
                    e.preventDefault()
                    const letter = document.querySelector(`#${e.key.toUpperCase()}`)
                    letter.click()
                } else if (e.key.match(/ /)) gameOverBtnRef.current.click()
            }}
        >
            <Score
                areGuessesLeft = { areGuessesLeft }
                guessesLeft = { guessesLeft }
                gameOver = { gameOver }
                gameWon = { gameWon }
                displayWord = { displayWord } 
                word = { word }
            />
            <GameOver
                gameWon = { gameWon }
                displayWord = { displayWord }
                word = { wordRef.current }
                gameOver = { gameOver }
            />
            <GameArea 
                guessesLeft = { guessesLeft }
                word = { word }
                letters = { letters }
                displayWord = { displayWord? displayWord : '...'}
                guess = { guess }
                guessed = { guessed }
                gameOver = { gameOver }
                setGameOver = { setGameOver }
                setGameWon = { setGameWon }
                startup = { startup }
                component = { component }
                gameOverBtnRef = { gameOverBtnRef }
                buttonStates = { buttonStates }
            />
        </div>
    )
}

export default Main
