import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification.message.length > 0) {
    return (
      <p className="notification" data-testid="notification-element">
        {notification.message}
      </p>
    )
  }

  return null
}

export default Notification
