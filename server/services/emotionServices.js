const Pool = require('pg').Pool
const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'cerebral',
  password: 'test',
  port: 3001,
})

const getEmotions = (request, response) => {
  pool.query('SELECT * FROM emotions ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEmotionById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM emotions WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createEmotion = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO emotions (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Emotion added with ID: ${result.insertId}`)
  })
}

const updateEmotion = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE emotions SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Emotion modified with ID: ${id}`)
    }
  )
}

const deleteEmotion = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM emotions WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Emotion deleted with ID: ${id}`)
  })
}

module.exports = {
  getEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  deleteEmotion,
}