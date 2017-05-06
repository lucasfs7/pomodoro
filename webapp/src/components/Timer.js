import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import T from 'utils/time'

const Timer = ({ timer, startTimer, pauseTimer, stopTimer }) => (
  <div className='Timer'>
    <h1>{ timer.remaining / 1000 }</h1>
    <button
      onClick={ startTimer(timer.remaining) }
      disabled={ !!timer.timeoutPID }>
      Start
    </button>
    <button onClick={ pauseTimer }>
      Pause
    </button>
    <button onClick={ stopTimer }>
      Stop
    </button>
  </div>
)

Timer.propTypes = {
  time: PropTypes.number.isRequired,
}

const state = [
  'timer',
  'setTimer',
  ({ time }) => ({ remaining: time, timeoutPID: null }),
]

const startTimer = ({ time, setTimer }) => (t) => {
  const start = (t) => {
    if (t < T(1).seconds) {
      setTimer((oldState) => ({ ...oldState, remaining: time, timeoutPID: false }))
      return false
    }
    const remaining = t - T(1).seconds
    const timeoutFn = () => {
      setTimer((oldState) => ({ ...oldState, remaining }))
      start(remaining)
    }
    const timeoutPID = setTimeout(timeoutFn, T(1).seconds)
    setTimer((oldState) => ({ ...oldState, timeoutPID }))
    return timeoutPID
  }
  return start.bind(null, t)
}

const pauseTimer = ({ timer, setTimer }) => () => {
  clearTimeout(timer.timeoutPID)
  setTimer((oldState) => ({ ...oldState, timeoutPID: null }))
}

const stopTimer = ({ time, timer, setTimer }) => () => {
  clearTimeout(timer.timeoutPID)
  setTimer((oldState) => ({ ...oldState, remaining: time, timeoutPID: null }))
}

export default compose(
  withState(...state),
  withHandlers({ startTimer, pauseTimer, stopTimer }),
)(Timer)
