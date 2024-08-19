const Notification = ({ message }) => {
  if (message.length > 0) {
    return (
      <p className="notification" data-testid="notification-element">
        {message}
      </p>
    )
  }

  return null
}

export default Notification
