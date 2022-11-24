import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BornForm = ({ authors }) => {
  const defaultAuthor = authors[0].name
  const [selectedName, setSelectedName] = useState({
    value: defaultAuthor,
    label: defaultAuthor,
  })
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBorn({ variables: { name: selectedName.value, born: Number(born) } })

    setBorn('')
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <Select
          defaultValue={selectedName}
          onChange={setSelectedName}
          options={options}
        />
        <div>
          born{' '}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BornForm
