import React from 'react'
import styles from './GameArea.module.css'

const AutoGuesses = ({
    bestGuesses, 
    gameOver, 
    setGameOver, 
    autoGuess, 
    setDisplayWord, 
    wordFound, 
    guessedCorrect}) => {

    const ToDisplay = () => {
        if (!gameOver && bestGuesses.length === 1) return (
            <div>Is the word {bestGuesses[0]}?
            <button
                className={styles.auto_btn}
                onClick={()=>{
                    setDisplayWord(bestGuesses[0])
                    setGameOver(true)
                }}
            >Yes!
            </button>
            <button
                className={styles.auto_btn}
            >No?
            </button>
        </div>
        )
        else if (gameOver && !wordFound) return (
            <div> I couldn't guess that word. These are my best guesses.
            <ul>
                {bestGuesses.map(guess => <li key={guess}>{guess}</li>)}
            </ul>
            </div>)
        else if (gameOver) return <div>I got it! The word is {bestGuesses[0]}!</div>
        else return (
            <div className={styles.isInWord}>
                {autoGuess !== '' && <>Is the letter { autoGuess } in the word?</>}
                <div>{!wordFound && <button className={styles.auto_btn} form={'change_display'} type='submit'>{guessedCorrect? 'done' : 'not there'}</button>}</div>
            </div>
        )
    }

    return (
        <div className={styles.auto_guess}>
            <ToDisplay/>
        </div>
    )
}

export default AutoGuesses