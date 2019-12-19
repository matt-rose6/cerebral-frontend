const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'cerebral',
  password: 'test',
  port: 5432,
})

const getEntries = (request, response) => {
  pool.query('SELECT * FROM entries', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEntryById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM entries WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEntry = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO entries (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Entry added with ID: ${result.insertId}`)
  })
}

const updateEntry = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE entries SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Entry modified with ID: ${id}`)
    }
  )
}

const deleteEntry = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM entries WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Entry deleted with ID: ${id}`)
  })
}

module.exports = {
  getEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
}