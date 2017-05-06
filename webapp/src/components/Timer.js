import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { time as T, fullTime } from 'utils/time'

const Timer = ({ timer, startTimer, pauseTimer, stopTimer }) => (
  <div className='Timer'>
    <h1>{ fullTime(timer.remaining) }</h1>
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

const mergeState = (newState) => (oldState) => ({
  ...oldState,
  ...newState
})

const initialState = [
  'timer',
  'setTimer',
  ({ time }) => ({ remaining: time, timeoutPID: null }),
]

const startTimer = ({ time, setTimer }) => (t) => {
  const start = (t) => {
    if (t < T(1).seconds) {
      setTimer(mergeState({ remaining: time, timeoutPID: false }))
      return false
    }
    const remaining = t - T(1).seconds
    const timeoutFn = () => {
      setTimer(mergeState({ remaining }))
      start(remaining)
    }
    const timeoutPID = setTimeout(timeoutFn, T(1).seconds)
    setTimer(mergeState({ timeoutPID }))
    return timeoutPID
  }
  return start.bind(null, t)
}

const pauseTimer = ({ timer, setTimer }) => () => {
  clearTimeout(timer.timeoutPID)
  setTimer(mergeState({ timeoutPID: null }))
}

const stopTimer = ({ time, timer, setTimer }) => () => {
  clearTimeout(timer.timeoutPID)
  setTimer(mergeState({ remaining: time, timeoutPID: null }))
}

export default compose(
  withState(...initialState),
  withHandlers({ startTimer, pauseTimer, stopTimer }),
)(Timer)
