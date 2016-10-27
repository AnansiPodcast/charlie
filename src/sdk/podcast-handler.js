import uuid from 'uuid'
import AdapterRegistry from './adapter-registry.js'
import Parser from '../parser.js'
import EpisodeHandler from './episode-handler.js'

class PodcastHandler {

  constructor() {
    this.adapter = AdapterRegistry.get('podcast')
    this.episodeHandler = new EpisodeHandler()
  }

  add(url) {

    return Parser(url)
    .then((podcast) => {

      const existent = this.adapter.filter({url: url})
      if(existent.length) throw new Error('Podcast already exists')

      podcast.id = uuid()
      podcast.url = url

      return podcast

    })
    .then(this.episodeHandler.batch)
    .then(this.adapter.add)

  }

}

export default PodcastHandler
