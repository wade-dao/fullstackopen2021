import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_BIRTHYEAR } from '../graphql/mutations'
import { ALL_AUTHORS } from '../graphql/queries'

import { Form } from 'react-bootstrap'

const SetBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateBirthYear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const authors = useQuery(ALL_AUTHORS)

  const submit = async (event) => {
    event.preventDefault()
    const intBorn = parseInt(born, 10)

    try {
      await updateBirthYear({ variables: {
        name: name,
        setBornTo: intBorn
      }})
    }
    catch (exception) {
      console.log(exception)
    }

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <Form onSubmit={submit}>
        <Form.Select aria-label="Select Author" onChange={({ target }) => setName(target.value)}>
          {authors.data.allAuthors.map(a => 
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </Form.Select>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </Form>
    </div>
  )
}

export default SetBirthYear