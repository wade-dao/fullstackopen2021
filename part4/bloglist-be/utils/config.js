require('dotenv').config()

const PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
} else if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.PROD_MONGODB_URI
} else {
  MONGODB_URI = process.env.MONGODB_URI
}

// const MONGODB_URI = process.env.NODE_ENV === 'test' 
//   ? process.env.TEST_MONGODB_URI
//   : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
