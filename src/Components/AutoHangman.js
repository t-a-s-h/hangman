import React, { useState, useEffect, useRef, useCallback } from 'react'
import GameArea from '../Elements/GameArea'
import Modal from '../Elements/Modal'
import { getAllWords } from '../API/main'
import './auto.css'

const AutoHangman = ({
    gameOver,
    guessesLeft,
    setGuessesLeft,
    displayWord,
    setDisplayWord,
    setGameOver,
    component,
    setButtonStates,
    }) => {
                
    const [word, setWord] = useState([null])

    const numLetters = useRef(4)
    
    const [bestGuesses, setBestGuesses] = useState({words:[], letter:''})
    const [guessed, setGuessed] = useState([])
    const [guessedIncorrect, setGuessedIncorrect] = useState([])

    const [show, setShow] = useState(true)

    const totalGuesses = 10

    const mostCommonLetter = (arr) => {
        const letters = ['e','a','r','i','o','t','n','s','l','c','u','d','p','m','h','g','b','f','y','w','k','v','x','z','j','q']
        const contains = {'': -Infinity}

        arr.forEach(word => {
            return [...word].forEach(letter => {
                if (!guessed.includes(letter)) return contains[letter]? contains[letter]++ : contains[letter] = 1            
            })
        })
    
        const arr1 = Object.keys(contains).filter(key => !guessed.includes(key))

        return arr1.reduce((max, curr) => {
            if (!guessed.includes(curr) && contains[curr] > contains[max]) {
                return curr
            } else if (!guessed.includes(curr) && contains[curr] === contains[max]) {
                return letters.indexOf(curr) < letters.indexOf(max) ? curr : max
            } else {
                return max
            }
        },'')

    }

    const bestGuess = (arr) => {
        return arr.filter(word => new RegExp('^'+displayWord?.replaceAll('_',guessed.length?`[^${guessed.join('')}]`: '.')+'$').test(word))        
    }

    const startup = useCallback((numLetters) => {
        document.forms[0].reset()
        setShow(true)
        setGameOver(false)
        setWord(null)
        setGuessed([])
        setGuessesLeft(totalGuesses)
        getAllWords((w) => {
            const words = w.filter(word => word.length === numLetters)
            setBestGuesses({words: words, letter: mostCommonLetter(words)})
        })
        setDisplayWord('_'.repeat(numLetters))
    },[setDisplayWord, setGameOver, setGuessesLeft])

    useEffect(()=>{  
        startup()
    },[startup])
            
    
    useEffect(()=> {
        if (!gameOver) {
            const words = bestGuess(bestGuesses.words)
            setBestGuesses({words: words, letter: mostCommonLetter(words)})
        }
    },[gameOver, guessed])

    useEffect(() => {
        if (!(guessesLeft && (!displayWord || /_/.test(displayWord)))) {
            setGameOver(true)
        }
        if (!/_/.test(displayWord) || !bestGuesses.words) {
            setWord(displayWord)
            setBestGuesses({words:[], letter:''})
        }

    },[displayWord, guessesLeft, setGameOver])
                    
    const guess = (letter) => {
        letter = letter.toLowerCase()
    
        if (guessed.includes(letter)) return
        if (!guessesLeft) return
    
        setGuessed([...guessed, letter])
        setGuessedIncorrect([...guessedIncorrect,letter])
        setGuessesLeft(guessesLeft - 1)
    }

    return (
        <div className="App">
            <GameArea
                component = { component }
                guessesLeft = { guessesLeft }
                displayWord = { displayWord || '...' }
                setDisplayWord = { setDisplayWord }
                guess = { guess }
                guessed = { guessed }
                setGuessed = { setGuessed }
                startup = { startup }
                gameOver = { gameOver }
                word = { word }
                numLetters = { numLetters.current }
                autoGuess = { bestGuesses.letter }
                setButtonStates = { setButtonStates }
                // buttonStates = { buttonStates }
                totalGuesses = { totalGuesses }
                bestGuesses = { bestGuesses.words }
                setBestGuesses = { setBestGuesses }
                setGameOver = { setGameOver }
            />
        
            <Modal
                setShow={setShow}
                show={show}
            >
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    numLetters.current = parseInt(e.target.number.value)
                    startup(numLetters.current)
                    setShow(false)
                }
                }>

                    Pick a word, any word <small>(between 4 and 15 letters)</small><br/>
                    <label>How many letters in the word? </label>
                    <div>
                        <input name='number' type='number' defaultValue='4' min='4' max='15'/>
                    </div>
                    <button type='submit'>start</button>
                
                </form>
            </Modal>
        </div>
    )
}

export default AutoHangman
