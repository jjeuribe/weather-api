const express = require('express')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const WeatherService = require('./services/WeatherService')
const WeatherstackProvider = require('./providers/weatherstack/WeatherstackProvider')
const WeatherstackHttpClient = require('./providers/weatherstack/WeatherstackHttpClient')
const weatherstackConfig = require('./providers/weatherstack/weatherstackConfig')

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', async (request, response) => {
  const weatherstackHttpClient = new WeatherstackHttpClient(weatherstackConfig)
  const weatherStackProvider = new WeatherstackProvider({ httpClient: weatherstackHttpClient, units: 'm' })
  const weatherService = new WeatherService(weatherStackProvider)
  const weather = await weatherService.fetchByCoordinates(37.8267, -122.4233)

  response.status(200).json({ weather })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
