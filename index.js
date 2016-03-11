/**
 * Export `Error`
 */

module.exports = error

/**
 * Initialize an error
 */

function error (errors) {
  if (!(this instanceof error)) return new error(errors)
  errors = Array.isArray(errors) ? errors : [ errors ]
  for (var i = 0; i < errors.length; i++) this[i] = errors[i]
  this.length = errors.length
  this.errors = errors
}

/**
 * Extend `Error`
 */

error.prototype = Object.create(Error.prototype)

/**
 * Lazily define stack
 */

error.prototype.__defineGetter__('stack', function() {
  return this.errors.map(function (err) {
    return err.stack
  }).join('\n\n')
})

/**
 * Lazily define message
 */

error.prototype.__defineGetter__('message', function() {
  return this.errors.join(', ')
})

/**
 * toString
 */

error.prototype.toString = function () {
  return this.errors.join(', ')
}

/*
 * Make error array-like
 */

error.prototype.splice = Array.prototype.splice
error.prototype.length = 0
