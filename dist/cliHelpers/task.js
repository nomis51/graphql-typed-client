'use strict'
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j]
    return r
  }
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.task = void 0
var listr_1 = __importDefault(require('listr'))
var clientTasks_1 = require('./clientTasks')
var schemaTask_1 = require('./schemaTask')
exports.task = function(config) {
  if (!config.output) throw new Error('`output` must be defined in the config')
  var output = config.output
  return {
    title: 'generating the client in `' + output + '`',
    task: function() {
      return new listr_1.default(__spreadArrays([schemaTask_1.schemaTask(config)], clientTasks_1.clientTasks(config)))
    },
  }
}
//# sourceMappingURL=task.js.map
