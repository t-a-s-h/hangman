import React from 'react'
import styles from './Letters.module.css'

const Letters = ({buttonStates, guess, guessed}) => (
    <div id={styles.letters}>
        {[...Array(26)].map((_,i) => {
            const letter = String.fromCharCode(i + 65)

            return (
                <button 
                    key={i} 
                    id={ letter }
                    className={ styles[buttonStates[letter]] }
                    onClick={ (e) => {
                        guess(letter)
                    } }
                    disabled={ guessed.includes(letter.toLowerCase()) }
                >
                    { letter }
                </button>
            )
        }) }
        </div>
    )

export default Letters