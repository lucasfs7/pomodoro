import Notify from 'notifyjs'
import beep from 'utils/beep'

if (Notify.needsPermission) Notify.requestPermission()

export default function notify(text = 'Your time is over!') {
  const notification = new Notify('Pomodoro', {
    body: text,
    timeout: false,
    closeOnClick: true,
    notifyShow() {
      beep.play()
    },
    notifyClose() {
      beep.pause()
    },
  })

  notification.show()
}
