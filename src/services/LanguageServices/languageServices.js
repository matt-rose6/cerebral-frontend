import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api/'
//axios.defaults.baseURL = 'https://api-dot-cerebral-277223.uc.r.appspot.com/api/'

const analyzeSentiment = async (entry) => {
    let result = await axios({
        method: 'post',
        url: 'language/getSentiment',
        data: {
            "text": entry
        }
    })
    .catch(error => console.log(error));
    console.log(result)
    return result
}

export {analyzeSentiment}