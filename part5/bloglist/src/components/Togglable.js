import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const hide = () => {
    return (
      <button onClick={toggleVisibility}>{props.buttonLabel}</button>
    )
  }
  
  const show = () => {
    return (
      <div>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    )
  }

  return (
    <div>
      { visible === true ? show() :  hide () } 
    </div>
  )
})

export default Togglable