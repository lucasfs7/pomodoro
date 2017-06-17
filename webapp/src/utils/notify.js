import Notify from 'notifyjs'

if (Notify.needsPermission) Notify.requestPermission()

export default function notify(text = 'Your time is over!') {
  const notification = new Notify('Pomodoro', {
    body: text,
    timeout: false,
    closeOnClick: true,
  })

  notification.show()
}
