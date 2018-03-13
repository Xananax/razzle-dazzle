export const fetchJSON = (url) =>
  fetch(url)
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        throw new Error(response.data)
      }
      return response.data
    })

export default fetchJSON