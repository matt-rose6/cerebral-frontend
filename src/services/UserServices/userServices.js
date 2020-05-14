import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api/' //change this url later
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

const getUser = async (uid) => {
    let result = await axios({
        method: 'get',
        url: 'users/getUser/'.concat(uid), 
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
    .catch(err => console.log(err));
    return result
}

const updateUser = async (uid, firstname, lastname, email, pass, outreach) => {
    let result = await axios({
        method: 'put',
        url: 'users/updateUser/'.concat(uid),
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

export {getUser, createUser, updateUser}