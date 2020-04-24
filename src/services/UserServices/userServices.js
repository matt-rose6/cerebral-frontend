import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api/'
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const getUser = async (id) => {
    let result = await axios({
        method: 'get',
        url: 'users/getUser/'.concat(id), //change this url later
    })
    .catch(error => console.log(error));
    return result.data[0]
}

const createUser = async (firstname, lastname, email, pass, outreach) => {
    let result = await axios({
        // headers: {
        //     Authorization: 'Bearer ' + token, 
        // },
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
    console.log(result)
    //return id.data[0]
}

const updateUser = (id, firstname, lastname, email, pass, outreach) => {
    axios({
        method: 'put',
        url: 'users/updateUser',
        data: {
            "id": id,
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "pass": pass,
            "outreach": outreach
        }
    }).catch(error => console.log(error));
}

export {getUser, createUser, updateUser}