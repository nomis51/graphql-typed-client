'use strict'
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j]
    return r
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.chain = void 0
var newChain = function(path) {
  if (path === void 0) {
    path = []
  }
  var chain = function() {}
  chain.path = path
  return chain
}
var pathToRequest = function(path, executeFields) {
  var _a
  if (path.length === 0) return undefined
  var _b = path[0],
    field = _b[0],
    arg = _b[1],
    rest = path.slice(1)
  var nextFields = pathToRequest(rest, executeFields) || executeFields
  return (
    (_a = {}),
    (_a[field] = arg
      ? nextFields && typeof nextFields !== 'boolean' && typeof nextFields !== 'number'
        ? [arg, nextFields]
        : [arg]
      : nextFields
      ? nextFields
      : 1),
    _a
  )
}
var wrapInProxy = function(chain, onExecute) {
  return new Proxy(chain, {
    get: function(target, prop) {
      if (typeof prop !== 'string') throw new Error('property is not a string')
      if (prop === 'execute') {
        return function(fields, defaultValue) {
          return onExecute(
            target.path.map(function(i) {
              return i[0]
            }),
            pathToRequest(target.path, fields),
            defaultValue,
          )
        }
      } else {
        var newPath = __spreadArrays(target.path, [[prop]])
        return wrapInProxy(newChain(newPath), onExecute)
      }
    },
    apply: function(target, _, argArray) {
      var newPath = __spreadArrays(target.path.slice(0, -1), [[target.path[target.path.length - 1][0], argArray[0]]])
      return wrapInProxy(newChain(newPath), onExecute)
    },
  })
}
exports.chain = function(onExecute) {
  return wrapInProxy(newChain(), onExecute)
}
//# sourceMappingURL=chain.js.map
