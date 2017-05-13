import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { Map } from 'immutable'
import { PlanRecord } from 'records/PlanRecord'

const Plan = ({ state, addTask, finishPlan, onTextChange }) => (
  <div>
    { state.get('plan').planned ? (
      <h1>The plan...</h1>
    ) : (
      <h1>What do you want to accomplish today?</h1>
    ) }
    { !state.get('plan').planned &&
      <div>
        <input
          autoFocus
          spellCheck={ false }
          value={ state.get('text') }
          onChange={ onTextChange }
          type='text'
          placeholder='...'
          onKeyPress={ addTask } />
        <button
          disabled={ state.get('plan').tasks.size === 0 }
          onClick={ finishPlan }>
          Ready to go?
        </button>
      </div>
    }
    <ul>
      { state.get('plan').tasks.map((task, index) => (
        <li key={ index }>{ task }</li>
      )) }
    </ul>
  </div>
)

Plan.propTypes = {
  plan: PropTypes.instanceOf(PlanRecord).isRequired,
  onFinish: PropTypes.func,
}

const initialState = [
  'state',
  'setState',
  ({ plan }) => Map({
    plan,
    text: '',
  }),
]

const addTask = ({ setState }) => (e) => {
  if (e.key !== 'Enter') return
  if (!e.target.value) return
  const text = e.target.value
  setState((state) => state.merge({
    text: '',
    plan: state.get('plan').merge({
      tasks: state.get('plan').tasks.push([ text ]),
    }),
  }))
}

const finishPlan = ({ state, setState, onFinish }) => () => {
  if (state.get('plan').tasks.size === 0) return
  const updatedPlan = state.get('plan').merge({ planned: true })
  setState((state) => state.merge({
    plan: updatedPlan,
  }))
  if (onFinish) onFinish(updatedPlan)
}

const onTextChange = ({ setState }) => (e) => {
  const text = e.target.value
  setState((state) => state.merge({
    text,
  }))
}

export default compose(
  withState(...initialState),
  withHandlers({ addTask, finishPlan, onTextChange }),
)(Plan)
