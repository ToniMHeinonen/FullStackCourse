const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://toniheinonen:${password}@cluster0.o8bfybw.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3]

if (!name) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
  return
}

const number = process.argv[4]

const person = new Person({
  name: name,
  number: number,
})

person.save().then((result) => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
