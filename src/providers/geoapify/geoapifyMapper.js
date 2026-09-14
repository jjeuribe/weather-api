function toCoordinates(geocodeData) {
  const { features } = geocodeData
  const { lon, lat } = features[0].properties

  return {
    latitude: lat,
    longitude: lon
  }
}

module.exports = {
  toCoordinates
}
