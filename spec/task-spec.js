import Task from '../src/task.js'
import {expect} from 'chai'

class SampleClass extends Task {

}

class ImplementedTask extends Task {
  run() {
    // Something
  }
  done() {
    // Job done!
  }
}

describe('Task', () => {

  it('should trigger an error when instantiating a new Task', () => {
    const fn = () => new Task()
    expect(fn).to.throw(Error)
    expect(fn).to.throw('Can not construct Task class')
  })

  it('should not trigger an error when instantiating a child of Task', () => {
    const fn = () => new SampleClass()
    expect(fn).to.not.throw(Error)
  })

  it('should trigger an error when calling any non-implemented method', () => {
    const implementation = new SampleClass()
    const methods = ['run', 'done']
    methods.forEach((method) => {
      let fn = () => implementation[method]()
      expect(fn).to.throw(Error)
      expect(fn).to.throw(`Method "${method}" not implemented`)
    })
  })

  it('should not trigger an error when calling implemented methods', () => {
    const implementation = new ImplementedTask()
    const methods = ['run', 'done']
    methods.forEach((method) => expect(implementation[method]).to.not.throw(Error))
  })

  it('should trigger an error by calling "error" method', () => {
    const implementation = new SampleClass()
    const fn = () => implementation.error(new Error('Sample error'))
    expect(fn).to.throw(Error)
    expect(fn).to.throw('Sample error')
  })

})
