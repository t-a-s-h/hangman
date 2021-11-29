import React, { useEffect, useReducer, useRef, useState } from 'react'
import GameArea from '../Elements/GameArea'

const Main = ({         
    guessesLeft,
    setGuessesLeft,
    guessed,
    setGuessed,
    word,
    setWord,
    displayWord,
    setDisplayWord,
    startup,
    gameOver,
    setGameOver,
    component
 }) => {

    const isMobile = useRef(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

    useEffect(() => {
        document.querySelector('.App').focus()
        startup()
    },[])

    const getKeyboard = () => {
        document.querySelector('textarea').style.visibility = "visible"
        if (isMobile) document.querySelector('textarea').focus()
        document.querySelector('textarea').style.visibility = "hidden"
    }

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


    useEffect(() => {
        if (!guessesLeft || (word && (displayWord === word))) setGameOver(true)
        console.log(guessesLeft, displayWord, word)
    },[guessesLeft && (displayWord === word) || (displayWord && guessesLeft)])

    return (
        <div 
            className='App spin-in'
            tabIndex='0'
            onKeyUp={ (e) => {
                if (e.key.match(/^[a-z]$/i)) {
                    e.preventDefault()
                    console.log(`#${e.key.toUpperCase()}`, document.querySelector(`#${e.key.toUpperCase()}`))
                    const letter = document.querySelector(`#${e.key.toUpperCase()}`)
                    letter.click()
                } else if (e.key.match(/ /)) return startup()
            }}
        >
            <GameArea 
                guessesLeft = { guessesLeft }
                word = { word }
                displayWord = { displayWord? displayWord : '...'}
                guess = { guess }
                guessed = { guessed }
                gameOver = { gameOver }
                startup = { startup }
                component = { component }
            />
        </div>
    )
}

export default Main
