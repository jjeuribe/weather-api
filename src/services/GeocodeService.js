class GeocodeService {
  constructor(geocodeProvider) {
    this._geocodeProvider = geocodeProvider
  }

  geocode(address) {
    return this._geocodeProvider.geocode(address)
  }
}

module.exports = GeocodeService
