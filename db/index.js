const { Pool } = require('pg')
const pool = new Pool({
  user: 'todolist_app',
  host: '127.0.0.1',
  database: 'todolist',
  password: 'intern',
})


function getAllTasks() {
  return pool.query('SELECT * FROM tasks').then((result) => result.rows)
}


function createTask() {
  return pool.query('INSERT INTO tasks (title, listID, description, done, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *', task)
    .then((result) => result.rows[0])

}

function updateTask(task, id) {
  return pool.query('UPDATE tasks SET title = $1, description = $2, done=$3 WHERE id = $4 RETURNING *', [task.title, task.description, task.done, id])
    .then((result) => result.rows[0])
}

function deleteTask(id) {

  return pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    .then((result) => result.rows[0])
}

function getCountofTasksOnDueDate() {
  return pool.query('SELECT COUNT(*)::INT  AS today FROM tasks WHERE due_date = \'2022-08-11\' AND done=false ')
    .then((result) => result.rows[0].today)

}
function getListsTasksUndone() {
  return pool.query('SELECT lists.id, lists.list_name, COUNT(tasks.done=false OR null)::INT AS undone FROM tasks RIGHT JOIN lists ON tasks.list_id = lists.id  GROUP BY lists.id')
    .then((result) => result.rows)
}

function getCollectionToday() {
  return pool.query('SELECT *, lists.list_name  FROM tasks LEFT JOIN lists ON lists.id=list_id WHERE due_date = \'2022-08-11\'')
    .then((result) => result.rows.map(({ id, title, description, due_date, done, list_name, list_id }) => {
      return { id, title, description, due_date, done, list: { list_id,  list_name } }
    }))
}

function getLists(listid, done) {
  return pool.query('SELECT * FROM tasks WHERE list_id = $1 AND done = false', [listid]).then((result) => result.rows)

}

function getTaskListDone(listid, all) {
  return pool.query("SELECT * FROM tasks WHERE list_id=$1", [listid]).then((result) => result.rows)
}
module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getCountofTasksOnDueDate,
  getListsTasksUndone,
  getCollectionToday,
  getListUndone: getLists,
  getTaskListDone
}