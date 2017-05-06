import React from 'react'
import { compose, withState } from 'recompose'
import { time as T } from 'utils/time'
import Timer from 'components/Timer'
import './App.css'

const App = ({ config }) => (
  <div className='App'>
    <Timer time={ config.steps[config.currentStep].time } />
  </div>
)

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

export default compose(
  withState(...initialState),
)(App)
