const mapWeatherstack = require('./weatherstackMapper')

class WeatherstackProvider {
  constructor({ httpClient, units = 'm' }) {
    this.httpClient = httpClient
    this.units = units
  }

  async fetchByCoordinates(lat, lon) {
    const coordinates = encodeURIComponent(`${lat},${lon}`)
    const endpoint = '/current'
    const data = await this.httpClient.get(endpoint, {
      units: this.units,
      query: coordinates
    })

    return mapWeatherstack(data)
  }
}

module.exports = WeatherstackProvider
