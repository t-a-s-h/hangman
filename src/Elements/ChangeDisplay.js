import React from 'react'

const ChangeDisplay = ({ setDisplayWord, displayWord, setGuessed, guessed }) => {

    return (
        <form
            onSubmit = {e => {
                e.preventDefault()
                        setDisplayWord([...displayWord].map((display,index)=> {
                            const letter = e.target['letter' + index]
                            console.log('val',letter.value, display)
                            
                            if (letter.value) {
                                setGuessed([...guessed, letter.value])
                                const ret = letter.value
                                console.log('here')
                                letter.style.visibility = 'hidden'
                                letter.value = ''
                                return ret
                            }
                            return display
                        }).join(''))
                        
            }}
        >
        { ([...displayWord].map((letter,i) => (
                    <input 
                        key = { letter + i } 
                        name = { 'letter' + i } 
                    />
       )))}
       <button type='submit'>+</button>
        </form>
    )
}

export default ChangeDisplay
