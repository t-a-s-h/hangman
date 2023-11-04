import React from 'react'
import styles from './gameover.module.css'

const GameOver = ({gameStatus, word, startup }) => {
    return (gameStatus.current !== 'pending') && (
            <div 
            onClick={()=>startup()}
            id={styles.winLose}> 
                { gameStatus.current === 'won' && <span className={ styles.won } >You Win!</span> }
                { gameStatus.current === 'lost' && <span className={ styles.lost } >You Lose!</span> }
                <br/><span className={styles.showWord}> The word was { word.current }</span>
            </div>
    )
}

export default GameOver
