'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var render_1 = require('../../testHelpers/render')
var renderTyping_1 = require('./renderTyping')
var schema
var testCase = function(field, expected, undefinableValues, undefinableFields) {
  var fields = schema.getType('Object').getFields()
  var actual = renderTyping_1.renderTyping(fields[field].type, undefinableValues, undefinableFields)
  expect(actual).toBe(expected)
}
describe('renderTyping', function() {
  beforeAll(function() {
    return __awaiter(void 0, void 0, void 0, function() {
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              render_1.toClientSchema(
                /* GraphQL */ '\n      type Object {\n        value: Int!\n        maybeValue: Int\n        valueList: [Int!]!\n        maybeValueList: [Int]!\n        valueMaybeList: [Int!]\n        maybeValueMaybeList: [Int]\n        nested: [[[Int!]!]!]!\n        maybeNested: [[[Int]]]\n      }\n\n      type Query {\n        _: Boolean\n      }\n    ',
              ),
            ]
          case 1:
            schema = _a.sent()
            return [2 /*return*/]
        }
      })
    })
  })
  test('nullable', function() {
    testCase('value', ':Int', false, false)
    testCase('maybeValue', ':(Int|null)', false, false)
    testCase('valueList', ':Int[]', false, false)
    testCase('maybeValueList', ':(Int|null)[]', false, false)
    testCase('valueMaybeList', ':(Int[]|null)', false, false)
    testCase('maybeValueMaybeList', ':((Int|null)[]|null)', false, false)
    testCase('nested', ':Int[][][]', false, false)
    testCase('maybeNested', ':((((Int|null)[]|null)[]|null)[]|null)', false, false)
  })
  test('undefinable values', function() {
    testCase('value', ':Int', true, false)
    testCase('maybeValue', ':(Int|undefined)', true, false)
    testCase('valueList', ':Int[]', true, false)
    testCase('maybeValueList', ':(Int|undefined)[]', true, false)
    testCase('valueMaybeList', ':(Int[]|undefined)', true, false)
    testCase('maybeValueMaybeList', ':((Int|undefined)[]|undefined)', true, false)
    testCase('nested', ':Int[][][]', true, false)
    testCase('maybeNested', ':((((Int|undefined)[]|undefined)[]|undefined)[]|undefined)', true, false)
  })
  test('undefinable fields', function() {
    testCase('value', ':Int', false, true)
    testCase('maybeValue', '?:(Int|null)', false, true)
    testCase('valueList', ':Int[]', false, true)
    testCase('maybeValueList', ':(Int|null)[]', false, true)
    testCase('valueMaybeList', '?:(Int[]|null)', false, true)
    testCase('maybeValueMaybeList', '?:((Int|null)[]|null)', false, true)
    testCase('nested', ':Int[][][]', false, true)
    testCase('maybeNested', '?:((((Int|null)[]|null)[]|null)[]|null)', false, true)
  })
  test('undefinable fields and values', function() {
    testCase('value', ':Int', true, true)
    testCase('maybeValue', '?:Int', true, true)
    testCase('valueList', ':Int[]', true, true)
    testCase('maybeValueList', ':(Int|undefined)[]', true, true)
    testCase('valueMaybeList', '?:Int[]', true, true)
    testCase('maybeValueMaybeList', '?:(Int|undefined)[]', true, true)
    testCase('nested', ':Int[][][]', true, true)
    testCase('maybeNested', '?:(((Int|undefined)[]|undefined)[]|undefined)[]', true, true)
  })
})
//# sourceMappingURL=renderTyping.test.js.map
