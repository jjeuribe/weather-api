require('dotenv').config()

const PORT = process.env.PORT
const WEATHERSTACK_API = process.env.WEATHERSTACK_API

module.exports = {
  PORT,
  WEATHERSTACK_API
}
