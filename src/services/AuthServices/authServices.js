import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3001/api/'

const authenticateUser = async (email, pass) => {
    let result = await axios({
        method: 'post',
        url: 'auth/login',
        data: {
            "email": email,
            "pass": pass
        }
    })
    .catch(error => console.log(error));
    console.log(result)
    return result
}

export {authenticateUser}