'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var createClient_1 = require('./client/createClient')
Object.defineProperty(exports, 'createClient', {
  enumerable: true,
  get: function() {
    return createClient_1.createClient
  },
})
var linkTypeMap_1 = require('./client/linkTypeMap')
Object.defineProperty(exports, 'linkTypeMap', {
  enumerable: true,
  get: function() {
    return linkTypeMap_1.linkTypeMap
  },
})
var rxjs_1 = require('rxjs')
Object.defineProperty(exports, 'Observable', {
  enumerable: true,
  get: function() {
    return rxjs_1.Observable
  },
})
var createClient_2 = require('./client/createClient')
Object.defineProperty(exports, 'ClientError', {
  enumerable: true,
  get: function() {
    return createClient_2.ClientError
  },
})
//# sourceMappingURL=index.js.map
