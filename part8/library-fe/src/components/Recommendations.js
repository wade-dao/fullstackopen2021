import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS_FROM_A_GENRE } from '../graphql/queries'

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS_FROM_A_GENRE, {
    variables: { genre: props.genre }
  })

  if (!props.show) {
    return null
  }

  if (result.loading || !props.genre) {
    return <div>loading books...</div>
  }

  const books = result.data.allBooks
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{props.genre}</strong></p>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations