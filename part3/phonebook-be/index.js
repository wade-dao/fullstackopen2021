const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

//test
app.get('/', (request, response) => {
  response.send("<h1>Hello World, I'm Luu!</h1>")
})

//info
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people </p>
                 <p>${new Date()}</p>`)
})

//get all
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//get one
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

//delete
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

//create
app.post('/api/persons', (request, response) => {
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

  const samePerson = persons.find(person => person.name === request.body.name)
  console.log('same person ', samePerson)
  if (samePerson) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  const id = Math.floor(Math.random() * 1000000 + persons.length)
  const newPerson = request.body
  newPerson.id = id
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})