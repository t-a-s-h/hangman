import React, { useRef, useEffect, useState } from 'react'
// import { ReactComponent as Hangman } from '../hangman2.svg'
import Hangman from '../Hangman'
// import { ReactComponent as MySvgFile } from './my_svg_file.svg'

// console.log(Hangman)

// const Curr = () => {
//     return (
//         // <>{10}</>

//     )
// }


const CurrMan = ({guessesLeft}) => {

    // console.log(SVGHangman?.current?.getSVGDocument())

    // const [paths,setPaths] = useState([...SVGHangman?.current?.getSVGDocument()?.querySelectorAll('path, circle') || ''])
    // 
    // const paths = useRef([])


    // console.log('here',paths.current)

    // paths.map(path => {
    //     path.style.stroke = 'navy'
    //     path.removeAttribute('class','path')
    // })

    // useEffect(()=> {
    //     // paths.current = hangman.getSVGDocument()
    //     // console.log(hangman_parts.current.querySelectorAll('path, circle'));
    //     hm.current = [...hangman_parts.current.querySelectorAll('path, circle')].map((path,i) => {
    //                 return (i >= guessesLeft)? (path.style.stroke = 'red', path.setAttribute('class', 'path')) : (path.style.stroke = 'transparent', path.removeAttribute('class', 'path'))
    //      })
    // },[guessesLeft])

    // useEffect(()=>{
    //     console.log('here',paths.current)

    //     // setPaths(
    //     paths.current = paths.current.map((path,i) => {
    //         return (i >= guessesLeft)? (path.style.stroke = 'red', path.setAttribute('class', 'path')) : (path.style.stroke = 'transparent', path.removeAttribute('class', 'path'))
    //     })
    // },[guessesLeft])


    return (
            <Hangman
                guessesLeft = {guessesLeft}
            />
        )
}

export default CurrMan
