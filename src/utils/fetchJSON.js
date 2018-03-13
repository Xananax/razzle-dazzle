/**
 * This function uses `fetch`, present in all modern browsers,
 * to load a url, transform the json response to a javascript object.
 * This object is assumed to be of the form:
 * 
 * ```js
 * {data:anything}
 * // or
 * {error:true, data:string}
 * ```
 * Then, if the javacript object has a "error" property, then fetch
 * will throw an error with the data message.
 * If not, it will return the data itself
 * @param {string} url 
 */
export const fetchJSON = (url) =>
  fetch(url)
    .then(response => {
      const status = response.status
      return response.json()
        .then(json => {
          // all ok
          if (status <= 400 && !json.error) {
            return json.data
          }
          // not ok, and
          // an error message was provided
          if (json && ('data' in json) && (typeof json.data === 'string')) {
            throw new Error(json.data)
          }
          // not ok, and
          // no error message was provided
          if (status >= 500) {
            throw new Error('generic error')
          }
          if (status >= 400) {
            throw new Error(`url not found: '${url}'`)
          }
          throw new Error(`no error message and status '${status}' unknown`)

        })
        .catch(err => { throw err })
    })
    .catch(err => { throw err })

export default fetchJSON