require('dotenv').config()

const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

//serve static front-end from 'build' folder
app.use(express.static('build'))

app.use(express.json())
app.use(cors())

//logging configuration
morgan.token('req-body', (request, response) => { 
  // console.log(req.body)
  
  if (request.method === "POST") {
    const logInfo = {
      name: request.body.name,
      number: request.body.number
    }
    return JSON.stringify(logInfo)
  }
  else
    return ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

//test
app.get('/', (request, response) => {
  response.send("<h1>Hello World, I'm Luu!</h1>")
})

// info
app.get('/info', (request, response, next) => {
  Person.find({})
    .then(result => {
      response.send(`<p>Phonebook has info for ${result.length} people </p>
                  <p>${new Date()}</p>`)
    })
    .catch(error => next(error))
})

//get all
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(result => {
    response.json(result)
  })
  .catch(error => next(error))
})

//get one
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//delete
app.delete('/api/persons/:id', (request, response, next) => {
  // Person.deleteOne({_id: request.params.id}).then(() => {
  //   response.status(204).end()
  // })
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))  
})

//update
app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body)
    .then(result => {
      response.status(200).end()
    })
    .catch(error => next(error))
})

//create
app.post('/api/persons', (request, response, next) => {
  if (request.body.name === null || request.body.name === '') {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
  
  if (request.body.number === null || request.body.number === '') {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  Person.find({ $and: [{name: request.body.name}, {number: request.body.number}] }).then(result => {
    console.log('find', result)
    if (result.length > 0) {
      return response.status(400).json({ 
        error: 'this entry is already existed' 
      })
    }
    else {
      const newPerson = new Person(request.body)
      newPerson.save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
        .catch(error => next(error))
    }
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})