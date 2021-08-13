import axios from 'axios'

const getWord = (cb) => {
    axios.get('http://random-word-api.herokuapp.com/word?number=1&swear=0')
    .then(res => {
        return cb(res.data[0])
    })
}

const getWordsArr = (n,cb) => {
    axios.get(`http://random-word-api.herokuapp.com/word?number=${n}&swear=0`)
    .then(res => {
        return cb(res.data)
    })
}

// console.log(wordArray)

// const getWord = (cb) => {
//     cb(word)
// }

export {
    getWordsArr,
    getWord
}