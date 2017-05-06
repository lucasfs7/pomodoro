const time = (number) => ({
  seconds: number * 1000,
  minutes: number * 60 * 1000,
  hours: number * 60 * 60 * 1000
})

export default time
