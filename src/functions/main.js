import words from './words.json'

const getWord = () => {
    const random_index = Math.floor(Math.random() * words.length)
    return words[random_index]
}

const getAllWords = () => {
    return words
}

export {
    getWord,
    getAllWords
}