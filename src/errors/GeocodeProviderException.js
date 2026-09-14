class ProviderException extends Error {
  constructor(message, options) {
    super(message, options)
    this.name = this.constructor.name
  }
}

class ProviderConnectionException
  extends ProviderException { }

class ProviderAuthenticationException
  extends ProviderException { }

class ProviderRateLimitException
  extends ProviderException { }

class ProviderServerException
  extends ProviderException { }

module.exports = {
  ProviderException,
  ProviderConnectionException,
  ProviderAuthenticationException,
  ProviderRateLimitException,
  ProviderServerException
}





class GeocodeProviderException extends Error {
  constructor(message, options = {}) {
    super(message, options)
    this.name = this.constructor.name
  }
}

class GeocodeProviderConnectionException
  extends GeocodeProviderException { }

class GeocodeProviderAuthenticationException
  extends GeocodeProviderException { }

class GeocodeProviderRateLimitException
  extends GeocodeProviderException { }

class GeocodeProviderInternalServerException
  extends GeocodeProviderException { }

module.exports = {
  GeocodeProviderException,
  GeocodeProviderConnectionException,
  GeocodeProviderAuthenticationException,
  GeocodeProviderRateLimitException,
  GeocodeProviderInternalServerException
}
