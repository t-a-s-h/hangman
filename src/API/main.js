import axios from 'axios'

const getWord = (cb) => {
    axios.get('https://random-word-api.herokuapp.com/word?number=1&swear=0')
    .then(res => {
        return cb(res.data[0])
    })
    .catch(e=>{
        console.error(e)
        return cb('hello')
    })
}

const getWordsArr = (n,cb) => {
    axios.get(`https://random-word-api.herokuapp.com/word?number=${n}&swear=0`)
    .then(res => {
        return cb(res.data)
    })
    .catch(e=>{
        console.log(e)
        return cb(['hello'])
    })
}


const getAllWords = (cb) => {
    axios.get(`https://random-word-api.herokuapp.com/all?swear=0`)
    .then(res => {
        return cb(res.data)
    })
    .catch(e=>{
        console.log(e)
        return cb(['taco','hello'])
    })
}

export {
    getWordsArr,
    getWord,
    getAllWords
}