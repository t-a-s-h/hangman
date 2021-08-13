import React, { useEffect, useReducer, useRef, useState } from 'react'
import { getWord, getWordsArr } from '../API/main'
import AutoHangman from './AutoHangman'
import Main from './Main'
import hangman from '../hangman.svg'

import { Route } from "react-router-dom";

const Source = () => {

    const SVGhangman = useRef(null)

    const paths = [...SVGhangman?.current?.getSVGDocument() ? SVGhangman.current.getSVGDocument().querySelectorAll('path, circle') : '']
    
    const [guessesLeft, setGuessesLeft] = useState(10)
    
    const [word, setWord] = useState(null)
    
    const [guessed, setGuessed] = useState([])
    
    const [displayWord, setDisplayWord] = useState(null)

    const setHangman = () => {
        return paths.reverse().map((path,i) => {
            return (i >= guessesLeft)? (path.style.stroke = 'navy', path.setAttribute("class", "path")) : path
        })
    }

    const [currMan, hangMan] = useState(
       []
    )

    const [gameOver, setGameOver] = useState(false)
        
    // const guess = (letter) => {
    
    //     letter = letter.toLowerCase()
    
    //     if (guessed.includes(letter)) return
    //     if (displayWord === word) {
    //         setGameOver(true)
    //         return
    //     }
    //     if (!guessesLeft) return
    
    //     setGuessed([...guessed, letter])
    //     console.log(currMan)
    
    //     hangMan(setHangman)
    
    //     if (word && word.includes(letter)) {
    //         const newDisplay = displayWord.split('').map((displayed,i) => {
    //             if (word[i] === letter) {
    //                 return letter
    //             }
    //             else return displayed
    //         }).join('')
    
    //         setDisplayWord(newDisplay)
    //     } 
    
    //     else setGuessesLeft(guessesLeft - 1)
    // }

    const startup = () => {
        setGameOver(false)
        setGuessed([])
        setGuessesLeft(10)
        getWord((w) => {
            setWord(w)
            setDisplayWord(w.replace(/[a-z]/ig,'_'))
        })
        paths.map(path => {
            path.style.stroke = 'transparent'
        })
        console.log(currMan)
        hangMan([])
    }

    const sourceProps = {
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
        getWord,
        startup,
        setHangman,
        hangMan,
        currMan,
        // guess,
        gameOver,
        setGameOver
    }

    // sourceProps.startup = sourceProps.startup.bind(sourceProps)

    return (
        <>
            <Route exact path="/Hangman" key="main">
                <Main 
                    {...sourceProps}
                />
            </Route>
            <Route exact path="/Auto" key="auto">
                <AutoHangman
                    {...sourceProps}
                />
            </Route>
        </>
    )
}

export default Source




