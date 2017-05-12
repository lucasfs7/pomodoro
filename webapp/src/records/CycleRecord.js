import { Record, List } from 'immutable'
import uuid from 'uuid/v1'
import WorkRecord from 'records/WorkRecord'
import ShortPauseRecord from 'records/ShortPauseRecord'
import LongPauseRecord from 'records/LongPauseRecord'

const CycleRecord = Record({
  id: null,
  currentStep: 0,
  steps: List(),
})

export default (
  props,
  { work, shortPause, longPause } = {},
) => new CycleRecord({
  ...props,
  id: uuid(),
  steps: List([
    WorkRecord(work),
    ShortPauseRecord(shortPause),
    WorkRecord(work),
    ShortPauseRecord(shortPause),
    WorkRecord(work),
    ShortPauseRecord(shortPause),
    WorkRecord(work),
    LongPauseRecord(longPause),
  ]),
})
