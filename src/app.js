const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const app = express()

app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Hello world!' })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
