import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ALL_BOOKS_FROM_A_GENRE = gql`
  query BooksFromAGenre($genre: String!){
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`