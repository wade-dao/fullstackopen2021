const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Missing name or number')
  process.exit(1)
}

if (process.argv.length > 5) {
  console.log('Too many arguments')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://loud:${password}@cluster0.84msz.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  newPerson.save().then(() => {
    console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
    mongoose.connection.close()
  })
}
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
