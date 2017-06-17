import { css } from 'glamor'

export const taskInput = css({
  background: 'transparent',
  border: '0',
  fontSize: '20px',
  margin: '0 20px',
  outline: 'none',
  padding: '40px 0',
  width: '100%',
  '&::placeholder': {
    color: '#CCCCCC',
  },
})

export const tasks = css({
  margin: '0 20px',
  padding: '0 0 0 20px',
})

export const task = css({
  margin: '5px 0',
  padding: '0',
})

export const plannedTask = css(task, {
})

export const finishedTask = css(plannedTask, {
  textDecoration: 'line-through',
})

export const startButton = css({
  background: '#DF3B57',
  border: '0',
  color: '#FFFFFF',
  fontSize: '20px',
  fontWeight: 'bold',
  height: '60px',
  margin: '40px 20px 0 20px',
  textTransform: 'uppercase',
  width: 'calc(100% - 40px)',
  '&[disabled]': {
    opacity: '.7',
  },
})
