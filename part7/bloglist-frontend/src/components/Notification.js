import { useSelector } from 'react-redux'
import styled from 'styled-components'

export const Div = styled.div`
  color: green;
  background: lightgrey;
  font-size: 20px;
  border-style: solid;
  border-radius: 5px;
  border-color: green;
  padding: 10px;
  margin-bottom: 10px;
`

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) {
    return null
  }

  return <Div>{notification}</Div>
}

export default Notification
