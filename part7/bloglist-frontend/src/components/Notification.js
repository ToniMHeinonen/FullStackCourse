import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div
      className="notification"
      style={notification ? { display: 'block' } : { display: 'none' }}
    >
      {notification}
    </div>
  )
}

export default Notification
