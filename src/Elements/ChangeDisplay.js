import React from 'react'
import styles from './GameArea.module.css'

const ChangeDisplay = ({ 
    setDisplayWord,
    displayWord, 
    setGuessed, 
    guessed, 
    autoGuess,
    guess, 
    guessedCorrect,
    setGuessedCorrect
    }) => {

    return (
        <form
            id = {'change_display'}
            onSubmit = {e => {
                e.preventDefault()
                setGuessedCorrect(false)
                setDisplayWord([...displayWord].map((display,index)=> {
                    const letter = e.target['letter' + index]
                    if (letter.value) {
                        setGuessed([...guessed, letter.value])
                        const ret = letter.value
                        letter.style.visibility = 'hidden'
                        letter.value = ''
                        return ret
                    }
                    else if (!guessedCorrect) guess(autoGuess)
                    return display
                }).join(''))    
            }}
        >
        { ([...displayWord].map((letter,i) => (
            <input 
                className = {displayWord[i] !== '_' ? styles.selected : ''}
                readOnly = { true }
                key = { letter + i } 
                name = { 'letter' + i } 
                onClick = { 
                    (e) => {
                        if (displayWord[i] === '_' && e.target.value === autoGuess) {
                            e.target.value = '' 
                            setGuessedCorrect(guessedCorrect - 1)
                        }
                        else if (displayWord[i] === '_') {
                            e.target.value = autoGuess
                            setGuessedCorrect(guessedCorrect + 1)
                        }
                    } 
                }
            />
       )))}
        </form>
    )
}

export default ChangeDisplay
