import React, { useReducer } from 'react'
import styles from './GameArea.module.css'
// import hangman from '../hangman.svg'

const Guesses = ({ guessesLeft, displayWord, guess, guessed, currMan }) => {

    console.log(currMan)

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
            { currMan }
            <div>
            <div id={styles.word_display}>
                { [...displayWord].map(letter => (
                    <span>{ letter }</span>
                )) }
            </div>
            <GetLetters />
            </div>
        </div>
    )
}

export default Guesses


