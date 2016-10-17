import {expect} from 'chai'
import AdapterRegistry from '../src/sdk/adapter-registry.js'

class MyAdapter {
  get(){}
  all(){}
  save(){}
  filter(){}
  delete(){}
}

describe('AdapterRegistry', () => {

  it('should give an error by passing no parameters', () => {
    const fn = () => AdapterRegistry.push()
    expect(fn).to.throw(Error)
    expect(fn).to.throw('Invalid key')
  })

  it('should give an error by passing an invalid adapter', () => {
    const fn = () => AdapterRegistry.push('podcast', {})
    expect(fn).to.throw(Error)
    expect(fn).to.throw('Adapter has an invalid object signature')
    expect(AdapterRegistry.registry.podcast).to.be.undefined
  })

  it('should not give an error by passing a valid adapter', () => {
    const instance = new MyAdapter()
    const fn = () => AdapterRegistry.push('podcast', instance)
    expect(fn).to.not.throw(Error)
    expect(AdapterRegistry.registry.podcast).to.not.be.undefined
  })

  it('should give an error by adding more than adapter for same key', () => {
    const instance = new MyAdapter()
    const fn = () => AdapterRegistry.push('podcast', instance)
    expect(fn).to.throw(`There's already an adapter for podcast`)
    expect(AdapterRegistry.registry.podcast).to.not.be.undefined
  })

  it('should not give an error by getting an existent adapter', () => {
    const fn = () => AdapterRegistry.get('podcast')
    expect(fn).to.not.throw(Error)
    expect(AdapterRegistry.get('podcast')).to.exist
  })

  it('should give an error by getting an absent adapter', () => {
    const fn = () => AdapterRegistry.get('episode')
    expect(fn).to.throw(Error)
    expect(fn).to.throw(`There's no adapter registered for episode`)
  })

})
