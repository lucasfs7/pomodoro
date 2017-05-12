import { Record } from 'immutable'
import uuid from 'uuid/v1'
import { time as T } from 'utils/time'

const ShortPauseRecord = Record({
  id: null,
  time: T(5).minutes,
  done: false,
  pause: true,
}, 'ShortPause')

export default (props = {}) => new ShortPauseRecord({
  ...props,
  id: uuid(),
})
