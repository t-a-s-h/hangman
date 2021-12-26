import React, { useState, useEffect, useRef } from 'react'
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
    buttonStates
    }) => {

    const letterform = useRef(null)

    const letters1 = useRef([])
                
    const [word, setWord] = useState([null])

    const [allWords, setAllWords] = useState([])

    const numLetters = useRef(null)
    
    const wordsArr = useRef([])
    const [guessed, setGuessed] = useState([])
    const [guessedIncorrect, setGuessedIncorrect] = useState([])

    const [autoGuess, setAutoGuess] = useState('none')

    const [show, setShow] = useState(true)

    const startup = (numLetters) => {
        setGameOver(false)
        setWord(null)
        setGuessed([])
        setGuessesLeft(15)
        getAllWords((w) => {
            setAllWords(w)
        })
        setDisplayWord('_'.repeat(numLetters))
        setShow(true)
    }

    const mostCommonLetter = (arr) => {
        const letters = ['e','a','r','i','o','t','n','s','l','c','u','d','p','m','h','g','b','f','y','w','k','v','x','z','j','q']
        const contains = {none: -Infinity}

        arr.forEach(word => {
            return [...word].forEach(letter => {
                if (!guessed.includes(letter)) return contains[letter]? contains[letter]++ : contains[letter] = 1            
            })
        })
    
        const arr1 = Object.keys(contains).filter(key => !guessed.includes(key))

        const bestGuessLetter = arr1.reduce((max, curr) => {
            if (!guessed.includes(curr) && contains[curr] > contains[max]) {
                return curr
            } else if (!guessed.includes(curr) && contains[curr] === contains[max]) {
                return letters.indexOf(curr) < letters.indexOf(max) ? curr : max
            } else {
                return max
            }
        },'none')
        letters1.current?.[bestGuessLetter.toUpperCase().charCodeAt(0) - 65]?.classList.add('best-guess')
        // console.log(letters1,letters1.current?.[bestGuessLetter.toUpperCase().charCodeAt(0) - 65],bestGuessLetter.toUpperCase().charCodeAt(0) - 65)
        return bestGuessLetter
    }

    const bestGuess = (arr) => {
        const newArr = arr.filter(word => new RegExp('^'+displayWord?.replaceAll('_',guessed.length?`[^${guessed.join('')}]`: '.')+'$').test(word))        
        console.log(new RegExp('^'+displayWord?.replaceAll('_',guessed.length?`[^${guessed.join('')}]`: '.')+'$'))
        // console.log(newArr)
        return mostCommonLetter(newArr)
    }
                
    useEffect(()=> {
        setAutoGuess(bestGuess(wordsArr.current))
    },[guessed, gameOver, bestGuess])

    useEffect(() => {
        if (!(guessesLeft && (!displayWord || /_/.test(displayWord)))) {
            setGameOver(true)
        }
        if (!/_/.test(displayWord)) setWord(displayWord)
    },[displayWord + guessesLeft])


            
                    
    const guess = (letter) => {
        letter = letter.toLowerCase()
    
        if (guessed.includes(letter)) return
        if (!guessesLeft) return
    
        setGuessed([...guessed, letter])
        setGuessedIncorrect([...guessedIncorrect,letter])
        setGuessesLeft(guessesLeft - 1)
    }

    useEffect(()=>{  
        startup()
    },[])

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
                component = { component }
                gameOver = { gameOver }
                word = { word }
                numLetters = { numLetters.current }
                letters = { letters1.current }
                autoGuess = { autoGuess }
                setButtonStates = { setButtonStates }
                buttonStates = { buttonStates }
            />
        
            <Modal
                setShow={setShow}
                show={show}
            >
                <form ref={ letterform } onSubmit={(e)=>{
                    e.preventDefault()
                    numLetters.current = parseInt(e.target.number.value)
                    startup(numLetters.current)
                    wordsArr.current = allWords.filter(word=> word.length === parseInt(e.target.number.value))
                    letterform.current.style.display = 'none'
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
