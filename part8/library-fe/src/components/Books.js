import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const displayingBooks = books.filter(b => {
    if ((genre !== 'all genres' && b.genres.includes(genre)) || genre === 'all genres')
    { 
      return b
    }
    else
      return null
  })
  const genres = books.map(b => b.genres)
  const uniqueGenres = Array.from(new Set([].concat(...genres))).concat('all genres')

  return (
    <div>
      <h2>books</h2>
      <p>in <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {displayingBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map(g =>
          <button key={g} onClick={() => setGenre(g)}>{g}</button>
        )}
      </div>
    </div>
  )
}

export default Books