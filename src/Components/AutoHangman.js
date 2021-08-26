import React, { useState, useEffect, useRef } from 'react'
import GameArea from '../Elements/GameArea'
import { getWord, getWordsArr, getAllWords } from '../API/main'
import Main from './Main'

const AutoHangman = ({
    SVGhangman,
    hangman,
    paths,
    guessesLeft,
    setGuessesLeft,
    // guessed,
    // setGuessed,
    // word,
    // setWord,
    displayWord,
    setDisplayWord,
    // startup,
    setHangman,
    currMan,
    hangMan,
    component
    // guess
}) => {

    // getWordsArr(10,(w)=>{
    //     console.log('here',w)
    // })
    // const [guessesLeft, setGuessesLeft] = useState(10

    const [word, setWord] = useState([null])

    const numLetters = useRef(null)
    
    const [wordsArr, setWordsArr] = useState([])
    const [guessed, setGuessed] = useState([])
    const [guessedIncorrect, setGuessedIncorrect] = useState([])

    const [autoGuess, setAutoGuess] = useState('')

    const startup = () => {
        // setGameOver(false)
        newGame('')
        setGuessed([])
        console.log(guessed)
        setGuessesLeft(30)
        // getWordsArr(100,(w) => {
        //     console.log(sortByMostCommon(w))
        // })
        getAllWords((w) => {
            // const currentWord = w[Math.floor(Math.random() * w.length)]
            // setWord(currentWord)
            setWordsArr(w)
            // console.log(w)
            // setDisplayWord(currentWord.replace(/[a-z]/ig,'_'))
            // console.log(bestGuess(w[0].length,w))

        })
        paths.map(path => {
            path.style.stroke = 'transparent'
            path.removeAttribute('class','path')
        })
        hangMan([])
    }


    const sortByMostCommon = (arr) => { 
        const letters = ['e','a','r','i','o','t','n','s','l','c','u','d','p','m','h','g','b','f','y','w','k','v','x','z','j','q']
        return arr.sort((a,b)=> {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return letters.indexOf(a[i]) - letters.indexOf(b[i])
            }
        })
    }
   

    const mostCommonLetter = (arr) => {
        const letters = ['e','a','r','i','o','t','n','s','l','c','u','d','p','m','h','g','b','f','y','w','k','v','x','z','j','q']
        const contains = {none: -Infinity}

        arr.forEach(word => {
            // for (letter of word) {
                return word.match(/[a-z]/ig).map(letter => {
                    if (!guessed.includes(letter)) return contains[letter]? contains[letter]++ : contains[letter] = 1
                // }
            
            })
        })
        console.log(arr)
        // setWordsArr(arr)
    
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


        // return arr1.reduce((max, curr) => {
        //     console.log(contains, guessed)
        //     return (!guessed.includes(curr) && contains[curr] > contains[max]) ? curr : max
        // },'empty')
        // // return [...arr.join()].reduce((mostCommon,letter)=>{
        //     console.log(mostCommon,letter)
            
        //     obj[letter]? obj[letter]++ : obj[letter] = 1
        //     return (obj[letter] > obj[mostCommon])? letter : mostCommon
        // }
    }

    // const mostCommonLetter = (arr) => {
    //     const letters = ['e','a','r','i','o','t','n','s','l','c','u','d','p','m','h','g','b','f','y','w','k','v','x','z','j','q']
    //     const contains = {}

    //     arr.forEach(word => {
    //         // for (letter of word) {
    //             word.match(/[a-z]/ig).map(letter => {
    //                 return contains[letter]? contains[letter]++ : contains[letter] = 1
                
    //             // }
            
    //     })
    // })

    // return contains



    const bestGuess = (length,arr) => {
        // guessRendered.current = false
        console.log(wordsArr)
        const re = displayWord? new RegExp(displayWord.replaceAll('_','.'),'i') : new RegExp('.'.repeat(numLetters.current),'g')
        console.log(re, guessedIncorrect)
        const newArr = arr.filter(word => word.length === length && !(new RegExp(`[${guessedIncorrect?.join('')?? ''}]`,'gi')).test(word) && re.test(word))
        console.log(newArr)
        // setWordsArr(newArr)
        return mostCommonLetter(newArr)
    }

    const newGame = (wordLength) => {
        setDisplayWord('_'.repeat(wordLength))
    }

    

    //     return letters.map(letter => {
    //         return {
    //             length: arr.join('').match(new RegExp(letter, 'gi'))?.length?? 0,
    //             letter: letter
    //         }
    //     }).reduce((max,curr)=>{
    //         return (curr.length > max.length)? curr : max
    //     })
    // }

    // const autoGuess = () => {
    //     const sameLengthWords = wordsArr.filter(w => w.length === word.length)
        
    // }


    // const guessRendered = useRef(false)

    // const r = () =>{
    //     setAutoGuess(bestGuess(numLetters,wordsArr))
    // }
    // r()

    useEffect(()=> {
        // if (!guessRendered.current)  {
            console.log(numLetters.current, typeof numLetters.current)
            setAutoGuess(bestGuess(numLetters.current,wordsArr))
        // }
    },[guessed])


    // useEffect(()=> {
    //     guessRendered.current = true
    // },[guessed])

    // useEffect(()=> {
    //     console.log(numLetters, wordsArr)
    //     return setAutoGuess(bestGuess(numLetters,wordsArr))
    //     // setGuessRendered(true) 
    // })

    const guess = (letter) => {
        letter = letter.toLowerCase()
    
        if (guessed.includes(letter)) return
        // if (displayWord === word) return
        if (!guessesLeft) return
    
        setGuessed([...guessed, letter])
        // console.log(currMan)
    
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
            setGuessedIncorrect([...guessedIncorrect,letter])
            setGuessesLeft(guessesLeft - 1)
        }
    }


    useEffect(()=>{  

        startup()
    },[])

    

    return (
        <div>
            
            <GameArea
                guessesLeft = { guessesLeft }
                // word = { word }
                displayWord = { displayWord? displayWord : '...'}
                setDisplayWord = { setDisplayWord }
                guess = { guess }
                guessed = { guessed }
                setGuessed = { setGuessed }
                currMan = {  <object height="100ch" height="400ch" ref={SVGhangman} data={hangman}></object> }
                startup = { startup }
                component = { component }
            />
            <form onSubmit={ (e)=>{
                e.preventDefault()
                numLetters.current = parseInt(e.target.querySelector('input').value)
                console.log(numLetters)
                setAutoGuess(bestGuess(numLetters.current,wordsArr))
                console.log(numLetters.current, wordsArr)
                return newGame(e.target.querySelector('input').value) }
            }>
                <label>How many letters in the word? </label>
                <input type='number' defaultValue='4' min='4' max='15'/>
                <button type="submit">start</button>
                </form>
            <span>Best guess: { autoGuess }</span>
        </div>
    )
}

export default AutoHangman
