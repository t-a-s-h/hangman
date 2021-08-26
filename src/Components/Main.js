import React, { useEffect, useReducer, useRef, useState } from 'react'
import GameArea from '../Elements/GameArea'
import { getWord, getAllWords } from '../API/main'


const Main = ({         
    SVGhangman,
    hangman,
    hangMan,
    currMan,
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
    gameOver,
    setGameOver,
    component
 }) => {

    useEffect(() => {
        document.querySelector('.App').focus()
        console.log(startup, typeof startup)

        // getAllWords(words => {
        //     const longest = words.reduce((longestWord,nextWord) => {
        //         return nextWord.length > longestWord.length ? nextWord : longestWord
        //     },words[0] || '')
        //     console.log("l",longest, longest.length)
        // })
        startup()
    },[])

    const guess = (letter) => {
    
        letter = letter.toLowerCase()
    
        if (guessed.includes(letter)) return
        if (displayWord === word) return
        if (!guessesLeft) return
    
        setGuessed([...guessed, letter])
        console.log(currMan)
    
    
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
    }


    useEffect(() => {
        if (!guessesLeft || (word && (displayWord === word))) setGameOver(true)
        console.log(guessesLeft, displayWord, word)
        return hangMan(setHangman())
    },[guessesLeft && (displayWord === word) || (displayWord && guessesLeft)])

    return (
        <div 
            className='App'
            tabIndex='0'
            onKeyPress={ (e) => {
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
                currMan = {  <object height="100ch" height="400ch" ref={SVGhangman} data={hangman}></object> }
                gameOver = { gameOver }
                startup = { startup }
                component = { component }
            />
        </div>
    )
}

export default Main
