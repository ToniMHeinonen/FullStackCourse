const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const validateHyphenCount = (value) => value.split('-').length === 2

const validateHyphenPlacement = (value) =>
  value.charAt(2) === '-' || value.charAt(3) === '-'

const numberValidations = [
  {
    validator: validateHyphenCount,
    msg: 'One hyphen is required (examples: 04-42512324, 040-42324152)',
  },
  {
    validator: validateHyphenPlacement,
    msg: 'Hyphen needs to be placed after second or third character (examples: 04-42512324, 040-42324152)',
  },
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: numberValidations,
  },
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
