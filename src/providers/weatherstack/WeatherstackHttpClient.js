const axios = require('axios')
const {
  WeatherProviderException,
  WeatherProviderConnectionException,
  WeatherProviderAuthenticationException,
  WeatherProviderRateLimitException,
  WeatherProviderRequestFailedException,
  WeatherProvider404NotFoundException
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
        throw this._handleApiError(response.data.error)
      }

      return response.data

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // The request was sent and the server responded with an error code (4xx/5xx)
        if (error.response) {
          throw this._handleHttpError(error)
        }

        // The request was sent but no response was received (maybe Network drop, DNS failure, Timeout)
        if (error.request) {
          throw this._handleNetworkError(error)
        }

        // Something went wrong setting up the request itself (mabye bad config, etc)
        throw new WeatherProviderException(
          `Failed to make request to weather provider ${error.message}`,
          { cause: error }
        )
      }

      throw error
    }
  }

  _handleApiError(error) {
    const { code, info } = error
    const EXCEPTIONS = {
      101: WeatherProviderAuthenticationException,
      104: WeatherProviderRateLimitException,
      615: WeatherProviderRequestFailedException,
      404: WeatherProvider404NotFoundException,
    }

    const Exception = EXCEPTIONS[code] ?? WeatherProviderException

    return new Exception(info, { cause: error })
  }

  _handleHttpError(error) {
    if (error.response.data?.error) {
      return this._handleApiError(error.response.data.error)
    }

    return new WeatherProviderException(
      `Weather provider failed with HTTP status ${error.response.status}`,
      { cause: error }
    )
  }

  _handleNetworkError(error) {
    return new WeatherProviderConnectionException(
      `Unable to connect to weather provider. Reason: ${error.code}`,
      { cause: error }
    )
  }
}

module.exports = WeatherstackHttpClient
