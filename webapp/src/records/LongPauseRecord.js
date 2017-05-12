import { Record } from 'immutable'
import uuid from 'uuid/v1'
import { time as T } from 'utils/time'

const TaskRecord = Record({
  id: null,
  time: T(15).minutes,
  done: false,
  pause: true,
}, 'LongPause')

export default (props = {}) => new TaskRecord({
  ...props,
  id: uuid(),
})
