class WeatherService {
  constructor(weatherProvider) {
    this._weatherProvider = weatherProvider
  }

  fetchByCoordinates(lat, lon) {
    return this._weatherProvider.fetchByCoordinates(lat, lon)
  }
}

module.exports = WeatherService
