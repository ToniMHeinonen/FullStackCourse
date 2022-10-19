const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://toniheinonen:${password}@cluster0.o8bfybw.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then((result) => {
  console.log('-- All --')
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})

Note.find({important: true}).then((result) => {
  console.log('-- Important --')
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})

/*
const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

note.save().then((result) => {
  console.log('note saved!', result)
  mongoose.connection.close()
})
*/
