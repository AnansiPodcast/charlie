class Adapter {

  constructor() {
    if (this.constructor === Adapter)
      throw new TypeError("Can not construct Adapter class")
  }

  get() {
    throw new Error('Method "get" not implemented')
  }

  all() {
    throw new Error('Method "all" not implemented')
  }

  filter() {
    throw new Error('Method "filter" not implemented')
  }

  save() {
    throw new Error('Method "save" not implemented')
  }

  delete() {
    throw new Error('Method "delete" not implemented')
  }

}

export default Adapter
