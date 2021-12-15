import React, { useReducer } from 'react'
import styles from './GameArea.module.css'
import ChangeDisplay from './ChangeDisplay'
import CurrMan from './CurrMan'
import { useRef } from 'react/cjs/react.development'

const Guesses = ({ 
    guessesLeft, 
    displayWord,
    guess, 
    guessed, 
    gameOver, 
    startup, 
    setDisplayWord, 
    setGuessed, 
    component, 
    word, 
    numLetters,
    letters
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
                <CurrMan
                    guessesLeft = {guessesLeft}
                />
                <div>Guesses left: {guessesLeft}</div>
            </div>
            <div id={styles.left}>
                {gameOver ? (<div id={styles.winLose}><span className={guessesLeft ? styles.won : styles.lost}>{guessesLeft? 'You Win!': 'You Lose!'}</span><br/><span className={styles.showWord}> The word was {word}</span></div>) : null}
                <div id={styles.guess}>
                     { component === 'auto'? 
                        <ChangeDisplay
                            setDisplayWord = {setDisplayWord}
                            displayWord = {displayWord}
                            setGuessed = {setGuessed}
                            guessed = {guessed}
                        /> : null }
                </div>
                <div id={styles.word_display}>
                    { [...displayWord].map((letter,i) => (
                        <span key={ letter + i }>{ letter }</span>
                    )) }
                </div>
                <GetLetters />
                <button id={styles.gameOverBtn} onClick={()=>startup(numLetters)}>{gameOver? 'New Game' : 'New Word'}</button>
            </div>
        </div>
    )
}


export default Guesses


