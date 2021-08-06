import axios from 'axios'

const getWord = (cb) => {
    axios.get('http://random-word-api.herokuapp.com/word?number=1&swear=0')
    .then(res => {
        console.log(res)
        return cb(res.data[0])
    })
}

export default getWord