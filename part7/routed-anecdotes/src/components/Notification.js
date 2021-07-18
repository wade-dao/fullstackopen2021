import React from 'react'

const Notification = ({content}) => {
  if (content !== '')
    return (
      <div>
        {content}
      </div>
    )
  else
    return null
}

export default Notification