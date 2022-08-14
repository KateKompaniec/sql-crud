const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()

router.get('/dashboard',getDashboard)
router.get('/collection/today', getCollectionToday)
router.get('/lists/:listid/tasks', getTaskList)

function getAllTasks(res,req){
    db.getAllTasks().then((result)=> res.send(result))
}

function createTask(req, res){
    const {title, listid, description, done, due_date} = req.body
      db.createTask({title, listid, description, done, due_date}).then((result)=> res.send(result))
}

function updateTask(req,res){
    const {title, description, done} =req.body
    const id = parseInt(req.params.id)
    db.updateTask({title, description, done},id).then((result)=> res.send(result))
}

function deleteTask(req,res){
    const id = parseInt(req.params.id)
    db.deleteTask(id).then((result)=> res.send(result))
}

function getDashboard(req,res){
    Promise.all([db.getCountofTasksOnDueDate(),db.getListsTasksUndone()]).then(([today,lists])=> res.send({today,lists}))
}

function getCollectionToday(req,res){
    db.getCollectionToday().then((result =>res.json(result)))
}

function getTaskList(req,res){
    const listid = parseInt(req.params.listid);
    const all =req.query.all;
if (!all) {
  db.getListUndone(listid).then((result)=> res.send(result))
} else {
 db.getTaskListDone(listid ).then((result)=> res.send(result))
}
}
module.exports = router