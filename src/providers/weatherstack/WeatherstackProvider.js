const weatherstackMapper = require('./weatherstackMapper')

class WeatherstackProvider {
  constructor({ httpClient, units = 'm' }) {
    this.httpClient = httpClient
    this.units = units
  }

  async fetchByCoordinates({ latitude, longitude }) {
    const coordinates = `${latitude},${longitude}`
    const endpoint = '/current'
    const data = await this.httpClient.get(endpoint, {
      units: this.units,
      query: coordinates
    })

    return weatherstackMapper.toWeather(data)
  }

  async fetchByAddress(address) {
    const endpoint = '/current'
    const data = await this.httpClient.get(endpoint, {
      units: this.units,
      query: address
    })

    return weatherstackMapper.toWeather(data)
  }
}

module.exports = WeatherstackProvider
