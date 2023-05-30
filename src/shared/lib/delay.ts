export default function getDelay(delay = 0) {
  return new Promise((response) => {
    setTimeout(response, delay)
  })
}
