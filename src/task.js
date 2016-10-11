class Task {

  constructor() {
    if (this.constructor === Task) {
      throw new Error("Can not construct Task class");
    }
  }

  run() {
    throw new Error('Method "run" not implemented')
  }

  done() {
    throw new Error('Method "done" not implemented')
  }

  error(err) {
    throw new Error(err.message)
  }

}

export default Task
