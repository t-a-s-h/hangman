import React, { useState, memo } from 'react'
import styles from './GameArea.module.css'
import ChangeDisplay from './ChangeDisplay'
import Letters from './Letters'
import Hangman from './Hangman'

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
    setButtonStates
 }) => {
    return (
        <div id={styles.Guesses}>
            <div>
                <Hangman
                    guessesLeft = {guessesLeft}
                />
                <div>Guesses left: {guessesLeft}</div>
            </div>
            <div id={styles.left}>
                <div id={styles.guess}>
                     { component === 'auto' &&
                        <ChangeDisplay
                            setDisplayWord = {setDisplayWord}
                            displayWord = {displayWord}
                            setGuessed = {setGuessed}
                            guessed = {guessed}
                            autoGuess = {autoGuess}
                        />
                    }
                        
                </div>
                <div id={styles.word_display}>
                    { [...displayWord].map((letter,i) => (
                        <span key={ letter + i }>{ letter }</span>
                    )) }
                </div>
                <Letters 
                    buttonStates = { buttonStates }
                    guess = { guess }
                    guessed = { guessed }
                />
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


