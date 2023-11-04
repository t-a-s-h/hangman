import React, { useState, useEffect, useRef } from 'react'
import GameArea from '../Elements/GameArea'
import Modal from '../Elements/Modal'
import { getAllWords } from '../functions/main'
import './auto.css'

const AutoHangman = ({
    guessesLeft,
    setGuessesLeft,
    gameStatus,
    component,
    setButtonStates,
    }) => {

    const defaultNumLetters = 4
                    
    const [word, setWord] = useState([null])

    const displayWord = useRef('')

    const [gameOver, setGameOver] = useState(false)

    const numLetters = useRef(defaultNumLetters)
    
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
        return arr.filter(word => new RegExp('^'+displayWord.current?.replaceAll('_',guessed.length?`[^${guessed.join('')}]`: '.')+'$').test(word))        
    }

    const startup = (numLetters) => {
        document.forms[0].reset()
        setShow(true)
        setGameOver(false)
        setWord(null)
        setGuessed([])
        setGuessesLeft(totalGuesses)
        const w = getAllWords()
        const words = w.filter(word => word.length === numLetters)
        setBestGuesses({words: words, letter: mostCommonLetter(words)})
        displayWord.current = ('_'.repeat(numLetters))
    }       
    
    useEffect(()=> {
        const words = bestGuess(bestGuesses.words)
        if (! gameOver) {
            const letter = mostCommonLetter(words)
            setBestGuesses({words: words, letter: letter })
        }
        else {
            setBestGuesses({words: words, letter: '' })
        }
    },[gameOver, guessed])

    const guess = (letter) => {
        letter = letter.toLowerCase()
    
        if (guessed.includes(letter)) return
        if (!guessesLeft) return
        if (gameOver) return

        setGuessed([...guessed, letter])
        setGuessedIncorrect([...guessedIncorrect,letter])
        setGuessesLeft(guessesLeft - 1)
    }

    return (
        <div className="App spin-in">
            <a className='link' href='/game'>You guess the word next time</a>
            <GameArea
                component = { component }
                guessesLeft = { guessesLeft }
                currentDisplayWord = { displayWord }
                displayWord = { displayWord.current || '...' }
                guess = { guess }
                guessed = { guessed }
                setGameOver = { setGameOver }
                setGuessed = { setGuessed }
                startup = { startup }
                gameOver = { gameOver }
                word = { word }
                setWord = { setWord }
                numLetters = { numLetters.current }
                autoGuess = { bestGuesses.letter }
                setButtonStates = { setButtonStates }
                totalGuesses = { totalGuesses }
                bestGuess = { bestGuess }
                bestGuesses = { bestGuesses.words }
                setBestGuesses = { setBestGuesses }
                gameStatus = { gameStatus }
            />
        
            <Modal
                show={show}
            >
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    numLetters.current = parseInt(e.target.number.value)
                    startup(numLetters.current)
                    setShow(false)
                }
                }>

                    Pick a word <small>(between 4 and 15 letters)</small><br/>
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
