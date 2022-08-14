const express = require('express')
const router = require('./routes')
const app = express()
const mountRoutes = require('./routes')

app.use(express.json())
app.use(router);

 
module.exports = app