import React, { useEffect } from 'react'
import './Splash.module.css';
import addTransition from '../functions'
import Options from '../Elements/Options';

const Splash = () => {

    useEffect(()=> {
        addTransition('/game')
        addTransition('/auto')
    },[])

    return (
        <>
        <header id='Splash'>
                <h1>
                    <span><span>H</span>_</span>
                    <span><span>a</span>_</span>
                    <span><span>n</span>_</span>
                    <span><span>g</span>_</span>
                    <span><span>m</span>_</span>
                    <span><span>a</span>_</span>
                    <span><span>n</span>_</span>
                </h1>
                <Options/>
        </header>
        </>
        
    )
}

export default Splash
