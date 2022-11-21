import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const Div = styled.div`
  color: red;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  border-color: red;
  padding: 10px;
  margin-bottom: 10px;
`

const Error = () => {
  const error = useSelector((state) => state.error)

  if (!error) return null

  return <Div>{error}</Div>
}

export default Error
