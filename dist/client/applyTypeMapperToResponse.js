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
exports.applyTypeMapperToResponse = void 0
var getFieldFromPath_1 = require('./getFieldFromPath')
var applyRecursively = function(root, data, typeMapper, path) {
  if (data === null || data === undefined) return data
  else if (Array.isArray(data))
    return data.map(function(i) {
      return applyRecursively(root, i, typeMapper, path)
    })
  else if (typeof data === 'object')
    return Object.keys(data).reduce(function(r, k) {
      r[k] = applyRecursively(root, data[k], typeMapper, __spreadArrays(path, [k]))
      return r
    }, {})
  else {
    var field = getFieldFromPath_1.getFieldFromPath(root, path)
    var specificMapper = typeMapper[field.type.name]
    if (specificMapper !== undefined) return specificMapper.deserialize(data)
    else return data
  }
}
exports.applyTypeMapperToResponse = function(root, result, mapper) {
  return {
    data: applyRecursively(root, result.data, mapper, []),
    errors: result.errors,
  }
}
//# sourceMappingURL=applyTypeMapperToResponse.js.map
