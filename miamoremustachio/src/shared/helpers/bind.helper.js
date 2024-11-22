class Binder {
  getAllMethods(instance) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
    
    return methods.filter(key => instance[key] instanceof Function && key !== 'constructor');
  }

  bind(instance) {
    this.getAllMethods(instance)
      .forEach(mtd => {
        instance[mtd] = instance[mtd].bind(instance);
      });
  }
}


module.exports = Binder;
