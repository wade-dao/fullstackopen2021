  
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clearValue = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clearValue
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  let token = 'This is for fun'

  useEffect(() => {
    get()
  }, [])

  const get = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    }
    await axios.post(baseUrl, resource, config)
    get()
  }

  const service = {
    create,
    get
  }

  return [
    resources, service
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const {clearValue: cV1, ...contentInput} = content
  const {clearValue: cV2, ...nameInput} = name
  const {clearValue: cV3, ...numberInput} = number

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    cV1()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    cV2()
    cV3()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input name='content' {...contentInput} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input name='name' {...nameInput} /> <br/>
        number <input name='number' {...numberInput} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App