const express = require('express')
const db = require('../db')
const router = express.Router()


router.get('/dashboard',getDashboard)
router.get('/collection/today', getCollectionToday)
router.get('/lists/:listid/tasks', getTaskList)  
//router.get('/lists/:id/tasks',getTasksByList)
router.get('/tasks',getAllTasks)
router.post('/tasks',createTask)
router.put('/tasks/:id',updateTask)


function getTasksByList(req,res){
    const id = req.params.id;
    db.getTasks_List(id).then((result)=> res.json(result))  
}

function getAllTasks (req,res){
    db.getTasks().then((result)=> res.json(result)) 
    }


function createTask(req, res){
    const {title, listId, description, done, due_date} = req.body
      db.createTask({title, listId, description, done, due_date}).then((result)=> res.send(result))
}

function updateTask(req,res){
    const {title, description, done} =req.body
    const id = parseInt(req.params.id)
    db.updateTask({title, description, done},id).then((result)=> res.send(result))
}

/*
function deleteTask(req,res){
    const id = parseInt(req.params.id)
    db.deleteTask(id).then((result)=> res.send(result))
}
*/ 
function getDashboard(req,res){
    Promise.all([db.getCountofTasksOnDueDate(),db.getListsTasksUndone()]).then(([today,lists])=> res.send({today,lists}))
}

function getCollectionToday(req,res){
    db.getCollectionToday().then((result =>res.json(result)))
}

function getTaskList(req,res){
    const listid = req.params.listid;
    const all =req.query.all;
if (!all) {
    db.getLists(listid).then(result =>res.json(result))
} else {
    db.getTasks_List(listid).then(result =>res.json(result));
}
}  
module.exports = router