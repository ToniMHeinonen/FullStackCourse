const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const notesRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', notesRouter)

app.use(middleware.errorHandler)

module.exports = app
