const axios = require('axios')
const {
  WeatherProviderException,
  WeatherProviderConnectionException,
  WeatherProviderAuthenticationException,
  WeatherProviderRateLimitException,
  WeatherProviderRequestFailedException,
  WeatherProvider404NotFoundException,
  WeatherProviderMissingQueryException
} = require('../../errors/WeatherProviderException')

class WeatherstackHttpClient {
  constructor({ apiKey }) {
    this.apiKey = apiKey
    this.client = axios.create({
      baseURL: 'https://api.weatherstack.com',
      timeout: 10000
    })
  }

  async get(endpoint, queryParams = {}) {
    try {
      const response = await this.client.get(endpoint, {
        params: {
          access_key: this.apiKey,
          ...queryParams
        }
      })

      if (response.data?.error) {
        this._handleApiError(response.data.error)
      }

      return response.data

    } catch (error) {
      // Let it progagate if it's already one of our custom domain exceptions
      if (error instanceof WeatherProviderException) {
        throw error;
      }

      // Delegate Axios infrastrcuture errors to dedicated private methods
      if (axios.isAxiosError(error)) {
        // The request was sent but no response was received (maybe Network drop, DNS failure, Timeout)
        if (error.request) {
          this._handleNetworkError(error)
        }

        // The request was sent and the server responded with an error code (4xx/5xx)
        if (error.response) {
          this._handleHttpError(error)
        }
      }

      throw error
    }
  }

  _handleApiError(error) {
    const message = error.info
    const code = error.code
    const type = error.type

    if (code === 101 && type === 'unauthorized') {
      throw new WeatherProviderAuthenticationException(message)
    }

    if (code === 104 && type === 'usage_limit_reached') {
      throw new WeatherProviderRateLimitException(message)
    }

    if (code === 615 && type === 'request_failed') {
      throw new WeatherProviderRequestFailedException(message)
    }

    if (code === 404 && type === '404_not_found') {
      throw new WeatherProvider404NotFoundException(message)
    }

    if (code === 601 && type === 'missing_query') {
      throw new WeatherProviderMissingQueryException(message)
    }

    throw new WeatherProviderException(message)
  }

  _handleHttpError(error) {
    if (error.response.data?.error) {
      this._handleApiError(error.response.data?.error)
    }

    throw new WeatherProviderException(
      `Weather provider failed with HTTP status ${error.response.status}`,
      { cause: error }
    )
  }

  _handleNetworkError(error) {
    throw new WeatherProviderConnectionException(
      `Unable to connect to weather provider. Reason: ${error.code || 'No response'}`,
      { cause: error }
    )
  }
}

module.exports = WeatherstackHttpClient
