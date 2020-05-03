import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api/'
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

const getUser = async (uid) => {
    let result = await axios({
        method: 'get',
        url: 'users/getUser/'.concat(uid), //change this url later
    })
    .catch(error => console.log(error));
    return result
}

const createUser = async (firstname, lastname, email, pass, outreach) => {
    let result = await axios({
        method: 'post',
        url: 'users/addUser',
        data: {
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "pass": pass,
            "outreach": outreach
        }
    })
    .catch(error => console.log(error));
    return result
}

const updateUser = (uid, firstname, lastname, email, pass, outreach) => {
    axios({
        method: 'put',
        url: 'users/updateUser',
        data: {
            "uid": uid,
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "pass": pass,
            "outreach": outreach
        }
    }).catch(error => console.log(error));
}

export {getUser, createUser, updateUser}