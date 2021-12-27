import React from 'react'
import './Hangman.css'

const Head = () => (
   <ellipse
      id="head"
      cx="-16.109325"
      cy="81.16951"
      rx="26.494043"
      ry="26.967693" 
   />
)
const Torso = () => (
   <path
      d="M -42.603371,81.169399 V 159.78709"
      id="torso" 
   />
)
const LeftArm = () => (
   <path
      d="M -42.603371,81.169399 C -67.164412,89.539782 -65.6333,127.3569 -64.98627,136.47602"
      id="left_arm"
   />
)
const RightArm = () => (
   <path
      d="m -42.603371,81.169399 c 24.561041,8.370383 23.029929,46.187501 22.382899,55.306621"
      id="right_arm"
   />
)
const LeftLeg = () => (
   <path
      d="m -42.603371,159.78709 c -15.763401,17.42223 -18.312066,55.6863 -18.728548,80.90309"
      id="left_leg"
   /> 
)
const RightLeg = () => (
   <path
      d="m -42.484851,159.78709 c 15.763402,17.42223 18.312068,55.6863 18.728551,80.90309"
      id="right_leg"
   />
)
const LeftEye = () => (
   <g
      id="left_eye"
      transform="matrix(0.60426279,0,0,0.60464072,-55.393601,21.42919)"
   >
   <path
      d="M 81.642858,96.00595 96.761907,81.642856"
      id="path875" 
   />
   <path
      d="M 98.53944,91.00345 80.479767,84.27294"
      id="path877"  
   />
</g>
)
const RightEye = () => (
   <g
      id="right_eye"
      transform="matrix(0.60426279,0,0,0.60464072,-55.393601,21.42919)"
   >
   <path
      d="M 46.86905,101.29762 61.232146,88.446426"
      id="path873" 
   />
   <path
      d="M 64.22966,98.75319 44.914875,90.890417"
      id="path879"
   />
   </g>
)
const Mouth = () => (
   <path
      d="m -25.245529,96.43086 c 7.256793,-4.659944 16.8128401,-5.015396 26.4946955,-2.16805"
      id="mouth"
   />
)
const Tongue = () => (
   <path
      d="m -18.865742,93.611389 c 5.614471,10.429021 19.18138661,12.428281 12.7902306,-0.565257"
      id="tongue"
   />
)
const Gallows = () => (
   <>
   <g
      id="gallows"
      transform="matrix(0.60426279,0,0,0.60464072,-55.393601,21.42919)"
   >
   <path
      d="m 21.166666,98.802818 -0.5134,-36.803215 H -60.59667 V 446.23918"
      id="path887"
      />
   </g>
   <path
      d="M 7.7416459,302.87891 C -34.56458,286.0723 -63.62894,276.20148 -139.81422,273.79056"
      id="ground"
      />
   </>
)

const Hangman = ({totalGuesses, guessesLeft}) => {

   const hangmanParts = [
      <Gallows key='gallows'/>,
      <Head key='head'/>,
      <Torso  key='torso'/>,
      <LeftArm  key='left_arm'/>,
      <RightArm  key='right_arm'/>,
      <LeftLeg  key='left_leg'/>,
      <RightLeg  key='right_leg'/>,
      <Mouth  key='mouth'/>,
      <LeftEye  key='left_eye'/>,
      <RightEye key='right_eye'/>,
      <Tongue  key='tongue'/>
   ]

   return (
      <svg
         viewBox="0 0 152 250"
         version="1.1"
         id="hangman"
      >
      <g
         transform="translate(140.47568,-53.540357)">
         {hangmanParts.slice(0,totalGuesses + 1 - guessesLeft)}
      </g>
   </svg>
)}

export default Hangman