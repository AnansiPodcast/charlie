import q from 'q'
import http from 'q-io/http'
import validator from 'validator'
import {default as podcastParser} from 'node-podcast-parser'

class Parser {

  static process(response) {

    const deferred = q.defer()
    podcastParser(response, (err, data) => {
      if (err) {
        deferred.reject(new Error(err))
      } else
        deferred.resolve(data)
    })
    return deferred.promise

  }

  static parse(url) {

    const deferred = q.defer()
    if(!validator.isURL(url)) {
      deferred.reject(new Error('Invalid Podcast URL'))
      return deferred.promise
    }

    http.read({
      url: url,
      method: 'GET'
    })
      .then(response => response.toString())
      .then(Parser.process)
      .then(deferred.resolve)
      .catch(deferred.reject)

    return deferred.promise
  }

}

export default Parser.parse
