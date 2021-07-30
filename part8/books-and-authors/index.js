const { createServer } = require('http')
const express = require('express')
const cors = require('cors')
const { execute, subscribe } = require('graphql')
const { ApolloServer, gql } = require('apollo-server-express')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { PubSub } = require('graphql-subscriptions')
const { UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'THIS_IS_MY_SECRET'

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user');

(async () => {
  const MONGODB_URI = 'mongodb+srv://loud:mongopassword@cluster0.84msz.mongodb.net/library?retryWrites=true&w=majority'
  console.log('connecting to', MONGODB_URI)
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
  mongoose.set('debug', true);

  const PORT = 4000
  const pubsub = new PubSub()
  const app = express()
  app.use(cors())

  const typeDefs = gql`
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }

    type Token {
      value: String!
    }

    type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String]
    }

    type Author {
      name: String!
      born: Int
      bookCount: Int!
    }

    type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      me: User
    }

    type Mutation {
      addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String]!
      ): Book
      editAuthor(
        name: String!
        setBornTo: Int!
      ) : Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
    }

    type Subscription {
      bookAdded: Book!
    }
  `

  const resolvers = {
    Author: {
      bookCount: async (root) => await root.books.length
    },
    Query: {
      bookCount: async () => await Book.collection.countDocuments(),
      authorCount: async () => await Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        if (args.author) {
          const author = await Author.findOne({ name: args.author })
          if (args.genre)
          {
            const results = await Book.find({ genres: { $in: args.genre }, author: author._id }).populate('author')
            return results
          }
          else {
            const results = await Book.find({ author: author._id }).populate('author')
            return results
          }
        }
        else {
          if (args.genre)
          {
            const results = await Book.find({ genres: { $in: args.genre } }).populate('author')
            return results
          }
          else {
            const results = await Book.find({}).populate('author')
            return results
          }
        }
      },
      allAuthors: async () => await Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Mutation: {
      addBook: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const existingAuthor = await Author.findOne({ name: args.author })
        let book
        if (existingAuthor) {
          book = new Book({
            title: args.title,
            published: args.published,
            author: existingAuthor,
            genres: args.genres
          })

          try {
            await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          existingAuthor.books = existingAuthor.books.concat(book.id)
          existingAuthor.save()
        }
        else {
          const newAuthor = new Author({ name: args.author })

          book = new Book({
            title: args.title,
            published: args.published,
            author: newAuthor,
            genres: args.genres
          })

          try {
            await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }

          newAuthor.books = [].concat(book.id)
          try {
            await newAuthor.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args.authorname,
            })
          }
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      },
      editAuthor: async (root, args, { currentUser }) => {
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }

        const author = await Author.findOne({ name: args.name })
        author.born = args.setBornTo

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        return author
      },
      createUser: async (root, args) => {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre
        })
    
        try {
          await user.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        return user
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== '1234' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
      },
    },
  }

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const httpServer = createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
  })

  await server.start()
  server.applyMiddleware({ app })
  const subscriptionServer = SubscriptionServer.create({
    schema,
    execute,
    subscribe,
    async onConnect(connectionParams) {
      const auth = connectionParams.Authorization
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
      throw new Error('Missing auth token!');
    }
  }, {
      server: httpServer,
      path: server.graphqlPath
  });

  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => subscriptionServer.close());
  });

  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
    )
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
    )
  })
})()

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: async ({ req }) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.toLowerCase().startsWith('bearer ')) {
//       const decodedToken = jwt.verify(
//         auth.substring(7), JWT_SECRET
//       )
//       const currentUser = await User.findById(decodedToken.id)
//       return { currentUser }
//     }
//   }
// })

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })