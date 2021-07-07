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
exports.requestToGql = void 0
var getFieldFromPath_1 = require('./getFieldFromPath')
var applyTypeMapperToVariable_1 = require('./applyTypeMapperToVariable')
var parseRequest = function(request, ctx, path) {
  if (Array.isArray(request)) {
    var args_1 = request[0],
      fields = request[1]
    var argNames = Object.keys(args_1)
    if (argNames.length === 0) {
      return parseRequest(fields, ctx, path)
    }
    var field_1 = getFieldFromPath_1.getFieldFromPath(ctx.root, path)
    return (
      '(' +
      argNames.map(function(argName) {
        ctx.varCounter++
        var varName = 'v' + ctx.varCounter
        var typing = field_1.args && field_1.args[argName]
        if (!typing) {
          throw new Error('no typing defined for argument `' + argName + '` in path `' + path.join('.') + '`')
        }
        ctx.variables[varName] = {
          value: args_1[argName],
          typing: typing,
        }
        return argName + ':$' + varName
      }) +
      ')' +
      parseRequest(fields, ctx, path)
    )
  } else if (typeof request === 'object') {
    var fields_1 = request
    var fieldNames = Object.keys(fields_1)
    if (fieldNames.length === 0) {
      throw new Error('field selection should not be empty')
    }
    var type = path.length > 0 ? getFieldFromPath_1.getFieldFromPath(ctx.root, path).type : ctx.root
    var scalarFields = type.scalar
    var scalarFieldsFragment = void 0
    if (~fieldNames.indexOf('__scalar')) {
      if (!scalarFields) {
        throw new Error('type ' + type.name + ' has no scalar fields')
      }
      ctx.fragmentCounter++
      scalarFieldsFragment = 'f' + ctx.fragmentCounter
      ctx.fragments.push('fragment ' + scalarFieldsFragment + ' on ' + type.name + '{' + scalarFields.join(',') + '}')
    }
    return (
      '{' +
      fieldNames
        .filter(function(f) {
          return f !== '__scalar'
        })
        .map(function(f) {
          var parsed = parseRequest(fields_1[f], ctx, __spreadArrays(path, [f]))
          if (f.startsWith('on_')) {
            ctx.fragmentCounter++
            var implementationFragment = 'f' + ctx.fragmentCounter
            var typeMatch = f.match(/^on_(.+)/)
            if (!typeMatch || !typeMatch[1]) throw new Error('match failed')
            ctx.fragments.push('fragment ' + implementationFragment + ' on ' + typeMatch[1] + parsed)
            return '...' + implementationFragment
          } else {
            return '' + f + parsed
          }
        })
        .concat(scalarFieldsFragment ? ['...' + scalarFieldsFragment] : [])
        .join(',') +
      '}'
    )
  } else {
    return ''
  }
}
exports.requestToGql = function(operation, root, fields, typeMapper) {
  var ctx = { root: root, varCounter: 0, variables: {}, fragmentCounter: 0, fragments: [] }
  var result = parseRequest(fields, ctx, [])
  var varNames = Object.keys(ctx.variables)
  var varsString =
    varNames.length > 0
      ? '(' +
        varNames.map(function(v) {
          return '$' + v + ':' + ctx.variables[v].typing[0]
        }) +
        ')'
      : ''
  return {
    query: __spreadArrays(['' + operation + varsString + result], ctx.fragments).join(','),
    variables: Object.keys(ctx.variables).reduce(function(r, v) {
      r[v] = applyTypeMapperToVariable_1.applyTypeMapperToVariable(
        ctx.variables[v].value,
        ctx.variables[v].typing[1],
        typeMapper,
      )
      return r
    }, {}),
  }
}
//# sourceMappingURL=requestToGql.js.map
