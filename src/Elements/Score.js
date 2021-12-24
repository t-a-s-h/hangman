import React, { useState, useEffect } from 'react'
import style from './score.module.css'

const Score = ({ guessesLeft, gameOver }) => {

    const [score,setScore] = useState(0)

    const [highscore,setHighscore] = useState(0)

    useEffect(() => {
        if (guessesLeft && gameOver) setScore(score=>score + guessesLeft * 100)
        else if (gameOver) setScore(0)
    }, [gameOver, guessesLeft])

    useEffect(()=> {
        if (score > highscore) setHighscore(score)
    },[score, highscore])

    return (
        <div className={style.score}>
            <span><span>Score: </span><span>{score}</span></span>
            <span><span>Highscore: </span><span>{highscore}</span></span>
        </div>
    )
}

export default Score
