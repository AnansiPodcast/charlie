import merge from 'merge'
import AdapterRegistry from './adapter-registry.js'

class EpisodeHandler {

  constructor() {
    this.adapter = AdapterRegistry.get('episode')
  }

  batch(podcast) {

    let selected = []
    const existent = this.adapter.filter({podcastId: podcast.id}).map((ep) => ep.guid)

    items
    .filter(i => existents.indexOf(i.guid) === -1)
    .forEach((item) => {
      let data = {
        podcastId: podcast.id,
        publishedTime: new Date(item.published).getTime(),
        downloadedCover: false
      }
      selected.push(merge(item, data))
    })

    if(selected.length === 0) return
    Logger.info(`Adding ${selected.length} new episodes to ${podcastId}`)
    Episode.push(...selected)

  }

}
