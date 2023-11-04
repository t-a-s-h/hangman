import React from 'react'
import styles from './GameArea.module.css'

const AutoGuesses = ({
    setGameOver, 
    autoGuess, 
    displayWord,
    word, 
    setWord,
    guessesLeft,
    guessedCorrect,
    bestGuesses,
    setBestGuesses,
    }) => {

    const ToDisplay = () => {
        if (guessesLeft  && bestGuesses.length === 1 && ! (bestGuesses[0] === displayWord.current)) return (
            <div className={styles.isInWord}>Is the word {bestGuesses[0]}?
                <button
                    className={styles.auto_btn}
                    onClick={()=>{
                        setGameOver(true)
                        setBestGuesses({words: [bestGuesses[0]], letter: ''})
                        setWord(bestGuesses[0])
                        displayWord.current = bestGuesses[0]
                    }}
                >Yes!
                </button>
                <button
                    className={styles.auto_btn}
                    onClick={()=>{
                        setGameOver(true)
                        setBestGuesses({words: [], letter: ''})
                    }}
                >No?
                </button>
            </div>
        )
        else if (bestGuesses[0] && (bestGuesses[0] === displayWord.current || bestGuesses[0] === word)) {
            setWord(bestGuesses[0])
            return <div className={styles.isInWord}>I got it! The word is { word }!</div>
        }
        else if (guessesLeft === 0  && bestGuesses.length) {
            setGameOver(true)
            return (
            <div> I couldn't guess that word. These are my best guesses.
            <ul>
                {bestGuesses.map(guess => <li key={guess}>{guess}</li>)}
            </ul>
            </div>)}
        else if (guessesLeft && bestGuesses.length) return (
            <div className={styles.isInWord}>
                    Is the letter { autoGuess } in the word?
                    <div>{!word && <button className={styles.auto_btn} form={'change_display'} type='submit'>{guessedCorrect? 'done' : 'not there'}</button>}</div>
            </div>
        ) 
        else return (
            <div className={styles.isInWord}> Sorry, I don't know that word.</div> 
        )
    }

    return (
        <div className={styles.auto_guess}>
            <ToDisplay/>
        </div>
    )
}

export default AutoGuesses