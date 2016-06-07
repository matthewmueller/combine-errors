'use strict'

/**
 * Module Dependencies
 */

let Custom = require('custom-error-instance')
let uniq = require('lodash.uniqby')

/**
 * Use a custom error type
 */

let MultiError = Custom('MultiError')

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
  errors = uniq(errors, err => err.stack)
  if (errors.length === 1) return errors[0]
  let multierror = new MultiError({
    message: errors.map(err => err.message).join('; '),
    errors: errors.reduce((errs, err) => errs.concat(err.errors || err), []),
  })

  // lazily get/set the stack
  multierror.__defineGetter__('stack', function() {
    return errors.map(err => err.stack).join('\n\n')
  })

  multierror.__defineSetter__('stack', function(value) {
    return [value].concat(multierror.stack).join('\n\n')
  })

  return multierror
}
