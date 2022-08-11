const Router = require('express-promise-router')
const db = require('../db')
const router = new Router()


router.get('/tasks', db.getTasks)
router.post('/tasks', db.createTask)
router.put('/tasks', db.updateTask)
router.delete('/tasks', db.deleteTask)

module.exports = router