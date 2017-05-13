import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import { Map, List } from 'immutable'
import PlanRecord from 'records/PlanRecord'
import CycleRecord from 'records/CycleRecord'
import Timer from 'components/Timer'
import Plan from 'components/Plan'
import './App.css'

const App = ({ data, createCycles, stepTo, getCurrentStep, getCurrentCycle }) => (
  <div className='App'>
    { data.get('plan').planned &&
      data.get('cycles').size > 0 &&
      !data.get('finished') &&
      <Timer
        time={ getCurrentStep().time }
        onFinish={ stepTo(getCurrentCycle().currentStep + 1) } />
    }
    { data.get('finished') &&
      <h1>Congratulations, everything is done!</h1>
    }
    <Plan
      plan={ data.get('plan') }
      onFinish={ createCycles } />
  </div>
)

const initialState = [
  'data',
  'setData',
  Map({
    plan: PlanRecord(),
    cycles: List(),
    currentCycle: null,
    finished: false,
  }),
]

const createCycles = ({ setData }) => (newPlan) => {
  setData((data) => data.merge({
    plan: newPlan,
    currentCycle: 0,
    cycles: newPlan.tasks.map((task) => CycleRecord({ task }, { work: { time: 5000 }, shortPause: { time: 2000 }, longPause: { time: 3000 } })),
  }))
}

const getCurrentCycle = ({ data }) => () => {
  return data
    .get('cycles')
    .get(data.get('currentCycle'))
}

const getCurrentStep = (props) => () => {
  const currentCycle = getCurrentCycle(props)()
  return currentCycle.steps.get(currentCycle.currentStep)
}

const stepTo = ({ setData }) => (nextStep) => () => {
  setData((data) => data.merge({
    currentCycle: (
      nextStep === data.get('cycles').get(data.get('currentCycle')).steps.size
      ? (data.get('currentCycle') + 1) < data.get('cycles').size
        ? data.get('currentCycle') + 1
        : data.get('currentCycle')
      : data.get('currentCycle')
    ),
    finished: (
      nextStep === data.get('cycles').get(data.get('currentCycle')).steps.size &&
      (data.get('currentCycle') + 1) === data.get('cycles').size
    ),
    cycles: data.get('cycles').update(
      data.get('currentCycle'),
      (cycle) => cycle.merge({
        currentStep: nextStep,
        steps: cycle.steps.update(
          cycle.currentStep,
          (step) => step.merge({ done: true }),
        ),
      }),
    ),
  }))
}

export default compose(
  withState(...initialState),
  withHandlers({ createCycles, stepTo, getCurrentCycle, getCurrentStep }),
)(App)
