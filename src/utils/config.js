require('dotenv').config()

const PORT = process.env.PORT
const WEATHERSTACK_API = process.env.WEATHERSTACK_API
const GEOAPIFY_API = process.env.GEOAPIFY_API

module.exports = {
  PORT,
  WEATHERSTACK_API,
  GEOAPIFY_API
}
