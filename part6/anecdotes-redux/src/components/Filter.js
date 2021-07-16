import React from 'react'
import { newFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

  const handleChange = (event) => {
    props.newFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  newFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter