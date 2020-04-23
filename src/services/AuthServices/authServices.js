import axios from 'axios'

const authenticateUser = async (email, pass) => {
    let result = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/auth/login',
        data: {
            "email": email,
            "pass": pass
        }
    })
    .catch(error => console.log(error));
    return result.data
}

export {authenticateUser}