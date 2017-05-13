import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import CycleRecord from 'records/CycleRecord'
import Timer from 'components/Timer'
import Task from 'components/Task'
import './App.css'

const App = ({ cycle, stepTo, changeTaskText }) => (
  <div className='App'>
    <h2>What do you want to accomplish?</h2>
    <Task
      autoFocus
      text={ cycle.task }
      onTextChange={ changeTaskText } />
    <Timer
      time={ cycle.steps.get(cycle.currentStep).time }
      onFinish={ stepTo(cycle.currentStep + 1) } />
  </div>
)

const initialState = [
  'cycle',
  'setCycle',
  CycleRecord(),
]

const stepTo = ({ cycle, setCycle }) => (nextStep) => () => {
  const updatedCycle = cycle.merge({
    currentStep: nextStep,
    steps: cycle.steps.map((step, index) =>
      index === (nextStep - 1)
      ? step.merge({ done: true })
      : step
    )
  })
  setCycle(updatedCycle)
}

const changeTaskText = ({ cycle, setCycle }) => (text) => {
  const updatedCycle = cycle.merge({
    task: text
  })
  setCycle(updatedCycle)
}

export default compose(
  withState(...initialState),
  withHandlers({ stepTo, changeTaskText }),
)(App)
