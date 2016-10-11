import q from 'q'
import http from 'q-io/http'
import validator from 'validator'
import {default as podcastParser} from 'node-podcast-parser'

var processFeed = function(response) {

  const deferred = q.defer()
  podcastParser(response, (err, data) => {
    if (err) {
      deferred.reject(new Error(err))
    } else
      deferred.resolve(data)
  })
  return deferred.promise

}

module.exports = function(url) {

  if(!validator.isURL(url))
    throw new Error('Invalid Podcast URL')

  return http.read({
    url: url,
    method: 'GET'
  }).then((response) => {
    return response.toString()
  }).then(processFeed)

};
