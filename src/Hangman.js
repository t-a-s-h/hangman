import React, { createRef } from 'react'
import { useRef, useEffect, useState } from 'react'

const Hangman = ({ guessesLeft }) => {

   const fill = '#170055'

   const levels = useRef([])

   const style = {
      show: {opacity:1,fill:'none',stroke:'#170055',strokeWidth:1.32292,strokeLinecap:'round',strokeLinejoin:'round',strokeMiterlimit:4,strokeDasharray:'none',strokeOpacity:1},
      hide: {display:'none'}
   }


   const addLevel = (el) => {
      if (el) {
         levels.current.push(el)
      }
   }

   
   return (
   <>
   <style>
   
   {'@keyframes draw1 \{\
    from \{\
       stroke-dashoffset: 541;\
    \}\
     to \{\
       stroke-dashoffset: 0;\
     \}\
   \}\
   @keyframes draw2 \{\
      from \{\
         stroke-dashoffset: 302;\
      \}\
       to \{\
         stroke-dashoffset: 0;\
       \}\
     \}\
   path#ground \{\
      stroke-dasharray: 541 !important;\
      animation: draw1 2s linear forwards !important;\
   \}\
   path, ellipse \{\
      stroke-dasharray: 302 !important;\
      animation: 1s linear 0s 1 normal both running draw2;\
   \}\
   path, ellipse \{\
      stroke-dasharray: 302 !important;\
      animation: 1s linear 0s 1 normal both running draw2;\
   \}\
   #gallows path \{\
      stroke-dasharray: 541 !important;\
      animation: 2.5s linear 1s 1 normal both running draw1;\
   \}'}
   </style>
      <svg
         height="120" 
         height="480"
         viewBox="0 0 151.52187 250.00001"
         version="1.1"
      >
      <g
         id="hangman"
         transform="translate(140.47568,-53.540357)">
         <path
            style={guessesLeft < 7? style.show : style.hide}
            d="m -42.603371,81.169399 c 24.561041,8.370383 23.029929,46.187501 22.382899,55.306621"
            id="right_arm"
            data-level={7}
            ref={addLevel}
         />
         <ellipse
            style={guessesLeft < 10? style.show : style.hide}
            id="head"
            cx="-16.109325"
            cy="81.16951"
            rx="26.494043"
            ry="26.967693" 
            data-level={10}
            ref={addLevel}
         />
         <path
            style={guessesLeft < 9? style.show : style.hide}
            d="M -42.603371,81.169399 V 159.78709"
            id="torso" 
            data-level={9}
            ref={addLevel}
         />
         <path
            style={guessesLeft < 8? style.show : style.hide}
            d="M -42.603371,81.169399 C -67.164412,89.539782 -65.6333,127.3569 -64.98627,136.47602"
            id="left_arm"
            data-level={8}
            ref={addLevel}
            />
         <path
           style={guessesLeft < 6? style.show : style.hide}
            d="m -42.603371,159.78709 c -15.763401,17.42223 -18.312066,55.6863 -18.728548,80.90309"
            id="left_leg"
            data-level={6}
            ref={addLevel}
            /> 
         <path
            style={guessesLeft < 5? style.show : style.hide}
            d="m -42.484851,159.78709 c 15.763402,17.42223 18.312068,55.6863 18.728551,80.90309"
            id="right_leg"
            data-level={5}
            ref={addLevel}
            />
         <path
            style={guessesLeft < 4? style.show : style.hide}
            d="m -25.245529,96.43086 c 7.256793,-4.659944 16.8128401,-5.015396 26.4946955,-2.16805"
            id="path869"
            data-level={4}
            ref={addLevel}
            />
         <g
            id="left_eye"
            style={guessesLeft < 3? style.show : style.hide}
            transform="matrix(0.60426279,0,0,0.60464072,-55.393601,21.42919)"
            ref={addLevel}
         >
            <path
               d="M 81.642858,96.00595 96.761907,81.642856"
               id="path875" 
               data-level={3}
            />
            <path
               d="M 98.53944,91.00345 80.479767,84.27294"
               id="path877"  
               data-level={3}
            />
         </g>
         <g
            id="right_eye"
            style={guessesLeft < 2? style.show : style.hide}
            transform="matrix(0.60426279,0,0,0.60464072,-55.393601,21.42919)"
            ref={addLevel}
         >
            <path
               d="M 46.86905,101.29762 61.232146,88.446426"
               id="path873" 
               data-level={2}
            />
            <path
               d="M 64.22966,98.75319 44.914875,90.890417"
               id="path879"
               data-level={2}
         />
         </g>
         <path
            style={guessesLeft < 1? style.show : style.hide}
            d="m -18.865742,93.611389 c 5.614471,10.429021 19.18138661,12.428281 12.7902306,-0.565257"
            id="tongue"
            data-level={1}
            ref={addLevel}
         />
         <g
            id="gallows"
            style={style.show}
            transform="matrix(0.60426279,0,0,0.60464072,-55.393601,21.42919)">
            <path
               d="m 21.166666,98.802818 -0.5134,-36.803215 H -60.59667 V 446.23918"
               id="path887"
               />
         </g>
         <path
            style={style.show}
            d="M 7.7416459,302.87891 C -34.56458,286.0723 -63.62894,276.20148 -139.81422,273.79056"
            id="ground"
            />
      </g>
      </svg>
   </>
   )
}

export default Hangman