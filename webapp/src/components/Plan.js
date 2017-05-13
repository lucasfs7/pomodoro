import React from 'react'
import PropTypes from 'prop-types'
import { compose, withState, withHandlers } from 'recompose'
import { Map, List } from 'immutable'

const Plan = ({ plan, addTask, finishPlan, text, onTextChange }) => (
  <div>
    <h1>What do you want to accomplish today?</h1>
    { !plan.get('planned') &&
      <div>
        <input
          autoFocus
          value={ text }
          onChange={ onTextChange }
          type='text'
          placeholder='...'
          onKeyPress={ addTask } />
        <button
          onClick={ finishPlan }>
          Ready to go?
        </button>
      </div>
    }
    <ul>
      { plan.get('tasks').map((task, index) => (
        <li key={ index }>{ task }</li>
      )) }
    </ul>
  </div>
)

Plan.propTypes = {
  onFinish: PropTypes.func,
}

const initialState = [
  'plan',
  'setPlan',
  Map({
    tasks: List(),
    planned: false,
  }),
]

const addTask = ({ plan, setPlan, setText }) => (e) => {
  if (e.key !== 'Enter') return
  const text = e.target.value
  const updatedPlan = plan.merge({
    tasks: plan.get('tasks').push([ text ]),
  })
  setPlan(updatedPlan)
  setText('')
}

const finishPlan = ({ plan, setPlan, onFinish }) => () => {
  const updatedPlan = plan.merge({ planned: true })
  setPlan(updatedPlan)
  if (onFinish) onFinish(updatedPlan)
}

const textState = [
  'text',
  'setText',
  '',
]

const onTextChange = ({ setText }) => (e) => {
  const text = e.target.value
  setText(text)
}

export default compose(
  withState(...initialState),
  withState(...textState),
  withHandlers({ addTask, finishPlan, onTextChange }),
)(Plan)
