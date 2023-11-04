import React, { useState } from 'react'
import styles from './GameArea.module.css'
import ChangeDisplay from './ChangeDisplay'
import Letters from './Letters'
import Hangman from './Hangman'
import AutoGuesses from './AutoGuesses'

const GameArea = ({ 
    guessesLeft, 
    displayWord,
    guess, 
    guessed, 
    gameStatus,
    currentDisplayWord,
    startup, 
    setGuessed, 
    component, 
    numLetters,
    autoGuess,
    setGameOver,
    gameOverBtnRef,
    buttonStates,
    totalGuesses,
    word,
    setWord,
    bestGuess,
    bestGuesses,
    setBestGuesses,
 }) => {

    const [guessedCorrect, setGuessedCorrect] = useState(0)

    return (
        <>
        <div id={styles.Guesses}>
            <div id={styles.left}>
            <div>
            <Hangman
                totalGuesses = {totalGuesses}
                guessesLeft = {guessesLeft}
            />
            <div className={styles.guessesLeft}>Guesses left: {guessesLeft}</div>
        </div>
            <div>
                <div id={styles.guess}>
                    <div 
                        id={styles.word_display} 
                        onClick={(e)=>e.target.focus()}
                        className={component === 'auto' ? styles.auto : ''}
                    >
                        { [...displayWord].map((letter,i) => (
                            <span key={ letter + i }>{ letter }</span>
                        )) }
                    </div>
                     { component === 'auto' &&
                        <ChangeDisplay
                            displayWord = { currentDisplayWord }
                            setGuessed = { setGuessed }
                            guess = { guess }
                            guessed = { guessed }
                            autoGuess = { autoGuess }
                            guessedCorrect = { guessedCorrect }
                            setGuessedCorrect = { setGuessedCorrect }
                            bestGuess = { bestGuess }
                            bestGuesses = { bestGuesses }
                        />
                    }
                </div>
                    {(component === 'auto' && bestGuesses) &&
                        <AutoGuesses
                            displayWord = { currentDisplayWord }
                            bestGuesses = { bestGuesses }
                            autoGuess = { autoGuess }
                            guessedCorrect = { guessedCorrect }
                            guessesLeft = { guessesLeft }
                            word = { word }
                            setWord = { setWord }
                            setBestGuesses = { setBestGuesses }
                            setGameOver = { setGameOver }
                        />}
                </div>
                {component === 'main' && 
                    <Letters 
                        buttonStates = { buttonStates }
                        guess = { guess }
                        guessed = { guessed }
                    />
                }
                <button 
                    className = { `${styles.auto_btn}, ${component = 'main' ? styles[buttonStates?.[' ']] : ''}` }
                    ref={gameOverBtnRef}
                    id={styles.gameOverBtn} 
                    onClick={()=>{
                        if (component === 'main') {
                            gameStatus.current = ('pending')
                            startup()
                        } 
                        else startup(numLetters)
                    }}
                >
                {gameStatus.current !== 'pending' ? 'New Game' : 'New Word'}</button>
            </div>
        </div>
        </>
    )
}


export default GameArea


