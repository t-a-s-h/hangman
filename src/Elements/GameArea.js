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
    setGameOver,
    gameOver, 
    setGameWon,
    startup, 
    setDisplayWord, 
    setGuessed, 
    component, 
    numLetters,
    autoGuess,
    gameOverBtnRef,
    buttonStates,
    totalGuesses,
    word,
    wordsArr
 }) => {

    const [guessedCorrect, setGuessedCorrect] = useState(0)

    return (
        <div id={styles.Guesses}>
            <div>
                <Hangman
                    totalGuesses = {totalGuesses}
                    guessesLeft = {guessesLeft}
                />
                <div className={styles.guessesLeft}>Guesses left: {guessesLeft}</div>
            </div>
            <div id={styles.left}>
            <div>
                <div id={styles.guess}>
                    <div 
                        id={styles.word_display} 
                        className={component === 'auto' ? styles.auto : ''}
                    >
                        { [...displayWord].map((letter,i) => (
                            <span key={ letter + i }>{ letter }</span>
                        )) }
                    </div>
                     { component === 'auto' &&
                        <ChangeDisplay
                            setDisplayWord = {setDisplayWord}
                            displayWord = {displayWord}
                            setGuessed = {setGuessed}
                            guess = {guess}
                            guessed = {guessed}
                            autoGuess = {autoGuess}
                            gameOver = { gameOver }
                            guessedCorrect = { guessedCorrect }
                            setGuessedCorrect = { setGuessedCorrect }
                        />
                    }
                </div>
                    {component === 'auto' && (!gameOver || wordsArr.current.length) &&
                        <AutoGuesses
                            setDisplayWord = { setDisplayWord }
                            bestGuesses = { wordsArr.current }
                            gameOver = { gameOver }
                            setGameOver = { setGameOver }
                            autoGuess = { autoGuess }
                            guessedCorrect = { guessedCorrect }
                            wordFound = {!!word}
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
                    className = { styles[buttonStates[' ']] }
                    ref={gameOverBtnRef}
                    id={styles.gameOverBtn} 
                    onClick={()=>{
                        if (component === 'main') {
                            setGameOver(true)
                            setGameWon(false)
                            startup()
                        } 
                        else startup(numLetters)
                    }}
                >
                {gameOver? 'New Game' : 'New Word'}</button>
            </div>
        </div>
    )
}


export default GameArea


