
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'todolist_app',
    password: 'intern',
    database: 'todolist'
  }
});

function getTasks() {
  return knex("tasks").select('*');
}


function getTasks_List(listId) {
  return knex("tasks").select('*').where('list_id', listId);
}
function getList(){
  return knex('lists')
  .join('tasks', 'lists.id', '=', 'tasks.list_id')
  .select("*")
}

function createTask(task) {
  if(task.due_date==""){
    task.due_date=null
  }
   return knex("tasks").insert(
    { 'title': task.title,
    'list_id': task.listId, 
    'description': task.description,
    'done': task.done ,
    'due_date': task.due_date
  }).returning("*");
  
}

function deleteTask(id){
 return knex('tasks')
 .where('id', id)
 .del().returning('*');

}

function updateTask(done, id) {
  return knex("tasks").where("id", id).update("done",!done).returning('*');
}

/* function getCountofTasksOnDueDate() {
  return knex("tasks").where('due_date', 'now()')
  .andWhere('done', false).count({today:'*'}).then(result=>parseInt(result[0].today));

}
function getListsTasksUndone() {
  return knex("tasks").select('lists.id', 'lists.list_name', knex.raw( 'COUNT(tasks.done=false OR null)::INT AS undone'))
  .rightJoin('lists', function() {
    this
      .on('tasks.list_id', '=', 'lists.id')}).groupBy('lists.id');
  //pool.query('SELECT lists.id, lists.list_name, COUNT(tasks.done=false OR null)::INT AS undone FROM tasks RIGHT JOIN lists ON tasks.list_id = lists.id  GROUP BY lists.id')

}
*/

function getCollectionToday() {
  return knex("tasks").select('*','lists.list_name').leftJoin('lists', function() {
    this
      .on('lists.id', '=', 'list_id')}).then((result) => result.map(({ id, title, description, due_date, done, list_name, list_id }) => {
        return { id, title, description, due_date, done, list: { list_id, list_name } }
      }))
  //pool.query('SELECT *, lists.list_name  FROM tasks LEFT JOIN lists ON lists.id=list_id WHERE due_date = \'2022-08-11\'')
    
}
/*
function getLists(listid) {
  return knex("tasks").where("list_id", listid).andWhere("done", false);
  //pool.query('SELECT * FROM tasks WHERE list_id = $1 AND done = false', [listid]).then((result) => result.rows)
} */


module.exports = {
  getTasks,
  getTasks_List,
  createTask,
  updateTask,
  /* getCountofTasksOnDueDate,
  getLists,
  getListsTasksUndone, */
  deleteTask,
  getList,
  getCollectionToday,
}