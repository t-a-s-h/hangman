import React, { useState, useEffect } from 'react'
import style from './score.module.css'

const Score = ({ guessesLeft, gameStatus }) => {

    const currentGameStatus = gameStatus.current
    const currentGuessesLeft = guessesLeft.current

    const [score, setScore] = useState(0)

    const [highscore, setHighscore] = useState(0)

    useEffect(() => {
        if (currentGuessesLeft !== 0 && currentGameStatus !== 'pending') setScore(score=>score + currentGuessesLeft * 100)
        else if (currentGameStatus !== 'pending') setScore(0)
    },[currentGameStatus,currentGuessesLeft])

    useEffect(()=> {
        if (score > highscore) setHighscore(score)
    },[score, highscore])

    return (
        <><div className={style.score}>
            <span><span>Score: </span><span>{score}</span></span>
            <span><span>Highscore: </span><span>{highscore}</span></span>
        </div>
        </>
    )
}

export default Score
