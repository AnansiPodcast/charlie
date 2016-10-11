import Promise from 'bluebird'
import requestAsync from 'request-promise'
import validator from 'validator'
import {default as podcastParser} from 'node-podcast-parser'

class Parser {

  static process(xml) {
    return Promise.promisify(podcastParser)(xml)
  }

  static parse(url) {

    return new Promise((res, rej) => {
      if (!validator.isURL(url)) throw new Error('Invalid Podcast URL')
      requestAsync(url)
        .then(Parser.process)
        .then(res)
        .catch(rej)
    })
  }

}

export default Parser.parse
