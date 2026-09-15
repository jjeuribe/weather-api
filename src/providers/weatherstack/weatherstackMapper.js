function toWeather(weatherData) {
  const {
    temperature,
    wind_speed,
    humidity,
    feelslike
  } = weatherData.current

  return {
    temperature,
    windSpeed: wind_speed,
    humidity,
    feelsLike: feelslike
  }
}

module.exports = {
  toWeather
}
