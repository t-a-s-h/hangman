import React from 'react'
import styles from './gameover.module.css'

const GameOver = ({gameWon, word, gameOver}) => {
    return (
        gameOver && (<>
            <div id={styles.winLose}>{gameWon ? <span className={ styles.won } >You Win!</span> : <span className={ styles.lost } >You Lose!</span>}<br/><span className={styles.showWord}> The word was {word}</span></div>
        </>)
    )
}

export default GameOver
