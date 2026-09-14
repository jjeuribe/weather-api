const geoapifyMapper = require('./geoapifyMapper')

class GeoapifyProvider {
  constructor({ httpClient, lang = 'en' }) {
    this._httpClient = httpClient
    this._lang = lang
  }

  async geocode(address) {
    const endpoint = '/v1/geocode/search'
    const data = await this._httpClient.get(endpoint, {
      text: address,
      limit: 1,
      lan: this._lang
    })

    return geoapifyMapper.toCoordinates(data)
  }
}

module.exports = GeoapifyProvider
