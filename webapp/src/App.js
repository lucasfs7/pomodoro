import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { time as T } from 'utils/time'
import { mergeState } from 'utils/state'
import Timer from 'components/Timer'
import Task from 'components/Task'
import './App.css'

const App = ({ cicle, stepTo, changeTaskText }) => (
  <div className='App'>
    <Timer
      time={ cicle.steps[cicle.currentStep].time }
      onFinish={ stepTo(cicle.currentStep + 1) } />
    <h2>Tasks</h2>
    { cicle.steps.map((step, index) => (
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

const pomodoro = { time: T(25).minutes, done: false }
const shortPause = { time: T(5).minutes, done: false, pause: true }
const longPause = { time: T(15).minutes, done: false, pause: true }

const initialState = [
  'cicle',
  'setCicle',
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

const stepTo = ({ cicle, setCicle }) => (nextStep) => () => {
  setCicle(mergeState({
    currentStep: nextStep,
    steps: [ ...cicle.steps.map((step, index) =>
      index === (nextStep - 1)
      ? { ...step, done: true }
      : step
    ) ]
  }))
}

const changeTaskText = ({ cicle, setCicle }) => (selectedStep) => (text) => {
  setCicle(mergeState({
    steps: [
      ...cicle.steps.map((step, index) =>
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
