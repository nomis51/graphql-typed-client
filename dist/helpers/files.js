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
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.readFilesAndConcat = exports.writeFileToPath = exports.readFileFromPath = exports.requireModuleFromPath = exports.ensurePath = void 0
var fs_1 = require('fs')
var mkdirp_1 = __importDefault(require('mkdirp'))
var path_1 = require('path')
var rimraf_1 = __importDefault(require('rimraf'))
var util_1 = require('util')
var readFileAsync = util_1.promisify(fs_1.readFile)
var writeFileAsync = util_1.promisify(fs_1.writeFile)
exports.ensurePath = function(path, clear) {
  if (clear === void 0) {
    clear = false
  }
  return __awaiter(void 0, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (!clear) return [3 /*break*/, 2]
          return [
            4 /*yield*/,
            new Promise(function(rs, rj) {
              rimraf_1.default(path_1.resolve.apply(void 0, path), function(err) {
                if (err) rj(err)
                else rs()
              })
            }),
          ]
        case 1:
          _a.sent()
          _a.label = 2
        case 2:
          return [
            4 /*yield*/,
            new Promise(function(rs, rj) {
              mkdirp_1.default(path_1.resolve.apply(void 0, path), function(err) {
                if (err) rj(err)
                else rs()
              })
            }),
          ]
        case 3:
          _a.sent()
          return [2 /*return*/]
      }
    })
  })
}
exports.requireModuleFromPath = function(path) {
  return require(path_1.resolve.apply(void 0, path))
}
exports.readFileFromPath = function(path) {
  return readFileAsync(path_1.resolve.apply(void 0, path)).then(function(b) {
    return b.toString()
  })
}
exports.writeFileToPath = function(path, content) {
  return writeFileAsync(path_1.resolve.apply(void 0, path), content)
}
exports.readFilesAndConcat = function(files) {
  return Promise.all(
    files.map(function(file) {
      return exports.readFileFromPath([file])
    }),
  ).then(function(contents) {
    return contents.join('\n')
  })
}
//# sourceMappingURL=files.js.map
