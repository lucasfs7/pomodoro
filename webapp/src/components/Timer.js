import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import { time as T, fullTime } from 'utils/time'
import { Map } from 'immutable'

const Timer = ({ timer, startTimer, pauseTimer, stopTimer }) => (
  <div className='Timer'>
    <h1>{ fullTime(timer.get('remaining')) }</h1>
    <button
      onClick={ startTimer(timer.get('remaining')) }
      disabled={ !!timer.get('timeoutPID') }>
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
  onFinish: PropTypes.func,
}

const initialState = [
  'timer',
  'setTimer',
  ({ time }) => Map({ remaining: time, timeoutPID: null }),
]

const lifecycleMethods = {
  componentWillReceiveProps({ time, timer, setTimer }) {
    if (time !== this.props.time) {
      setTimer(timer.merge({ remaining: time }))
    }
  },
}

const startTimer = ({ time, timer, setTimer, onFinish }) => (t) => {
  const start = (t) => {
    if (t < T(1).seconds) {
      setTimer(timer.merge({ remaining: time, timeoutPID: false }))
      if (onFinish) onFinish()
      return false
    }
    const remaining = t - T(1).seconds
    const timeoutFn = () => {
      setTimer(timer.merge({ remaining }))
      start(remaining)
    }
    const timeoutPID = setTimeout(timeoutFn, T(1).seconds)
    setTimer(timer.merge({ remaining, timeoutPID }))
    return timeoutPID
  }
  return start.bind(null, t)
}

const pauseTimer = ({ timer, setTimer }) => () => {
  clearTimeout(timer.get('timeoutPID'))
  setTimer(timer.merge({ timeoutPID: null }))
}

const stopTimer = ({ time, timer, setTimer }) => () => {
  clearTimeout(timer.get('timeoutPID'))
  setTimer(timer.merge({ remaining: time, timeoutPID: null }))
}

export default compose(
  withState(...initialState),
  withHandlers({ startTimer, pauseTimer, stopTimer }),
  lifecycle(lifecycleMethods),
)(Timer)
