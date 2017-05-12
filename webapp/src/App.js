import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import CicleRecord from 'records/CicleRecord'
import Timer from 'components/Timer'
import Task from 'components/Task'
import './App.css'

const App = ({ cicle, stepTo, changeTaskText }) => (
  <div className='App'>
    <Timer
      time={ cicle.steps.get(cicle.currentStep).time }
      onFinish={ stepTo(cicle.currentStep + 1) } />
    <h2>Tasks</h2>
    { cicle.steps.map((step, index) => (
      <div key={ index }>
        { !step.pause &&
          <Task
            done={ step.done }
            text={ step.task }
            onTextChange={ changeTaskText(step.id) } />
        }
      </div>
    )) }
  </div>
)

const initialState = [
  'cicle',
  'setCicle',
  CicleRecord(),
]

const stepTo = ({ cicle, setCicle }) => (nextStep) => () => {
  const updatedCicle = cicle.merge({
    currentStep: nextStep,
    steps: cicle.steps.map((step, index) =>
      index === (nextStep - 1)
      ? step.merge({ done: true })
      : step
    )
  })
  setCicle(updatedCicle)
}

const changeTaskText = ({ cicle, setCicle }) => (id) => (text) => {
  const updatedCicle = cicle.merge({
    steps: cicle.steps.map((step, index) =>
      step.id === id
      ? step.merge({ task: text })
      : step
    )
  })
  setCicle(updatedCicle)
}

export default compose(
  withState(...initialState),
  withHandlers({ stepTo, changeTaskText })
)(App)
