'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.renderRequestTypes = void 0
var graphql_1 = require('graphql')
var excludedTypes_1 = require('../common/excludedTypes')
var inputObjectType_1 = require('./inputObjectType')
var objectType_1 = require('./objectType')
var unionType_1 = require('./unionType')
exports.renderRequestTypes = function(schema, ctx) {
  for (var name_1 in schema.getTypeMap()) {
    if (excludedTypes_1.excludedTypes.includes(name_1)) continue
    var type = schema.getTypeMap()[name_1]
    if (graphql_1.isObjectType(type) || graphql_1.isInterfaceType(type)) objectType_1.objectType(type, ctx)
    if (graphql_1.isInputObjectType(type)) inputObjectType_1.inputObjectType(type, ctx)
    if (graphql_1.isUnionType(type)) unionType_1.unionType(type, ctx)
  }
}
//# sourceMappingURL=renderRequestTypes.js.map
