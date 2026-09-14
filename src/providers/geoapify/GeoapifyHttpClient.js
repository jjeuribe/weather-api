const axios = require('axios')
const {
  GeocodeProviderException,
  GeocodeProviderConnectionException,
  GeocodeProviderAuthenticationException,
  GeocodeProviderRateLimitException,
  GeocodeProviderInternalServerException
} = require('../../errors/GeocodeProviderException')

class GeoapifyHttpClient {
  constructor({ apiKey }) {
    this.apiKey = apiKey
    this.client = axios.create({
      baseURL: 'https://api.geoapify.com/',
      timeout: 10000
    })
  }

  async get(endpoint, queryParams = {}) {
    try {
      const response = await this.client.get(endpoint, {
        params: {
          apiKey: this.apiKey,
          ...queryParams
        }
      })

      return response.data

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was sent and the server responded with an error code (4xx/5xx)
          this._handleHttpError(error)
        }

        if (error.request) {
          // The request was sent but no response was received (maybe Network drop, DNS failure, Timeout)
          this._handleNetworkError(error)
        }
      }

      throw error
    }
  }

  _handleHttpError(error) {
    const { data } = error.response
    const { statusCode, error: errorCode, message } = data

    if (statusCode === 401 && errorCode === 'Unauthorized') {
      throw new GeocodeProviderAuthenticationException(message, { cause: error })
    }

    if (statusCode === 429 && errorCode === 'Too Many Requests') {
      throw new GeocodeProviderRateLimitException(message, { cause: error })
    }

    if (statusCode === 500 && errorCode === 'Internal Server Error') {
      throw new GeocodeProviderInternalServerException(message, { cause: error })
    }

    throw new GeocodeProviderException(
      `Geocode provider failed with HTTP status ${statusCode}`,
      { cause: error }
    )
  }

  _handleNetworkError(error) {
    throw new GeocodeProviderConnectionException(
      `Unable to connect to geocode provider. Reason: ${error.code}`,
      { cause: error }
    )
  }
}

module.exports = GeoapifyHttpClient
