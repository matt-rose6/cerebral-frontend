import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api/'
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

const getEntries = async (id) => {
    let result = await axios({
        method: 'get',
        url: 'entries/getEntry/'.concat(id),
    })
    .catch(error => console.log(error));
    return result
}

const createEntry = async (uid, date, entry) => {
    let result = await axios({
        method: 'post',
        url: 'entries/addEntry',
        data: {
            "uid": uid,
            "dates": date,
            "entry": entry,
        }
    })
    .catch(error => console.log(error));
    return result
}

const updateEntry = (uid, date, entry) => {
    axios({
        method: 'put',
        url: 'entries/updateEntry',
        data: {
            "id": uid,
            "date": date,
            "entry": entry,
        }
    }).catch(error => console.log(error));
}

export {getEntries, createEntry, updateEntry}