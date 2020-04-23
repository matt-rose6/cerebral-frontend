import axios from 'axios'

const getUser = async (id) => {
    let result = await axios({
        method: 'get',
        url: 'http://localhost:3001/api/users/getUser/'.concat(id), //change this url later
    })
    .catch(error => console.log(error));
    return result.data[0]
}

const createUser = async (firstname, lastname, email, pass, outreach) => {
    let result = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/users/addUser',
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
        url: 'http://localhost:3001/api/users/updateUser',
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