class WeatherService {
  constructor(weatherProvider) {
    this._weatherProvider = weatherProvider
  }

  getForAddress(address) {
    return this._weatherProvider.fetchByAddress(address)
  }

  getForCoordinates({ latitude, longitude }) {
    return this._weatherProvider.fetchByCoordinates({ latitude, longitude })
  }
}

module.exports = WeatherService
