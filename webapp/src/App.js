import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { time as T } from 'utils/time'
import Timer from 'components/Timer'
import './App.css'

const App = ({ config, stepTo }) => (
  <div className='App'>
    <Timer
      time={ config.steps[config.currentStep].time }
      onFinish={ stepTo(config.currentStep + 1) } />
  </div>
)

const mergeState = (newState) => (oldState) => ({
  ...oldState,
  ...newState
})

const pomodoro = { time: T(25).minutes, done: false }
const shortPause = { time: T(5).minutes, done: false }
const longPause = { time: T(15).minutes, done: false }

const initialState = [
  'config',
  'setConfig',
  {
    currentStep: 0,
    steps: [
      { ...pomodoro },
      { ...shortPause },
      { ...pomodoro },
      { ...shortPause },
      { ...pomodoro },
      { ...shortPause },
      { ...pomodoro },
      { ...longPause },
    ],
  },
]

const stepTo = ({ config, setConfig }) => (step) => () => {
  setConfig(mergeState({
    currentStep: step,
    steps: [ ...config.steps.map((step, index) => ({
      ...step,
      done: index === (step - 1)
    })) ]
  }))
}

export default compose(
  withState(...initialState),
  withHandlers({ stepTo })
)(App)
