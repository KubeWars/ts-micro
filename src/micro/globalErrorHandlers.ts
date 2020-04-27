import APIError from '../helpers/APIError'
import * as httpStatus from 'http-status'
import {config} from '../config'

export const normalizeError = (err, req, res, next) => {
  console.log(err.stack)
  if (!(err instanceof Object.getPrototypeOf(APIError))) {
    const apiError = new APIError(err.message, err.status)
    return next(apiError)
  }
  return next(err)
}
export const convertError = (req, res, next) => {
  const err = new APIError('not_found', httpStatus.NOT_FOUND)
  return next(err)
}
export const sendErrorToClient = (err, req, res, next) => {
  let errors = {}
  let errorType
  let status = err.status
  console.log(err)
  if (err.messages && err.messages.length) {
    errorType = err.message === 'Validation Failed' || err.message.startsWith('Validation') || err.message.startsWith('validation') ? 'validation' : 'other'
    for (const message of err.messages) {
      if (message.children) {
        for (const property in message.children) {
          if (message.children[property].children[property]) {
            for (const childrenConstraint in message.children[property].children[property].constraints) {
              errors[message.children[property].children[property].property] = message.children[property].children[property].constraints[childrenConstraint]
            }
          }
        }
      }
      if (message.constraints) {
        for (const constraint in message.constraints) {
          errors[message.property] = message.constraints[constraint]
        }
      }
    }
  } else {
    errors['message'] = err.message || 'Server Error'
    errorType = 'other'
  }
  let response = <any>{
    error: true,
    errorType,
    errors
  }
  if (config.env === 'development') {
    response.dev = err.stack
  }

  return res.status(status).json(response)
}
