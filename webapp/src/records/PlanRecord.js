import { Record, List } from 'immutable'
import uuid from 'uuid/v1'

export const PlanRecord = Record({
  id: null,
  tasks: List(),
  planned: false,
}, 'Plan')

export default (props) => new PlanRecord({
  ...props,
  id: uuid(),
})
