import * as httpStatus from 'http-status'

/**
 * Class representing an API error.
 * @extends Error
 */
class APIError extends Error {
  status: number | undefined = httpStatus.INTERNAL_SERVER_ERROR
  messages: undefined

  constructor(message: string, status: number | undefined = httpStatus.INTERNAL_SERVER_ERROR, messages: undefined = undefined) {
    super(message)
    this.status = status
    this.messages = messages
    Object.setPrototypeOf(this, APIError.prototype)
  }
}


export default APIError
