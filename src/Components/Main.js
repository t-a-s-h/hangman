import React, { useEffect, useState, useRef } from 'react'
import GameArea from '../Elements/GameArea'
import Score from '../Elements/Score'
import GameOver from '../Elements/GameOver'
import { getWord } from '../functions/main'

const Main = ({         
    totalGuesses
 }) => {

    const guessesLeft = useRef(totalGuesses)
    
    const word = useRef(null)
    
    const [guessed, setGuessed] = useState([])
    
    const displayWord = useRef(null)

    const [buttonStates, setButtonStates] = useState({})

    const letters = useRef([])

    const gameStatus = useRef('pending')

    const gameOverBtnRef = useRef(null)

    const startup = () => {
        gameStatus.current = 'pending'
        setGuessed([])
        setButtonStates({})
        guessesLeft.current = (totalGuesses)
        const w = getWord()
        word.current = (w)
        displayWord.current = (w.replace(/[a-z]/ig,'_'))
    }

    useEffect(() => {
        document.querySelector('.App').focus()
        startup()
    },[])

    const guess = (letter) => {

        letter = letter.toLowerCase()
    
        if (guessed.includes(letter)) return
    
        setGuessed([...guessed, letter])    
    
        if (word.current && word.current.includes(letter)) {
            const newDisplay = displayWord.current.split('').map((displayed,i) => {
                if (word.current[i] === letter) {
                    return letter
                }
                else return displayed
            }).join('')
    
            displayWord.current = (newDisplay)
        } 
    
        else {
            guessesLeft.current = (guessesLeft.current - 1)
        }

        if (displayWord.current === word.current) {
            gameStatus.current = ('won')
            return
        }
        if (!guessesLeft.current) {
            gameStatus.current = ('lost')
            return
        }

        document.querySelector('.App').focus()
    }

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
                } else if (e.key.match(/ /)) {
                    setButtonStates({...buttonStates,' ': ''})
                    gameOverBtnRef.current.click()

                }
            }}
        >
            <a className='link' href='/auto'>Have the computer guess instead</a>
            <Score
                guessesLeft = { guessesLeft }
                gameStatus = { gameStatus }
                displayWord = { displayWord } 
                word = { word }
            />
            <GameOver
                gameStatus = { gameStatus }
                displayWord = { displayWord }
                word = { word }
                startup = { startup }
            />
            <GameArea 
                guessesLeft = { guessesLeft.current }
                word = { word }
                letters = { letters }
                displayWord = { displayWord.current || '...'}
                guess = { guess }
                guessed = { guessed }
                gameStatus = { gameStatus }
                startup = { startup }
                component = { 'main' }
                gameOverBtnRef = { gameOverBtnRef }
                buttonStates = { buttonStates }
                setButtonStates = { setButtonStates }
                totalGuesses = {totalGuesses}
            />
        </div>
    )
}

export default Main
