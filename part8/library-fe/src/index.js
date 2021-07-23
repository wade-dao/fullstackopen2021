import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { 
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)