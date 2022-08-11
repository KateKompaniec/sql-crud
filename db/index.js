const { Pool } = require('pg')
const pool = new Pool({
  user: 'todolist_app',
  host: '127.0.0.1',
  database: 'todolist',
  password: 'intern',
})

const getTasks = async (req, res) => {
  const id = parseInt(req.query.listID)
  if(!id){
    const { rows } = await pool.query('SELECT * FROM items')
    res.send(rows)
  }
  else{
    const { rows } = await pool.query('SELECT * FROM items WHERE listID = $1', [id])
    res.send(rows)
  }
}

const createTask = async (req, res) => {
  const task = { 
    title: req.query.title,
    listID: req.query.listID,
    id: req.query.id
  }
  await pool.query('INSERT INTO items (title, listID, id) VALUES ($1, $2, $3)', [task.title, task.listID, task.id])
    res.send(`Task added`)
}

const updateTask = async (req, res) => {
  const task = { 
    title: req.query.title,
    listID: req.query.listID,
    id: req.query.id
  }
  await pool.query('UPDATE items SET title = $1, listid = $2 WHERE id = $3', [task.title, task.listID, task.id])
  res.send(`Task modified`)
}

const deleteTask = async (req, res) => {
  const id = parseInt(req.query.id)
  await pool.query('DELETE FROM items WHERE id = $1', [id])
    res.send(`Task deleted`)
}

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
}