import {expect} from 'chai'
import parser from '../src/parser.js'

describe('Charlie parser', () => {

  it('should fail when adding a feed with invalid URL', (done) => {
    parser()
      .catch(e => {
        expect(e).to.be.a('error')
        done()
      })
  })

  it('should fail when adding a non-feed url', (done) => {
    parser('http://google.com')
    .catch((error) => {
      expect(error).to.exist
      done()
    })
  })

  it('should return podcast data', (done) => {
    parser('http://iradex.com.br/iradexpodcast/feed.xml')
    .then((data) => {

      // Podcast data
      expect(data).to.have.property('title')
      expect(data).to.have.property('description')
      expect(data).to.have.property('episodes')

      // Episodes data
      var episode = data.episodes[0]
      expect(episode).to.have.property('title')
      expect(episode).to.have.property('description')
      expect(episode).to.have.property('image')
      expect(episode).to.have.property('guid')

      done()
    })
  })

})
