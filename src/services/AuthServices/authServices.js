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
    return result
}

const validateJWT = async (token) => {
    let result = await axios({
        method: 'post',
        url: 'auth/validateToken',
        data: {
            "token": token,
        }
    })
    .catch(error => console.log(error));
    return result

}

export {authenticateUser, validateJWT}