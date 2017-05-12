import { Record, List } from 'immutable'
import uuid from 'uuid/v1'
import TaskRecord from 'records/TaskRecord'
import ShortPauseRecord from 'records/ShortPauseRecord'
import LongPauseRecord from 'records/LongPauseRecord'

const CycleRecord = Record({
  id: null,
  currentStep: 0,
  steps: List(),
})

export default (
  props,
  { task, shortPause, longPause } = {},
) => new CycleRecord({
  ...props,
  id: uuid(),
  steps: List([
    TaskRecord(task),
    ShortPauseRecord(shortPause),
    TaskRecord(task),
    ShortPauseRecord(shortPause),
    TaskRecord(task),
    ShortPauseRecord(shortPause),
    TaskRecord(task),
    LongPauseRecord(longPause),
  ]),
})
