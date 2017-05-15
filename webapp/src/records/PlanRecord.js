import { Record, List } from 'immutable'
import uuid from 'uuid/v1'

export const PlanRecord = Record({
  id: null,
  draft: List(),
  cycles: List(),
  currentCycle: null,
  planned: false,
  finished: false,
}, 'Plan')

export default (props) => new PlanRecord({
  ...props,
  id: uuid(),
})
