import React from 'react'
import Hangman from '../Hangman'



const CurrMan = ({guessesLeft}) => {
    return (
            <Hangman
                guessesLeft = {guessesLeft}
            />
        )
}

export default CurrMan
