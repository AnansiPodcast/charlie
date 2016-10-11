import Promise from 'bluebird'
import {expect} from 'chai'
import Queue from '../src/queue.js'
import Task from '../src/task.js'

class SampleTask extends Task {

  constructor(time) {
    super()
    this.time = time
  }

  run() {
    return new Promise((res, rej) => {
      setTimeout(() => res(), this.time)
    })
  }

  done() {
    // Job done!
  }

}

describe('Queue', () => {

  it('should add a job to the queue', (done) => {
    expect(Queue.tasks.length).to.equal(0)
    Queue.push(new SampleTask(100))
    expect(Queue.tasks.length).to.equal(1)
    setTimeout(done, 200)
  })

  it('should run a task added to the queue', (done) => {
    expect(Queue.running).to.be.false
    Queue.push(new SampleTask(0))
    expect(Queue.running).to.be.true
    setTimeout(() => {
      expect(Queue.tasks.length).to.equal(0)
      expect(Queue.running).to.be.false
      done()
    }, 100)
  })

  it('should add non-specified tasks to "generic" queue', () => {
    Queue.push(new SampleTask(0))
    expect(Queue.pendingCounter.generic).to.not.be.undefined
    expect(Queue.pendingCounter.generic).to.equal(1)
    expect(Queue.running).to.be.true
    setTimeout(() => {
      expect(Queue.pendingCounter.generic).to.equal(0)
      expect(Queue.running).to.be.false
      done()
    }, 100)
  })

  it('should add specific tasks to specific queue', () => {
    Queue.pushTo('sample', new SampleTask(100))
    expect(Queue.pendingCounter.sample).to.not.be.undefined
    expect(Queue.pendingCounter.sample).to.equal(1)
    expect(Queue.running).to.be.true
    setTimeout(() => {
      expect(Queue.pendingCounter.sample).to.equal(0)
      expect(Queue.running).to.be.false
    }, 150)
  })

})
