import { Record } from 'immutable'
import uuid from 'uuid/v1'
import { time as T } from 'utils/time'

const TaskRecord = Record({
  id: null,
  time: T(25).minutes,
  done: false,
  task: '',
}, 'Task')

export default (props = {}) => new TaskRecord({
  ...props,
  id: uuid(),
})
