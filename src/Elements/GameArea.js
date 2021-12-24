import React from 'react'
import styles from './GameArea.module.css'
import ChangeDisplay from './ChangeDisplay'
import Hangman from './Hangman'

const Guesses = ({ 
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
    letters,
    autoGuess,
    gameOverBtnRef
 }) => {

    const GetLetters = () => {

        return (
            <div id={styles.letters}>
            { [...Array(26)].map((item,i) => {
                const letter = String.fromCharCode(i + 65)

                return (
                    <button 
                        ref={ el => letters?.push(el)}
                        key={i} 
                        id={ letter }
                        onClick={ () => {
                                guess(letter) 
                        }}
                        disabled={ guessed.includes(letter.toLowerCase()) }
                    >
                        { letter }
                    </button>
                )
            }) }
            </div>
        )
    }


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
                <GetLetters />
                <button 
                    ref={gameOverBtnRef}
                    id={styles.gameOverBtn} 
                    onClick={()=>{
                        // if (guessesLeft) setGameAborted(true)
                        if (component === 'main') {
                            setGameOver(true)
                            setGameWon(false)
                            startup(numLetters)
                        }
                    }}
                >
                {gameOver? 'New Game' : 'New Word'}</button>
            </div>
        </div>
    )
}


export default Guesses


