import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api/'
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

const getEmotion = async (id) => {
    let result = await axios({
        method: 'get',
        url: 'entries/getEmotion/'.concat(id),
    })
    .catch(error => console.log(error));
    return result
}

const createEmotion = async (uid, date, emotion) => {
    let result = await axios({
        method: 'post',
        url: 'emotions/addEmotion',
        data: {
            "uid": uid,
            "dates": date,
            "survey":  emotion
        }
    })
    .catch(error => console.log(error));
    return result
}

const updateEmotion = (uid, date, emotion) => {
    axios({
        method: 'put',
        url: 'entries/updateEntry',
        data: {
            "id": uid,
            "dates": date,
            "entry": emotion,
        }
    }).catch(error => console.log(error));
}

export {getEmotion, createEmotion, updateEmotion}