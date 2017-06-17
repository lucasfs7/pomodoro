import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
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
          disabled={ state.get('plan').draft.size === 0 }
          onClick={ finishPlan }>
          Ready to go?
        </button>
      </div>
    }
    <ul>
      { !state.get('plan').planned &&
        state.get('plan').draft.map((task, index) => (
          <li key={ index }>{ task }</li>
        ))
      }
      { state.get('plan').planned &&
        state.get('plan').cycles
        .sort((a, b) => (
          a.finished && b.finished
          ? 0
          : a.finished
            ? 1
            : -1
        ))
        .map((cycle, index) => (
          <li key={ index }>
            { cycle.task }
            { cycle.finished &&
              <span>&#10004;</span>
            }
          </li>
        ))
      }
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
      draft: state.get('plan').draft.push([ text ]),
    }),
  }))
}

const finishPlan = ({ state, setState, onFinish }) => () => {
  if (state.get('plan').draft.size === 0) return
  if (onFinish) onFinish(state.get('plan').draft)
}

const onTextChange = ({ setState }) => (e) => {
  const text = e.target.value
  setState((state) => state.merge({
    text,
  }))
}

const lifecycleHandler = {
  componentWillReceiveProps({ plan, setState }) {
    if (plan !== this.props.plan) {
      setState((state) => state.merge({ plan }))
    }
  },
}

export default compose(
  withState(...initialState),
  withHandlers({ addTask, finishPlan, onTextChange }),
  lifecycle(lifecycleHandler),
)(Plan)
