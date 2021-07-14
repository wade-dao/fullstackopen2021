const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')
const config = require('../utils/config')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } 
  else {
    request.token = ''
  }
  next()
}

const userExtractor = async (request, response, next) => {
  //get user from token
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!request.token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}