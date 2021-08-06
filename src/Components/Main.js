import React, { useEffect, useReducer, useRef, useState } from 'react'
import GameArea from '../Elements/GameArea'
import getWord from '../API/main'
import hangman from '../hangman.svg'


const Main = () => {

    const SVGhangman = useRef(null)

    const [guessesLeft, setGuessesLeft] = useState(10)

    const [word, setWord] = useState(null)

    const [guessed, setGuessed] = useState([])

    const paths = [...SVGhangman?.current?.getSVGDocument() ? SVGhangman.current.getSVGDocument().querySelectorAll('path, circle') : '']

    useEffect(() => {
        setGuessed([])
        getWord((w) => {
            setWord(w)
            setDisplayWord(w.replace(/[a-z]/ig,'_'))
        })
        paths.map(path => {
            path.style.stroke = 'transparent'
        })
        hangMan()
        // return () => {
        // }
    },[])

    const [currMan, hangMan] = useReducer((man)=>{
        
        console.log(man)

        console.log(SVGhangman,[...paths]);
        paths.reverse().map((path,i) => {
            
            return (i >= guessesLeft)? (path.style.stroke = 'navy', path.setAttribute("class", "path")) : path
        })
       
},[])

    const guess = (letter) => {

        letter = letter.toLowerCase()

        if (guessed.includes(letter)) return
        if (displayWord === word) return
        if (!guessesLeft) return

        setGuessed([...guessed, letter])

        hangMan()

        if (word && word.includes(letter)) {
            const newDisplay = displayWord.split('').map((displayed,i) => {
                if (word[i] === letter) {
                    return letter
                }
                else return displayed
            }).join('')

            setDisplayWord(newDisplay)
        } 

        else setGuessesLeft(guessesLeft - 1)
    }

    const [displayWord, setDisplayWord] = useState(null)

    return (
        <div 
            className='App'
            tabIndex='0'
            onKeyPress={ (e) => {
                if (e.key.match(/^[a-z]$/i)) {
                    e.preventDefault()
                    console.log(`#${e.key.toUpperCase()}`, document.querySelector(`#${e.key.toUpperCase()}`))
                    const letter = document.querySelector(`#${e.key.toUpperCase()}`)
                    letter.click()//return guess(e.key.toLowerCase())
                }
            }}
        >
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

export default Main
