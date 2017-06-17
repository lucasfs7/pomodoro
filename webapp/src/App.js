import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers, withContext } from 'recompose'
import { ShortcutManager } from 'react-shortcuts'
import PlanRecord from 'records/PlanRecord'
import CycleRecord from 'records/CycleRecord'
import Timer from 'components/Timer'
import Plan from 'components/Plan'
import notify from 'utils/notify'
import keymap from 'utils/keymap'
import * as styles from 'App.css'

const App = ({ plan, createCycles, stepTo, getCurrentStep, getCurrentCycle, resetPlan }) => (
  <div className={ styles.app }>
    { plan.planned &&
      plan.get('cycles').size > 0 &&
      !plan.get('finished') &&
      <Timer
        time={ getCurrentStep().time }
        onFinish={ stepTo(getCurrentCycle().currentStep + 1) } />
    }
    { plan.get('finished') &&
      <div>
        <h1 className={ styles.finishedMessage }>
          Congratulations, everything is done!
        </h1>
        <button
          className={ styles.restartButton }
          onClick={ resetPlan }>
          New plan
        </button>
      </div>
    }
    <Plan
      plan={ plan }
      onFinish={ createCycles } />
  </div>
)

const initialState = [
  'plan',
  'setPlan',
  PlanRecord(),
]

const createCycles = ({ setPlan }) => (draft) => {
  setPlan((plan) => plan.merge({
    draft,
    planned: true,
    currentCycle: 0,
    cycles: draft.map((task) => CycleRecord({ task }, { work: { time: 5000 }, shortPause: { time: 2000 }, longPause: { time: 3000 } })),
  }))
}

const getCurrentCycle = ({ plan }) => () => {
  return plan
    .get('cycles')
    .get(plan.get('currentCycle'))
}

const getCurrentStep = (props) => () => {
  const currentCycle = getCurrentCycle(props)()
  return currentCycle.steps.get(currentCycle.currentStep)
}

const stepTo = ({ setPlan }) => (nextStep) => () => {
  notify()
  setPlan((plan) => plan.merge({
    currentCycle: (
      nextStep === plan.get('cycles').get(plan.get('currentCycle')).steps.size
      ? (plan.get('currentCycle') + 1) < plan.get('cycles').size
        ? plan.get('currentCycle') + 1
        : plan.get('currentCycle')
      : plan.get('currentCycle')
    ),
    finished: (
      nextStep === plan.get('cycles').get(plan.get('currentCycle')).steps.size &&
      (plan.get('currentCycle') + 1) === plan.get('cycles').size
    ),
    cycles: plan.get('cycles').update(
      plan.get('currentCycle'),
      (cycle) => cycle.merge({
        currentStep: nextStep,
        finished: nextStep === cycle.steps.size,
        steps: cycle.steps.update(
          cycle.currentStep,
          (step) => step.merge({ done: true }),
        ),
      }),
    ),
  }))
}

const resetPlan = ({ setPlan }) => () => {
  setPlan(PlanRecord())
}

const context = [
  {
    shortcuts: PropTypes.object.isRequired,
  },
  () => ({
    shortcuts: new ShortcutManager(keymap),
  }),
]

export default compose(
  withContext(...context),
  withState(...initialState),
  withHandlers({ createCycles, stepTo, getCurrentCycle, getCurrentStep, resetPlan }),
)(App)
