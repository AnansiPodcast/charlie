var q = require('q')
  , http = require('q-io/http')
  , validator = require('validator')
  , podcastParser = require('node-podcast-parser')

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
