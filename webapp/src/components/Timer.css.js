import { css } from 'glamor'

export const timer = css({
  padding: '40px 0',
  textAlign: 'center',
})

export const clock = css({
  margin: '0 20px',
  fontSize: '100px',
})

export const controlButton = css({
  background: 'none',
  border: '0',
  color: '#666666',
  fontSize: '50px',
  outline: 'none',
  '&[disabled]': {
    opacity: '.7',
  },
})
