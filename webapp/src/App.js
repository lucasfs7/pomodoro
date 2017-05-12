import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import CycleRecord from 'records/CycleRecord'
import Timer from 'components/Timer'
import Task from 'components/Task'
import './App.css'

const App = ({ cycle, stepTo, changeTaskText }) => (
  <div className='App'>
    <Timer
      time={ cycle.steps.get(cycle.currentStep).time }
      onFinish={ stepTo(cycle.currentStep + 1) } />
    <h2>Tasks</h2>
    { cycle
        .steps
        .filter((step) => !step.pause)
        .map((step, index) => (
          <Task
            key={ index }
            done={ step.done }
            text={ step.task }
            onTextChange={ changeTaskText(step.id) } />
    )) }
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

const changeTaskText = ({ cycle, setCycle }) => (id) => (text) => {
  const updatedCycle = cycle.merge({
    steps: cycle.steps.map((step, index) =>
      step.id === id
      ? step.merge({ task: text })
      : step
    )
  })
  setCycle(updatedCycle)
}

export default compose(
  withState(...initialState),
  withHandlers({ stepTo, changeTaskText })
)(App)
