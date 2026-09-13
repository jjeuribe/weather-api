class WeatherProviderException extends Error {
  constructor(message, options = {}) {
    super(message, options)
    this.name = this.constructor.name
  }
}

class WeatherProviderConnectionException
  extends WeatherProviderException { }

class WeatherProviderAuthenticationException
  extends WeatherProviderException { }

class WeatherProviderRateLimitException
  extends WeatherProviderException { }

class WeatherProviderRequestFailedException
  extends WeatherProviderException { }

class WeatherProvider404NotFoundException
  extends WeatherProviderException { }

class WeatherProviderMissingQueryException
  extends WeatherProviderException { }

module.exports = {
  WeatherProviderException,
  WeatherProviderConnectionException,
  WeatherProviderAuthenticationException,
  WeatherProviderRateLimitException,
  WeatherProviderRequestFailedException,
  WeatherProvider404NotFoundException,
  WeatherProviderMissingQueryException
}
