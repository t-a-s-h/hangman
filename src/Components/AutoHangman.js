import React, { useState, useEffect, useRef } from 'react'
import GameArea from '../Elements/GameArea'
import { getAllWords } from '../API/main'

const AutoHangman = ({
    gameOver,
    guessesLeft,
    setGuessesLeft,
    displayWord,
    setDisplayWord,
    setGameOver,
    component
    }) => {

                
    const [word, setWord] = useState([null])

    const [allWords, setAllWords] = useState([])

    const numLetters = useRef(null)
    
    const wordsArr = useRef([])
    const [guessed, setGuessed] = useState([])
    const [guessedIncorrect, setGuessedIncorrect] = useState([])

    const [autoGuess, setAutoGuess] = useState('')

    const startup = (numLetters) => {
        setGameOver(false)
        setGuessed([])
        setGuessesLeft(10)
        getAllWords((w) => {
            setAllWords(w)
        })
        setDisplayWord('_'.repeat(numLetters))
    }


    const sortByMostCommon = (arr) => { 
        const letters = ['e','a','r','i','o','t','n','s','l','c','u','d','p','m','h','g','b','f','y','w','k','v','x','z','j','q']
        return arr.sort((a,b)=> {
            for (let i = 0; i < a.length || b.length; i++) {
                if (a[i] !== b[i]) return letters.indexOf(a[i]) - letters.indexOf(b[i])
            }
        })
    }
   

    const mostCommonLetter = (arr) => {
        const letters = ['e','a','r','i','o','t','n','s','l','c','u','d','p','m','h','g','b','f','y','w','k','v','x','z','j','q']
        const contains = {none: -Infinity}

        arr.forEach(word => {
            return [...word].map(letter => {
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
        },'none')
    }

    const bestGuess = (arr) => {
        const newArr = arr.filter(word => new RegExp('^'+displayWord?.replaceAll('_',guessed.length?`[^${guessed.join('')}]`: '.')+'$').test(word))        
        console.log(new RegExp('^'+displayWord?.replaceAll('_',guessed.length?`[^${guessed.join('')}]`: '.')+'$'))
        console.log(newArr)
        return mostCommonLetter(newArr)
    }
                
    useEffect(()=> {
        setAutoGuess(bestGuess(wordsArr.current))
    },[guessed, gameOver])

    useEffect(() => {
        if (!(guessesLeft && /[_.]/.test(displayWord))) setGameOver(true)
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
        <div>

            <GameArea
                guessesLeft = { guessesLeft }
                displayWord = { displayWord || '...'}
                setDisplayWord = { setDisplayWord }
                guess = { guess }
                guessed = { guessed }
                setGuessed = { setGuessed }
                startup = { startup }
                component = { component }
                gameOver = { gameOver }
                word = { word }
                numLetters = { numLetters.current }
            />
            <form onSubmit={ (e)=>{
                e.preventDefault()
                numLetters.current = parseInt(e.target.number.value)
                startup(numLetters.current)
                wordsArr.current = allWords.filter(word=> word.length === parseInt(e.target.number.value))
            }
            }>
                <label>How many letters in the word? </label>
                <input name='number' type='number' defaultValue='4' min='4' max='15'/>
                <button type="submit">start</button>
            </form>
            <span>Best guess: { autoGuess }</span>
        </div>
    )
}

export default AutoHangman
