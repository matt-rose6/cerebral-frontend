const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'cerebral',
  password: 'test',
  port: 3001,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY uid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const uid = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE uid = $1', [uid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { firstname, lastname, email } = request.body

  pool.query('INSERT INTO users (firstname, lastname, email) VALUES ($1, $2, $3)', [firstname, lastname, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const uid = parseInt(request.params.id)
  const { firstname, lastname, email } = request.body

  pool.query(
    'UPDATE users SET firstname = $1, lastname = $2, email = $3 WHERE uid = $4',
    [firstname, lastname, email, uid],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${uid}`)
    }
  )
}

const deleteUser = (request, response) => {
  const uid = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE uid = $1', [uid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${uid}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}