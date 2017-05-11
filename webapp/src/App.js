import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { time as T } from 'utils/time'
import Timer from 'components/Timer'
import Task from 'components/Task'
import './App.css'

const App = ({ config, stepTo, changeTaskText }) => (
  <div className='App'>
    <Timer
      time={ config.steps[config.currentStep].time }
      onFinish={ stepTo(config.currentStep + 1) } />
    <h2>Tasks</h2>
    { config.steps.map((step, index) => (
      <div key={ index }>
        { !step.pause &&
          <Task
            done={ step.done }
            text={ step.task }
            onTextChange={ changeTaskText(index) } />
        }
      </div>
    )) }
  </div>
)

const mergeState = (newState) => (oldState) => ({
  ...oldState,
  ...newState
})

const pomodoro = { time: T(25).minutes, done: false }
const shortPause = { time: T(5).minutes, done: false, pause: true }
const longPause = { time: T(15).minutes, done: false, pause: true }

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

const stepTo = ({ config, setConfig }) => (nextStep) => () => {
  setConfig(mergeState({
    currentStep: nextStep,
    steps: [ ...config.steps.map((step, index) =>
      index === (nextStep - 1)
      ? { ...step, done: true }
      : step
    ) ]
  }))
}

const changeTaskText = ({ config, setConfig }) => (selectedStep) => (text) => {
  setConfig(mergeState({
    steps: [
      ...config.steps.map((step, index) =>
        index === selectedStep
        ? { ...step, task: text }
        : step)
    ],
  }))
}

export default compose(
  withState(...initialState),
  withHandlers({ stepTo, changeTaskText })
)(App)
