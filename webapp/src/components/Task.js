import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'

const Task = ({ done, text, autoFocus, handleTextChange }) => (
  <div>
    <input
      autoFocus={ autoFocus }
      value={ text }
      disabled={ done }
      onChange={ handleTextChange } />
  </div>
)

Task.defaultProps = {
  autoFocus: false,
  done: false,
  text: '',
  onTextChange: (e) => e,
}

Task.propTypes = {
  autoFocus:  PropTypes.bool,
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
