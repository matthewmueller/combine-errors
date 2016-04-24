'use strict'

/**
 * Module Dependencies
 */

var Custom = require('custom-error-instance')

/**
 * Remove the "Error:" on the front of message
 */

let MultiError = Custom('MultiError')

var rerror = /^Error:/

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
  if (errors.length === 1) return errors[0]

  let multierror = new MultiError({
    message: errors.map(err => err.message).join('; '),
    errors: errors.reduce((errs, err) => errs.concat(err.errors || err), []),
    stack: errors.map(err => err.stack).join('\n\n')
  })

  return multierror
}
