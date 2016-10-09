var expect = require('chai').expect
  , parser = require('../parser.js')

describe('Charlie parser', function() {

  it('should fail when adding a feed with invalid URL', function() {
    expect(parser).to.throw(Error)
  })

  it('should fail when adding a non-feed url', function(done) {
    parser('http://google.com')
    .catch(function(error) {
      expect(error).to.exist
      done()
    })
  })

  it('should return podcast data', function(done) {
    parser('http://iradex.com.br/iradexpodcast/feed.xml')
    .then(function(data) {

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
