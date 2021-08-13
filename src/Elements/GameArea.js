import React, { useReducer } from 'react'
import styles from './GameArea.module.css'
// import hangman from '../hangman.svg'

const Guesses = ({ guessesLeft, displayWord, guess, guessed, currMan, gameOver, startup, word }) => {

    const GetLetters = () => {

        return (
            <div id={styles.letters}>
            { [...Array(26)].map((item,i) => {

                const letter = String.fromCharCode(i + 65)

                return (
                    <button 
                        key={i} 
                        id={ letter }
                        onClick={ () => {
                        //     e.preventDefault()
                        //     console.log(document.activeElement, e.target, document.activeElement === e.target)
                        //     // return [
                                // e.target.matches(':focus')? e.target.classList.add(styles.active) : null,
                                guess(letter) 
                                // e.target.focus()
                            // ]
                        }}
                        disabled={ guessed.includes(letter.toLowerCase()) }
                        // className={ (e)=> console.log(e)}

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
                { currMan }
                Guesses left: {guessesLeft}
            </div>
            <div>
                {gameOver ? (<div id={styles.winLose}><span className={guessesLeft? styles.win : styles.lose}>{guessesLeft? 'You Win!' : 'You Lose!'}</span></div>) : null}
                <div id={styles.word_display}>
                    { [...displayWord].map(letter => (
                        <span>{ letter }</span>
                    )) }
                </div>
                <GetLetters />
                <button id={styles.gameOverBtn} onClick={startup}>{gameOver? 'New Game' : 'New Word'}</button>
                {/* <div className={styles.showWord}>The word was {word}</div> */}
            </div>
        </div>
    )
}

export default Guesses


