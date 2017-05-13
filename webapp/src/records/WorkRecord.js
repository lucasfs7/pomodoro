import { Record } from 'immutable'
import uuid from 'uuid/v1'
import { time as T } from 'utils/time'

const WorkRecord = Record({
  id: null,
  time: T(25).minutes,
  done: false,
}, 'Work')

export default (props = {}) => new WorkRecord({
  ...props,
  id: uuid(),
})
