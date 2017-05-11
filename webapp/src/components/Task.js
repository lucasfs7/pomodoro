import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

const Task = ({ done = false, text = '', handleTextChange }) => (
  <div>
    <input
      value={ text }
      disabled={ done }
      onChange={ handleTextChange } />
  </div>
)

Task.defaultProps = {
  onTextChange: (e) => e,
}

Task.propTypes = {
  done: PropTypes.bool,
  text: PropTypes.string,
  onTextChange: PropTypes.func,
}

const handleTextChange = ({ onTextChange }) => (e) => {
  onTextChange(e.target.value)
}

export default compose(
  withHandlers({ handleTextChange }),
)(Task)
