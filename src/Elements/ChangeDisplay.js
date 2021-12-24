import React from 'react'
import styles from './GameArea.module.css'

const ChangeDisplay = ({ setDisplayWord, displayWord, setGuessed, guessed, autoGuess }) => {

    return (
        <>
        <span className={styles.isInWord}>{autoGuess !== 'none' && <>Is the letter { autoGuess} in the word?</>}</span>
        <form
            onSubmit = {e => {
                e.preventDefault()
                setDisplayWord([...displayWord].map((display,index)=> {
                    const letter = e.target['letter' + index]
                    if (letter.value) {
                        setGuessed([...guessed, letter.value])
                        const ret = letter.value
                        letter.style.visibility = 'hidden'
                        letter.value = ''
                        return ret
                    }
                    return display
                }).join(''))    
            }}
        >
        { ([...displayWord].map((letter,i) => (
                    <input 
                        className = {displayWord[i] !== '_' && styles.selected}
                        readOnly = { true }
                        key = { letter + i } 
                        name = { 'letter' + i } 
                        onClick = { 
                            (e) => {
                                if (displayWord[i] === '_') {
                                    (e.target.value === autoGuess)? e.target.value = '' :  e.target.value = autoGuess
                                }
                            } 
                        }
                    />
       )))}
       <button type='submit'>+</button>
        </form>
    </>
    )
}

export default ChangeDisplay
