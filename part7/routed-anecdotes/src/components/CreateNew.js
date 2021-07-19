import React, { useState } from 'react'
import { useField } from '../hooks/index'

const CreateNew = (props) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const { clearValue: clearValueContent, ...contentInput} = content
  const { clearValue: clearValueAuthor, ...authorInput} = author
  const { clearValue: clearValueInfo, ...infoInput} = info

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    clearValueContent()
    clearValueAuthor()
    clearValueInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...contentInput} />
        </div>
        <div>
          author
          <input name='author' {...authorInput} />
        </div>
        <div>
          url for more info
          <input name='info' {...infoInput} />
        </div>
        <button>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}
export default CreateNew