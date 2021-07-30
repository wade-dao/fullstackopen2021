import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

export const ALL_AUTHORS = gql`
  query Authors{
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query Books{
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS_FROM_A_GENRE = gql`
  query BooksFromAGenre($genre: String!){
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const CURRENT_USER = gql`
  query CurrentUser{
    me {
      username
      favoriteGenre
    }
  }
`