import { css } from 'glamor'

css.global('html, body, #root', {
  margin: '0',
  padding: '0',
  fontFamily: `'Lato', sans-serif`,
  color: '#666666',
})

css.global('*', {
  boxSizing: 'border-box',
})

export const app = css({
  maxWidth: '320px',
  margin: '0 auto',
})

export const finishedMessage = css({
  fontSize: '30px',
  margin: '0 20px',
  padding: '40px 0',
  textAlign: 'center',
})
