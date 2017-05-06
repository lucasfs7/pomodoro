export const addZero = (n) => n > 9 ? n : `0${ n }`

export const time = (number) => ({
  seconds: number * 1000,
  minutes: number * 60 * 1000,
  hours: number * 60 * 60 * 1000,
})

export const fullTime = (millisec) => {
  const seconds = (millisec / 1000).toFixed(0)
  const minutes = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)

  if (minutes > 59) {
    const h = Math.floor(minutes / 60)
    const m = minutes - (h * 60)
    return `${ addZero(h) }:${ addZero(m) }:${ addZero(s) }`
  }

  return `${ addZero(minutes) }:${ addZero(s) }`
}
