import React, { useEffect, useRef } from 'react'
import styles from './Splash.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const Splash = () => {

    const splash = useRef(null)

    useEffect(()=> {
        if (! document.hidden) {
            splash.current.classList.add(styles.has_focus)
        }
        else {
            window.onfocus = () => {
                splash.current.classList.add(styles.has_focus)
            }
        } 
    },[])

    return (
        <Link className={styles.splash_link} to="options">
        <header id='Splash' ref={splash}>
                <h1>
                    <span><span className={styles.h}>h</span>_</span>
                    <span><span className={styles.a}>a</span>_</span>
                    <span><span className={styles.n}>n</span>_</span>
                    <span><span className={styles.g}>g</span>_</span>
                    {/* <span><span className={styles.o}>o</span>_</span>
                    <span><span className={styles.u}>u</span>_</span>
                    <span><span className={styles.t}>t</span>_</span><br/> */}
                    <span><span className={styles.m}>m</span>_</span>
                    <span><span className={styles.a}>a</span>_</span>
                    <span><span className={styles.n}>n</span>_</span>
                </h1>
        </header>
        </Link>        
    )
}

export default Splash
