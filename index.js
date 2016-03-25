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

  let multierror = new MultiError(errors.map(err => err.message).join('; '))
  multierror.errors = errors.reduce((errs, err) => errs.concat(err.errors || err), [])
  multierror.length = errors.length

  // overwrite the stack to show both errors in full
  multierror.__defineSetter__('stack', stack => stack)
  multierror.__defineGetter__('stack', function() {
    return errors.map(function (err) {
      return err.stack
    }).join('\n\n')
  })

  return multierror
}
