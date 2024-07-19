const Notification = ({ message }) => {
  if (message.length > 0) {
    return (
      <p className='notification'>{message}</p>
    )
  }

  return null
}

export default Notification