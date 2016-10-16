let instance = null

class AdapterRegistry {

  constructor() {
    if(!instance){
      instance = this
      this.registry = {}
    }
    return instance
  }

  valid(adapter) {
    if(typeof adapter === 'undefined' || !['get', 'all', 'save', 'filter', 'delete']
      .map((method) => typeof adapter[method] === 'function')
      .reduce((prev, current) => prev && current))
        throw new Error('Adapter has an invalid object signature')
    return true
  }

  exists(key) {
    if(typeof key !== 'string') throw new Error('Invalid key')
    return typeof this.registry[key] !== 'undefined'
  }

  push(key, adapter) {
    if(this.exists(key)) throw new Error(`There's already an adapter for ${key}`)
    if(this.valid(adapter))
      this.registry[key] = adapter
  }

  get(key) {
    if(!this.exists(key)) throw new Error (`There's no adapter registered for ${key}`)
    return key
  }

}

export default new AdapterRegistry()
