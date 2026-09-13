const Weather = require('../../models/Weather');

function mapWeatherstack(data) {
  return new Weather({
    temperature: data.current.temperature,
    windSpeed: data.current.wind_speed,
    humidity: data.current.humidity,
    feelsLike: data.current.feelslike
  })
}

module.exports = mapWeatherstack
