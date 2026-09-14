const express = require('express')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const weatherstackConfig = require('./providers/weatherstack/weatherstackConfig')
const WeatherstackHttpClient = require('./providers/weatherstack/WeatherstackHttpClient')
const WeatherstackProvider = require('./providers/weatherstack/WeatherstackProvider')
const WeatherService = require('./services/WeatherService')

const geoapifyConfig = require('./providers/geoapify/geoapifyConfig')
const GeoapifyHttpClient = require('./providers/geoapify/GeoapifyHttpClient')
const GeoapifyProvider = require('./providers/geoapify/GeoapifyProvider')
const GeocodeService = require('./services/GeocodeService')

const app = express()

app.use(express.json())
app.use(middleware.requestLogger)

app.get('/', async (request, response) => {
  // const weatherstackHttpClient = new WeatherstackHttpClient(weatherstackConfig)
  // const weatherStackProvider = new WeatherstackProvider({ httpClient: weatherstackHttpClient, units: 'm' })
  // const weatherService = new WeatherService(weatherStackProvider)
  // const weather = await weatherService.fetchByCoordinates(37.8267, -122.4233)

  // response.status(200).json({ weather })

  const geoapifyHttpClient = new GeoapifyHttpClient(geoapifyConfig)
  const geoapifyProvider = new GeoapifyProvider({ httpClient: geoapifyHttpClient, lang: 'en' })
  const geocodeService = new GeocodeService(geoapifyProvider)
  const coordinates = await geocodeService.geocode('Teatro Nuevo Apolo, Plaza de Tirso de Molina, 1, 28012 Madrid')

  response.status(200).json({ message: coordinates })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
