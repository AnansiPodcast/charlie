import Adapter from '../src/adapter.js'
import {expect} from 'chai'

class SampleAdapter extends Adapter {

}

class ImplementedAdapter extends Adapter {
  get(id) {
    // Gets nothing
  }
  all() {
    // Also nothing ¯\_(ツ)_/¯
  }
}

describe('Adapter', () => {

  it('should trigger an error when instantiating a new Adapter', () => {
    const fn = () => new Adapter()
    expect(fn).to.throw(Error)
    expect(fn).to.throw('Can not construct Adapter class')
  })

  it('should not trigger an error when instantiating a child of Adapter', () => {
    const fn = () => new SampleAdapter()
    expect(fn).to.not.throw(Error)
  })

  it('should trigger an error when calling any non-implemented method', () => {
    const implementation = new SampleAdapter()
    const methods = ['get', 'all', 'filter', 'save', 'delete']
    methods.forEach((method) => {
      let fn = () => implementation[method]()
      expect(fn).to.throw(Error)
      expect(fn).to.throw(`Method "${method}" not implemented`)
    })
  })

  it('should not trigger an error when calling implemented methods', () => {
    const implementation = new ImplementedAdapter()
    const methods = ['get', 'all']
    methods.forEach((method) => expect(implementation[method]).to.not.throw(Error))
  })

})
