var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/node-fetch/lib/index.js
var require_lib = __commonJS({
  "node_modules/node-fetch/lib/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var Stream = _interopDefault(require("stream"));
    var http = _interopDefault(require("http"));
    var Url = _interopDefault(require("url"));
    var https = _interopDefault(require("https"));
    var zlib = _interopDefault(require("zlib"));
    var Readable = Stream.Readable;
    var BUFFER = Symbol("buffer");
    var TYPE = Symbol("type");
    var Blob = class {
      constructor() {
        this[TYPE] = "";
        const blobParts = arguments[0];
        const options = arguments[1];
        const buffers = [];
        let size = 0;
        if (blobParts) {
          const a = blobParts;
          const length = Number(a.length);
          for (let i = 0; i < length; i++) {
            const element = a[i];
            let buffer;
            if (element instanceof Buffer) {
              buffer = element;
            } else if (ArrayBuffer.isView(element)) {
              buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
            } else if (element instanceof ArrayBuffer) {
              buffer = Buffer.from(element);
            } else if (element instanceof Blob) {
              buffer = element[BUFFER];
            } else {
              buffer = Buffer.from(typeof element === "string" ? element : String(element));
            }
            size += buffer.length;
            buffers.push(buffer);
          }
        }
        this[BUFFER] = Buffer.concat(buffers);
        let type = options && options.type !== void 0 && String(options.type).toLowerCase();
        if (type && !/[^\u0020-\u007E]/.test(type)) {
          this[TYPE] = type;
        }
      }
      get size() {
        return this[BUFFER].length;
      }
      get type() {
        return this[TYPE];
      }
      text() {
        return Promise.resolve(this[BUFFER].toString());
      }
      arrayBuffer() {
        const buf = this[BUFFER];
        const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        return Promise.resolve(ab);
      }
      stream() {
        const readable = new Readable();
        readable._read = function() {
        };
        readable.push(this[BUFFER]);
        readable.push(null);
        return readable;
      }
      toString() {
        return "[object Blob]";
      }
      slice() {
        const size = this.size;
        const start = arguments[0];
        const end = arguments[1];
        let relativeStart, relativeEnd;
        if (start === void 0) {
          relativeStart = 0;
        } else if (start < 0) {
          relativeStart = Math.max(size + start, 0);
        } else {
          relativeStart = Math.min(start, size);
        }
        if (end === void 0) {
          relativeEnd = size;
        } else if (end < 0) {
          relativeEnd = Math.max(size + end, 0);
        } else {
          relativeEnd = Math.min(end, size);
        }
        const span = Math.max(relativeEnd - relativeStart, 0);
        const buffer = this[BUFFER];
        const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
        const blob = new Blob([], { type: arguments[2] });
        blob[BUFFER] = slicedBuffer;
        return blob;
      }
    };
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
      value: "Blob",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function FetchError(message, type, systemError) {
      Error.call(this, message);
      this.message = message;
      this.type = type;
      if (systemError) {
        this.code = this.errno = systemError.code;
      }
      Error.captureStackTrace(this, this.constructor);
    }
    FetchError.prototype = Object.create(Error.prototype);
    FetchError.prototype.constructor = FetchError;
    FetchError.prototype.name = "FetchError";
    var convert;
    try {
      convert = require("encoding").convert;
    } catch (e) {
    }
    var INTERNALS = Symbol("Body internals");
    var PassThrough = Stream.PassThrough;
    function Body(body) {
      var _this = this;
      var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$size = _ref.size;
      let size = _ref$size === void 0 ? 0 : _ref$size;
      var _ref$timeout = _ref.timeout;
      let timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;
      if (body == null) {
        body = null;
      } else if (isURLSearchParams(body)) {
        body = Buffer.from(body.toString());
      } else if (isBlob(body))
        ;
      else if (Buffer.isBuffer(body))
        ;
      else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        body = Buffer.from(body);
      } else if (ArrayBuffer.isView(body)) {
        body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
      } else if (body instanceof Stream)
        ;
      else {
        body = Buffer.from(String(body));
      }
      this[INTERNALS] = {
        body,
        disturbed: false,
        error: null
      };
      this.size = size;
      this.timeout = timeout;
      if (body instanceof Stream) {
        body.on("error", function(err) {
          const error = err.name === "AbortError" ? err : new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, "system", err);
          _this[INTERNALS].error = error;
        });
      }
    }
    Body.prototype = {
      get body() {
        return this[INTERNALS].body;
      },
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      },
      arrayBuffer() {
        return consumeBody.call(this).then(function(buf) {
          return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        });
      },
      blob() {
        let ct = this.headers && this.headers.get("content-type") || "";
        return consumeBody.call(this).then(function(buf) {
          return Object.assign(new Blob([], {
            type: ct.toLowerCase()
          }), {
            [BUFFER]: buf
          });
        });
      },
      json() {
        var _this2 = this;
        return consumeBody.call(this).then(function(buffer) {
          try {
            return JSON.parse(buffer.toString());
          } catch (err) {
            return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, "invalid-json"));
          }
        });
      },
      text() {
        return consumeBody.call(this).then(function(buffer) {
          return buffer.toString();
        });
      },
      buffer() {
        return consumeBody.call(this);
      },
      textConverted() {
        var _this3 = this;
        return consumeBody.call(this).then(function(buffer) {
          return convertBody(buffer, _this3.headers);
        });
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    Body.mixIn = function(proto) {
      for (const name of Object.getOwnPropertyNames(Body.prototype)) {
        if (!(name in proto)) {
          const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
          Object.defineProperty(proto, name, desc);
        }
      }
    };
    function consumeBody() {
      var _this4 = this;
      if (this[INTERNALS].disturbed) {
        return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
      }
      this[INTERNALS].disturbed = true;
      if (this[INTERNALS].error) {
        return Body.Promise.reject(this[INTERNALS].error);
      }
      let body = this.body;
      if (body === null) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      if (isBlob(body)) {
        body = body.stream();
      }
      if (Buffer.isBuffer(body)) {
        return Body.Promise.resolve(body);
      }
      if (!(body instanceof Stream)) {
        return Body.Promise.resolve(Buffer.alloc(0));
      }
      let accum = [];
      let accumBytes = 0;
      let abort = false;
      return new Body.Promise(function(resolve, reject) {
        let resTimeout;
        if (_this4.timeout) {
          resTimeout = setTimeout(function() {
            abort = true;
            reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, "body-timeout"));
          }, _this4.timeout);
        }
        body.on("error", function(err) {
          if (err.name === "AbortError") {
            abort = true;
            reject(err);
          } else {
            reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, "system", err));
          }
        });
        body.on("data", function(chunk) {
          if (abort || chunk === null) {
            return;
          }
          if (_this4.size && accumBytes + chunk.length > _this4.size) {
            abort = true;
            reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, "max-size"));
            return;
          }
          accumBytes += chunk.length;
          accum.push(chunk);
        });
        body.on("end", function() {
          if (abort) {
            return;
          }
          clearTimeout(resTimeout);
          try {
            resolve(Buffer.concat(accum, accumBytes));
          } catch (err) {
            reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, "system", err));
          }
        });
      });
    }
    function convertBody(buffer, headers) {
      if (typeof convert !== "function") {
        throw new Error("The package `encoding` must be installed to use the textConverted() function");
      }
      const ct = headers.get("content-type");
      let charset = "utf-8";
      let res, str;
      if (ct) {
        res = /charset=([^;]*)/i.exec(ct);
      }
      str = buffer.slice(0, 1024).toString();
      if (!res && str) {
        res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
      }
      if (!res && str) {
        res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);
        if (!res) {
          res = /<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(str);
          if (res) {
            res.pop();
          }
        }
        if (res) {
          res = /charset=(.*)/i.exec(res.pop());
        }
      }
      if (!res && str) {
        res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
      }
      if (res) {
        charset = res.pop();
        if (charset === "gb2312" || charset === "gbk") {
          charset = "gb18030";
        }
      }
      return convert(buffer, "UTF-8", charset).toString();
    }
    function isURLSearchParams(obj) {
      if (typeof obj !== "object" || typeof obj.append !== "function" || typeof obj.delete !== "function" || typeof obj.get !== "function" || typeof obj.getAll !== "function" || typeof obj.has !== "function" || typeof obj.set !== "function") {
        return false;
      }
      return obj.constructor.name === "URLSearchParams" || Object.prototype.toString.call(obj) === "[object URLSearchParams]" || typeof obj.sort === "function";
    }
    function isBlob(obj) {
      return typeof obj === "object" && typeof obj.arrayBuffer === "function" && typeof obj.type === "string" && typeof obj.stream === "function" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && /^(Blob|File)$/.test(obj.constructor.name) && /^(Blob|File)$/.test(obj[Symbol.toStringTag]);
    }
    function clone(instance) {
      let p1, p2;
      let body = instance.body;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof Stream && typeof body.getBoundary !== "function") {
        p1 = new PassThrough();
        p2 = new PassThrough();
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].body = p1;
        body = p2;
      }
      return body;
    }
    function extractContentType(body) {
      if (body === null) {
        return null;
      } else if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      } else if (isURLSearchParams(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      } else if (isBlob(body)) {
        return body.type || null;
      } else if (Buffer.isBuffer(body)) {
        return null;
      } else if (Object.prototype.toString.call(body) === "[object ArrayBuffer]") {
        return null;
      } else if (ArrayBuffer.isView(body)) {
        return null;
      } else if (typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${body.getBoundary()}`;
      } else if (body instanceof Stream) {
        return null;
      } else {
        return "text/plain;charset=UTF-8";
      }
    }
    function getTotalBytes(instance) {
      const body = instance.body;
      if (body === null) {
        return 0;
      } else if (isBlob(body)) {
        return body.size;
      } else if (Buffer.isBuffer(body)) {
        return body.length;
      } else if (body && typeof body.getLengthSync === "function") {
        if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || body.hasKnownLength && body.hasKnownLength()) {
          return body.getLengthSync();
        }
        return null;
      } else {
        return null;
      }
    }
    function writeToStream(dest, instance) {
      const body = instance.body;
      if (body === null) {
        dest.end();
      } else if (isBlob(body)) {
        body.stream().pipe(dest);
      } else if (Buffer.isBuffer(body)) {
        dest.write(body);
        dest.end();
      } else {
        body.pipe(dest);
      }
    }
    Body.Promise = global.Promise;
    var invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
    var invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
    function validateName(name) {
      name = `${name}`;
      if (invalidTokenRegex.test(name) || name === "") {
        throw new TypeError(`${name} is not a legal HTTP header name`);
      }
    }
    function validateValue(value) {
      value = `${value}`;
      if (invalidHeaderCharRegex.test(value)) {
        throw new TypeError(`${value} is not a legal HTTP header value`);
      }
    }
    function find(map, name) {
      name = name.toLowerCase();
      for (const key in map) {
        if (key.toLowerCase() === name) {
          return key;
        }
      }
      return void 0;
    }
    var MAP = Symbol("map");
    var Headers = class {
      constructor() {
        let init = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
        this[MAP] = Object.create(null);
        if (init instanceof Headers) {
          const rawHeaders = init.raw();
          const headerNames = Object.keys(rawHeaders);
          for (const headerName of headerNames) {
            for (const value of rawHeaders[headerName]) {
              this.append(headerName, value);
            }
          }
          return;
        }
        if (init == null)
          ;
        else if (typeof init === "object") {
          const method = init[Symbol.iterator];
          if (method != null) {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            const pairs = [];
            for (const pair of init) {
              if (typeof pair !== "object" || typeof pair[Symbol.iterator] !== "function") {
                throw new TypeError("Each header pair must be iterable");
              }
              pairs.push(Array.from(pair));
            }
            for (const pair of pairs) {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              this.append(pair[0], pair[1]);
            }
          } else {
            for (const key of Object.keys(init)) {
              const value = init[key];
              this.append(key, value);
            }
          }
        } else {
          throw new TypeError("Provided initializer must be an object");
        }
      }
      get(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key === void 0) {
          return null;
        }
        return this[MAP][key].join(", ");
      }
      forEach(callback) {
        let thisArg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : void 0;
        let pairs = getHeaders(this);
        let i = 0;
        while (i < pairs.length) {
          var _pairs$i = pairs[i];
          const name = _pairs$i[0], value = _pairs$i[1];
          callback.call(thisArg, value, name, this);
          pairs = getHeaders(this);
          i++;
        }
      }
      set(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        this[MAP][key !== void 0 ? key : name] = [value];
      }
      append(name, value) {
        name = `${name}`;
        value = `${value}`;
        validateName(name);
        validateValue(value);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          this[MAP][key].push(value);
        } else {
          this[MAP][name] = [value];
        }
      }
      has(name) {
        name = `${name}`;
        validateName(name);
        return find(this[MAP], name) !== void 0;
      }
      delete(name) {
        name = `${name}`;
        validateName(name);
        const key = find(this[MAP], name);
        if (key !== void 0) {
          delete this[MAP][key];
        }
      }
      raw() {
        return this[MAP];
      }
      keys() {
        return createHeadersIterator(this, "key");
      }
      values() {
        return createHeadersIterator(this, "value");
      }
      [Symbol.iterator]() {
        return createHeadersIterator(this, "key+value");
      }
    };
    Headers.prototype.entries = Headers.prototype[Symbol.iterator];
    Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
      value: "Headers",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Headers.prototype, {
      get: { enumerable: true },
      forEach: { enumerable: true },
      set: { enumerable: true },
      append: { enumerable: true },
      has: { enumerable: true },
      delete: { enumerable: true },
      keys: { enumerable: true },
      values: { enumerable: true },
      entries: { enumerable: true }
    });
    function getHeaders(headers) {
      let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "key+value";
      const keys = Object.keys(headers[MAP]).sort();
      return keys.map(kind === "key" ? function(k) {
        return k.toLowerCase();
      } : kind === "value" ? function(k) {
        return headers[MAP][k].join(", ");
      } : function(k) {
        return [k.toLowerCase(), headers[MAP][k].join(", ")];
      });
    }
    var INTERNAL = Symbol("internal");
    function createHeadersIterator(target, kind) {
      const iterator = Object.create(HeadersIteratorPrototype);
      iterator[INTERNAL] = {
        target,
        kind,
        index: 0
      };
      return iterator;
    }
    var HeadersIteratorPrototype = Object.setPrototypeOf({
      next() {
        if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
          throw new TypeError("Value of `this` is not a HeadersIterator");
        }
        var _INTERNAL = this[INTERNAL];
        const target = _INTERNAL.target, kind = _INTERNAL.kind, index = _INTERNAL.index;
        const values = getHeaders(target, kind);
        const len = values.length;
        if (index >= len) {
          return {
            value: void 0,
            done: true
          };
        }
        this[INTERNAL].index = index + 1;
        return {
          value: values[index],
          done: false
        };
      }
    }, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));
    Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
      value: "HeadersIterator",
      writable: false,
      enumerable: false,
      configurable: true
    });
    function exportNodeCompatibleHeaders(headers) {
      const obj = Object.assign({ __proto__: null }, headers[MAP]);
      const hostHeaderKey = find(headers[MAP], "Host");
      if (hostHeaderKey !== void 0) {
        obj[hostHeaderKey] = obj[hostHeaderKey][0];
      }
      return obj;
    }
    function createHeadersLenient(obj) {
      const headers = new Headers();
      for (const name of Object.keys(obj)) {
        if (invalidTokenRegex.test(name)) {
          continue;
        }
        if (Array.isArray(obj[name])) {
          for (const val of obj[name]) {
            if (invalidHeaderCharRegex.test(val)) {
              continue;
            }
            if (headers[MAP][name] === void 0) {
              headers[MAP][name] = [val];
            } else {
              headers[MAP][name].push(val);
            }
          }
        } else if (!invalidHeaderCharRegex.test(obj[name])) {
          headers[MAP][name] = [obj[name]];
        }
      }
      return headers;
    }
    var INTERNALS$1 = Symbol("Response internals");
    var STATUS_CODES = http.STATUS_CODES;
    var Response = class {
      constructor() {
        let body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        Body.call(this, body, opts);
        const status = opts.status || 200;
        const headers = new Headers(opts.headers);
        if (body != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          url: opts.url,
          status,
          statusText: opts.statusText || STATUS_CODES[status],
          headers,
          counter: opts.counter
        };
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      clone() {
        return new Response(clone(this), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected
        });
      }
    };
    Body.mixIn(Response.prototype);
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    Object.defineProperty(Response.prototype, Symbol.toStringTag, {
      value: "Response",
      writable: false,
      enumerable: false,
      configurable: true
    });
    var INTERNALS$2 = Symbol("Request internals");
    var parse_url = Url.parse;
    var format_url = Url.format;
    var streamDestructionSupported = "destroy" in Stream.Readable.prototype;
    function isRequest(input) {
      return typeof input === "object" && typeof input[INTERNALS$2] === "object";
    }
    function isAbortSignal(signal) {
      const proto = signal && typeof signal === "object" && Object.getPrototypeOf(signal);
      return !!(proto && proto.constructor.name === "AbortSignal");
    }
    var Request = class {
      constructor(input) {
        let init = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        let parsedURL;
        if (!isRequest(input)) {
          if (input && input.href) {
            parsedURL = parse_url(input.href);
          } else {
            parsedURL = parse_url(`${input}`);
          }
          input = {};
        } else {
          parsedURL = parse_url(input.url);
        }
        let method = init.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        Body.call(this, inputBody, {
          timeout: init.timeout || input.timeout || 0,
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody != null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init)
          signal = init.signal;
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS$2] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init.follow !== void 0 ? init.follow : input.follow !== void 0 ? input.follow : 20;
        this.compress = init.compress !== void 0 ? init.compress : input.compress !== void 0 ? input.compress : true;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
      }
      get method() {
        return this[INTERNALS$2].method;
      }
      get url() {
        return format_url(this[INTERNALS$2].parsedURL);
      }
      get headers() {
        return this[INTERNALS$2].headers;
      }
      get redirect() {
        return this[INTERNALS$2].redirect;
      }
      get signal() {
        return this[INTERNALS$2].signal;
      }
      clone() {
        return new Request(this);
      }
    };
    Body.mixIn(Request.prototype);
    Object.defineProperty(Request.prototype, Symbol.toStringTag, {
      value: "Request",
      writable: false,
      enumerable: false,
      configurable: true
    });
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    function getNodeRequestOptions(request) {
      const parsedURL = request[INTERNALS$2].parsedURL;
      const headers = new Headers(request[INTERNALS$2].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      if (!parsedURL.protocol || !parsedURL.hostname) {
        throw new TypeError("Only absolute URLs are supported");
      }
      if (!/^https?:$/.test(parsedURL.protocol)) {
        throw new TypeError("Only HTTP(S) protocols are supported");
      }
      if (request.signal && request.body instanceof Stream.Readable && !streamDestructionSupported) {
        throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");
      }
      let contentLengthValue = null;
      if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body != null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number") {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch/1.0 (+https://github.com/bitinn/node-fetch)");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate");
      }
      let agent = request.agent;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      return Object.assign({}, parsedURL, {
        method: request.method,
        headers: exportNodeCompatibleHeaders(headers),
        agent
      });
    }
    function AbortError(message) {
      Error.call(this, message);
      this.type = "aborted";
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
    AbortError.prototype = Object.create(Error.prototype);
    AbortError.prototype.constructor = AbortError;
    AbortError.prototype.name = "AbortError";
    var PassThrough$1 = Stream.PassThrough;
    var resolve_url = Url.resolve;
    function fetch2(url, opts) {
      if (!fetch2.Promise) {
        throw new Error("native promise missing, set fetch.Promise to your favorite alternative");
      }
      Body.Promise = fetch2.Promise;
      return new fetch2.Promise(function(resolve, reject) {
        const request = new Request(url, opts);
        const options = getNodeRequestOptions(request);
        const send = (options.protocol === "https:" ? https : http).request;
        const signal = request.signal;
        let response = null;
        const abort = function abort2() {
          let error = new AbortError("The user aborted a request.");
          reject(error);
          if (request.body && request.body instanceof Stream.Readable) {
            request.body.destroy(error);
          }
          if (!response || !response.body)
            return;
          response.body.emit("error", error);
        };
        if (signal && signal.aborted) {
          abort();
          return;
        }
        const abortAndFinalize = function abortAndFinalize2() {
          abort();
          finalize();
        };
        const req = send(options);
        let reqTimeout;
        if (signal) {
          signal.addEventListener("abort", abortAndFinalize);
        }
        function finalize() {
          req.abort();
          if (signal)
            signal.removeEventListener("abort", abortAndFinalize);
          clearTimeout(reqTimeout);
        }
        if (request.timeout) {
          req.once("socket", function(socket) {
            reqTimeout = setTimeout(function() {
              reject(new FetchError(`network timeout at: ${request.url}`, "request-timeout"));
              finalize();
            }, request.timeout);
          });
        }
        req.on("error", function(err) {
          reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
          finalize();
        });
        req.on("response", function(res) {
          clearTimeout(reqTimeout);
          const headers = createHeadersLenient(res.headers);
          if (fetch2.isRedirect(res.statusCode)) {
            const location = headers.get("Location");
            const locationURL = location === null ? null : resolve_url(request.url, location);
            switch (request.redirect) {
              case "error":
                reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
                finalize();
                return;
              case "manual":
                if (locationURL !== null) {
                  try {
                    headers.set("Location", locationURL);
                  } catch (err) {
                    reject(err);
                  }
                }
                break;
              case "follow":
                if (locationURL === null) {
                  break;
                }
                if (request.counter >= request.follow) {
                  reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
                  finalize();
                  return;
                }
                const requestOpts = {
                  headers: new Headers(request.headers),
                  follow: request.follow,
                  counter: request.counter + 1,
                  agent: request.agent,
                  compress: request.compress,
                  method: request.method,
                  body: request.body,
                  signal: request.signal,
                  timeout: request.timeout,
                  size: request.size
                };
                if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
                  reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
                  finalize();
                  return;
                }
                if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === "POST") {
                  requestOpts.method = "GET";
                  requestOpts.body = void 0;
                  requestOpts.headers.delete("content-length");
                }
                resolve(fetch2(new Request(locationURL, requestOpts)));
                finalize();
                return;
            }
          }
          res.once("end", function() {
            if (signal)
              signal.removeEventListener("abort", abortAndFinalize);
          });
          let body = res.pipe(new PassThrough$1());
          const response_options = {
            url: request.url,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers,
            size: request.size,
            timeout: request.timeout,
            counter: request.counter
          };
          const codings = headers.get("Content-Encoding");
          if (!request.compress || request.method === "HEAD" || codings === null || res.statusCode === 204 || res.statusCode === 304) {
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          const zlibOptions = {
            flush: zlib.Z_SYNC_FLUSH,
            finishFlush: zlib.Z_SYNC_FLUSH
          };
          if (codings == "gzip" || codings == "x-gzip") {
            body = body.pipe(zlib.createGunzip(zlibOptions));
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          if (codings == "deflate" || codings == "x-deflate") {
            const raw = res.pipe(new PassThrough$1());
            raw.once("data", function(chunk) {
              if ((chunk[0] & 15) === 8) {
                body = body.pipe(zlib.createInflate());
              } else {
                body = body.pipe(zlib.createInflateRaw());
              }
              response = new Response(body, response_options);
              resolve(response);
            });
            return;
          }
          if (codings == "br" && typeof zlib.createBrotliDecompress === "function") {
            body = body.pipe(zlib.createBrotliDecompress());
            response = new Response(body, response_options);
            resolve(response);
            return;
          }
          response = new Response(body, response_options);
          resolve(response);
        });
        writeToStream(req, request);
      });
    }
    fetch2.isRedirect = function(code) {
      return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
    };
    fetch2.Promise = global.Promise;
    module2.exports = exports = fetch2;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = exports;
    exports.Headers = Headers;
    exports.Request = Request;
    exports.Response = Response;
    exports.FetchError = FetchError;
  }
});

// node_modules/@azure/msal-common/dist/index.cjs.js
var require_index_cjs = __commonJS({
  "node_modules/@azure/msal-common/dist/index.cjs.js"(exports) {
    "use strict";
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    function __extends(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    }
    function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++)
        s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    }
    var Constants = {
      LIBRARY_NAME: "MSAL.JS",
      SKU: "msal.js.common",
      CACHE_PREFIX: "msal",
      DEFAULT_AUTHORITY: "https://login.microsoftonline.com/common/",
      DEFAULT_AUTHORITY_HOST: "login.microsoftonline.com",
      ADFS: "adfs",
      AAD_INSTANCE_DISCOVERY_ENDPT: "https://login.microsoftonline.com/common/discovery/instance?api-version=1.1&authorization_endpoint=",
      RESOURCE_DELIM: "|",
      NO_ACCOUNT: "NO_ACCOUNT",
      CLAIMS: "claims",
      CONSUMER_UTID: "9188040d-6c67-4c5b-b112-36a304b66dad",
      OPENID_SCOPE: "openid",
      PROFILE_SCOPE: "profile",
      OFFLINE_ACCESS_SCOPE: "offline_access",
      EMAIL_SCOPE: "email",
      CODE_RESPONSE_TYPE: "code",
      CODE_GRANT_TYPE: "authorization_code",
      RT_GRANT_TYPE: "refresh_token",
      FRAGMENT_RESPONSE_MODE: "fragment",
      S256_CODE_CHALLENGE_METHOD: "S256",
      URL_FORM_CONTENT_TYPE: "application/x-www-form-urlencoded;charset=utf-8",
      AUTHORIZATION_PENDING: "authorization_pending",
      NOT_DEFINED: "not_defined",
      EMPTY_STRING: "",
      FORWARD_SLASH: "/",
      IMDS_ENDPOINT: "http://169.254.169.254/metadata/instance/compute/location",
      IMDS_VERSION: "2020-06-01",
      IMDS_TIMEOUT: 2e3,
      AZURE_REGION_AUTO_DISCOVER_FLAG: "TryAutoDetect",
      REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX: "login.microsoft.com",
      KNOWN_PUBLIC_CLOUDS: ["login.microsoftonline.com", "login.windows.net", "login.microsoft.com", "sts.windows.net"]
    };
    var OIDC_DEFAULT_SCOPES = [
      Constants.OPENID_SCOPE,
      Constants.PROFILE_SCOPE,
      Constants.OFFLINE_ACCESS_SCOPE
    ];
    var OIDC_SCOPES = __spreadArrays(OIDC_DEFAULT_SCOPES, [
      Constants.EMAIL_SCOPE
    ]);
    var HeaderNames;
    (function(HeaderNames2) {
      HeaderNames2["CONTENT_TYPE"] = "Content-Type";
      HeaderNames2["RETRY_AFTER"] = "Retry-After";
      HeaderNames2["CCS_HEADER"] = "X-AnchorMailbox";
    })(HeaderNames || (HeaderNames = {}));
    (function(PersistentCacheKeys) {
      PersistentCacheKeys["ID_TOKEN"] = "idtoken";
      PersistentCacheKeys["CLIENT_INFO"] = "client.info";
      PersistentCacheKeys["ADAL_ID_TOKEN"] = "adal.idtoken";
      PersistentCacheKeys["ERROR"] = "error";
      PersistentCacheKeys["ERROR_DESC"] = "error.description";
      PersistentCacheKeys["ACTIVE_ACCOUNT"] = "active-account";
    })(exports.PersistentCacheKeys || (exports.PersistentCacheKeys = {}));
    var AADAuthorityConstants;
    (function(AADAuthorityConstants2) {
      AADAuthorityConstants2["COMMON"] = "common";
      AADAuthorityConstants2["ORGANIZATIONS"] = "organizations";
      AADAuthorityConstants2["CONSUMERS"] = "consumers";
    })(AADAuthorityConstants || (AADAuthorityConstants = {}));
    var AADServerParamKeys;
    (function(AADServerParamKeys2) {
      AADServerParamKeys2["CLIENT_ID"] = "client_id";
      AADServerParamKeys2["REDIRECT_URI"] = "redirect_uri";
      AADServerParamKeys2["RESPONSE_TYPE"] = "response_type";
      AADServerParamKeys2["RESPONSE_MODE"] = "response_mode";
      AADServerParamKeys2["GRANT_TYPE"] = "grant_type";
      AADServerParamKeys2["CLAIMS"] = "claims";
      AADServerParamKeys2["SCOPE"] = "scope";
      AADServerParamKeys2["ERROR"] = "error";
      AADServerParamKeys2["ERROR_DESCRIPTION"] = "error_description";
      AADServerParamKeys2["ACCESS_TOKEN"] = "access_token";
      AADServerParamKeys2["ID_TOKEN"] = "id_token";
      AADServerParamKeys2["REFRESH_TOKEN"] = "refresh_token";
      AADServerParamKeys2["EXPIRES_IN"] = "expires_in";
      AADServerParamKeys2["STATE"] = "state";
      AADServerParamKeys2["NONCE"] = "nonce";
      AADServerParamKeys2["PROMPT"] = "prompt";
      AADServerParamKeys2["SESSION_STATE"] = "session_state";
      AADServerParamKeys2["CLIENT_INFO"] = "client_info";
      AADServerParamKeys2["CODE"] = "code";
      AADServerParamKeys2["CODE_CHALLENGE"] = "code_challenge";
      AADServerParamKeys2["CODE_CHALLENGE_METHOD"] = "code_challenge_method";
      AADServerParamKeys2["CODE_VERIFIER"] = "code_verifier";
      AADServerParamKeys2["CLIENT_REQUEST_ID"] = "client-request-id";
      AADServerParamKeys2["X_CLIENT_SKU"] = "x-client-SKU";
      AADServerParamKeys2["X_CLIENT_VER"] = "x-client-VER";
      AADServerParamKeys2["X_CLIENT_OS"] = "x-client-OS";
      AADServerParamKeys2["X_CLIENT_CPU"] = "x-client-CPU";
      AADServerParamKeys2["X_CLIENT_CURR_TELEM"] = "x-client-current-telemetry";
      AADServerParamKeys2["X_CLIENT_LAST_TELEM"] = "x-client-last-telemetry";
      AADServerParamKeys2["X_MS_LIB_CAPABILITY"] = "x-ms-lib-capability";
      AADServerParamKeys2["POST_LOGOUT_URI"] = "post_logout_redirect_uri";
      AADServerParamKeys2["ID_TOKEN_HINT"] = "id_token_hint";
      AADServerParamKeys2["DEVICE_CODE"] = "device_code";
      AADServerParamKeys2["CLIENT_SECRET"] = "client_secret";
      AADServerParamKeys2["CLIENT_ASSERTION"] = "client_assertion";
      AADServerParamKeys2["CLIENT_ASSERTION_TYPE"] = "client_assertion_type";
      AADServerParamKeys2["TOKEN_TYPE"] = "token_type";
      AADServerParamKeys2["REQ_CNF"] = "req_cnf";
      AADServerParamKeys2["OBO_ASSERTION"] = "assertion";
      AADServerParamKeys2["REQUESTED_TOKEN_USE"] = "requested_token_use";
      AADServerParamKeys2["ON_BEHALF_OF"] = "on_behalf_of";
      AADServerParamKeys2["FOCI"] = "foci";
      AADServerParamKeys2["CCS_HEADER"] = "X-AnchorMailbox";
    })(AADServerParamKeys || (AADServerParamKeys = {}));
    var ClaimsRequestKeys;
    (function(ClaimsRequestKeys2) {
      ClaimsRequestKeys2["ACCESS_TOKEN"] = "access_token";
      ClaimsRequestKeys2["XMS_CC"] = "xms_cc";
    })(ClaimsRequestKeys || (ClaimsRequestKeys = {}));
    var PromptValue = {
      LOGIN: "login",
      SELECT_ACCOUNT: "select_account",
      CONSENT: "consent",
      NONE: "none",
      CREATE: "create"
    };
    var SSOTypes;
    (function(SSOTypes2) {
      SSOTypes2["ACCOUNT"] = "account";
      SSOTypes2["SID"] = "sid";
      SSOTypes2["LOGIN_HINT"] = "login_hint";
      SSOTypes2["ID_TOKEN"] = "id_token";
      SSOTypes2["DOMAIN_HINT"] = "domain_hint";
      SSOTypes2["ORGANIZATIONS"] = "organizations";
      SSOTypes2["CONSUMERS"] = "consumers";
      SSOTypes2["ACCOUNT_ID"] = "accountIdentifier";
      SSOTypes2["HOMEACCOUNT_ID"] = "homeAccountIdentifier";
    })(SSOTypes || (SSOTypes = {}));
    var BlacklistedEQParams = [
      SSOTypes.SID,
      SSOTypes.LOGIN_HINT
    ];
    var CodeChallengeMethodValues = {
      PLAIN: "plain",
      S256: "S256"
    };
    (function(ResponseMode) {
      ResponseMode["QUERY"] = "query";
      ResponseMode["FRAGMENT"] = "fragment";
      ResponseMode["FORM_POST"] = "form_post";
    })(exports.ResponseMode || (exports.ResponseMode = {}));
    var GrantType;
    (function(GrantType2) {
      GrantType2["IMPLICIT_GRANT"] = "implicit";
      GrantType2["AUTHORIZATION_CODE_GRANT"] = "authorization_code";
      GrantType2["CLIENT_CREDENTIALS_GRANT"] = "client_credentials";
      GrantType2["RESOURCE_OWNER_PASSWORD_GRANT"] = "password";
      GrantType2["REFRESH_TOKEN_GRANT"] = "refresh_token";
      GrantType2["DEVICE_CODE_GRANT"] = "device_code";
      GrantType2["JWT_BEARER"] = "urn:ietf:params:oauth:grant-type:jwt-bearer";
    })(GrantType || (GrantType = {}));
    (function(CacheAccountType) {
      CacheAccountType["MSSTS_ACCOUNT_TYPE"] = "MSSTS";
      CacheAccountType["ADFS_ACCOUNT_TYPE"] = "ADFS";
      CacheAccountType["MSAV1_ACCOUNT_TYPE"] = "MSA";
      CacheAccountType["GENERIC_ACCOUNT_TYPE"] = "Generic";
    })(exports.CacheAccountType || (exports.CacheAccountType = {}));
    var Separators;
    (function(Separators2) {
      Separators2["CACHE_KEY_SEPARATOR"] = "-";
      Separators2["CLIENT_INFO_SEPARATOR"] = ".";
    })(Separators || (Separators = {}));
    (function(CredentialType) {
      CredentialType["ID_TOKEN"] = "IdToken";
      CredentialType["ACCESS_TOKEN"] = "AccessToken";
      CredentialType["ACCESS_TOKEN_WITH_AUTH_SCHEME"] = "AccessToken_With_AuthScheme";
      CredentialType["REFRESH_TOKEN"] = "RefreshToken";
    })(exports.CredentialType || (exports.CredentialType = {}));
    (function(CacheSchemaType) {
      CacheSchemaType["ACCOUNT"] = "Account";
      CacheSchemaType["CREDENTIAL"] = "Credential";
      CacheSchemaType["ID_TOKEN"] = "IdToken";
      CacheSchemaType["ACCESS_TOKEN"] = "AccessToken";
      CacheSchemaType["REFRESH_TOKEN"] = "RefreshToken";
      CacheSchemaType["APP_METADATA"] = "AppMetadata";
      CacheSchemaType["TEMPORARY"] = "TempCache";
      CacheSchemaType["TELEMETRY"] = "Telemetry";
      CacheSchemaType["UNDEFINED"] = "Undefined";
      CacheSchemaType["THROTTLING"] = "Throttling";
    })(exports.CacheSchemaType || (exports.CacheSchemaType = {}));
    (function(CacheType) {
      CacheType[CacheType["ADFS"] = 1001] = "ADFS";
      CacheType[CacheType["MSA"] = 1002] = "MSA";
      CacheType[CacheType["MSSTS"] = 1003] = "MSSTS";
      CacheType[CacheType["GENERIC"] = 1004] = "GENERIC";
      CacheType[CacheType["ACCESS_TOKEN"] = 2001] = "ACCESS_TOKEN";
      CacheType[CacheType["REFRESH_TOKEN"] = 2002] = "REFRESH_TOKEN";
      CacheType[CacheType["ID_TOKEN"] = 2003] = "ID_TOKEN";
      CacheType[CacheType["APP_METADATA"] = 3001] = "APP_METADATA";
      CacheType[CacheType["UNDEFINED"] = 9999] = "UNDEFINED";
    })(exports.CacheType || (exports.CacheType = {}));
    var APP_METADATA = "appmetadata";
    var CLIENT_INFO = "client_info";
    var THE_FAMILY_ID = "1";
    var AUTHORITY_METADATA_CONSTANTS = {
      CACHE_KEY: "authority-metadata",
      REFRESH_TIME_SECONDS: 3600 * 24
    };
    var AuthorityMetadataSource;
    (function(AuthorityMetadataSource2) {
      AuthorityMetadataSource2["CONFIG"] = "config";
      AuthorityMetadataSource2["CACHE"] = "cache";
      AuthorityMetadataSource2["NETWORK"] = "network";
    })(AuthorityMetadataSource || (AuthorityMetadataSource = {}));
    var SERVER_TELEM_CONSTANTS = {
      SCHEMA_VERSION: 5,
      MAX_CUR_HEADER_BYTES: 80,
      MAX_LAST_HEADER_BYTES: 330,
      MAX_CACHED_ERRORS: 50,
      CACHE_KEY: "server-telemetry",
      CATEGORY_SEPARATOR: "|",
      VALUE_SEPARATOR: ",",
      OVERFLOW_TRUE: "1",
      OVERFLOW_FALSE: "0",
      UNKNOWN_ERROR: "unknown_error"
    };
    (function(AuthenticationScheme) {
      AuthenticationScheme["POP"] = "pop";
      AuthenticationScheme["BEARER"] = "Bearer";
    })(exports.AuthenticationScheme || (exports.AuthenticationScheme = {}));
    var ThrottlingConstants = {
      DEFAULT_THROTTLE_TIME_SECONDS: 60,
      DEFAULT_MAX_THROTTLE_TIME_SECONDS: 3600,
      THROTTLING_PREFIX: "throttling",
      X_MS_LIB_CAPABILITY_VALUE: "retry-after, h429"
    };
    var Errors = {
      INVALID_GRANT_ERROR: "invalid_grant",
      CLIENT_MISMATCH_ERROR: "client_mismatch"
    };
    var PasswordGrantConstants;
    (function(PasswordGrantConstants2) {
      PasswordGrantConstants2["username"] = "username";
      PasswordGrantConstants2["password"] = "password";
    })(PasswordGrantConstants || (PasswordGrantConstants = {}));
    var ResponseCodes;
    (function(ResponseCodes2) {
      ResponseCodes2[ResponseCodes2["httpSuccess"] = 200] = "httpSuccess";
      ResponseCodes2[ResponseCodes2["httpBadRequest"] = 400] = "httpBadRequest";
    })(ResponseCodes || (ResponseCodes = {}));
    var RegionDiscoverySources;
    (function(RegionDiscoverySources2) {
      RegionDiscoverySources2["FAILED_AUTO_DETECTION"] = "1";
      RegionDiscoverySources2["INTERNAL_CACHE"] = "2";
      RegionDiscoverySources2["ENVIRONMENT_VARIABLE"] = "3";
      RegionDiscoverySources2["IMDS"] = "4";
    })(RegionDiscoverySources || (RegionDiscoverySources = {}));
    var RegionDiscoveryOutcomes;
    (function(RegionDiscoveryOutcomes2) {
      RegionDiscoveryOutcomes2["CONFIGURED_MATCHES_DETECTED"] = "1";
      RegionDiscoveryOutcomes2["CONFIGURED_NO_AUTO_DETECTION"] = "2";
      RegionDiscoveryOutcomes2["CONFIGURED_NOT_DETECTED"] = "3";
      RegionDiscoveryOutcomes2["AUTO_DETECTION_REQUESTED_SUCCESSFUL"] = "4";
      RegionDiscoveryOutcomes2["AUTO_DETECTION_REQUESTED_FAILED"] = "5";
    })(RegionDiscoveryOutcomes || (RegionDiscoveryOutcomes = {}));
    var CacheOutcome;
    (function(CacheOutcome2) {
      CacheOutcome2["NO_CACHE_HIT"] = "0";
      CacheOutcome2["FORCE_REFRESH"] = "1";
      CacheOutcome2["NO_CACHED_ACCESS_TOKEN"] = "2";
      CacheOutcome2["CACHED_ACCESS_TOKEN_EXPIRED"] = "3";
      CacheOutcome2["REFRESH_CACHED_ACCESS_TOKEN"] = "4";
    })(CacheOutcome || (CacheOutcome = {}));
    var AuthErrorMessage = {
      unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication."
      }
    };
    var AuthError = function(_super) {
      __extends(AuthError2, _super);
      function AuthError2(errorCode, errorMessage, suberror) {
        var _this = this;
        var errorString = errorMessage ? errorCode + ": " + errorMessage : errorCode;
        _this = _super.call(this, errorString) || this;
        Object.setPrototypeOf(_this, AuthError2.prototype);
        _this.errorCode = errorCode || Constants.EMPTY_STRING;
        _this.errorMessage = errorMessage || "";
        _this.subError = suberror || "";
        _this.name = "AuthError";
        return _this;
      }
      AuthError2.createUnexpectedError = function(errDesc) {
        return new AuthError2(AuthErrorMessage.unexpectedError.code, AuthErrorMessage.unexpectedError.desc + ": " + errDesc);
      };
      return AuthError2;
    }(Error);
    var DEFAULT_CRYPTO_IMPLEMENTATION = {
      createNewGuid: function() {
        var notImplErr = "Crypto interface - createNewGuid() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
      },
      base64Decode: function() {
        var notImplErr = "Crypto interface - base64Decode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
      },
      base64Encode: function() {
        var notImplErr = "Crypto interface - base64Encode() has not been implemented";
        throw AuthError.createUnexpectedError(notImplErr);
      },
      generatePkceCodes: function() {
        return __awaiter(this, void 0, void 0, function() {
          var notImplErr;
          return __generator(this, function(_a) {
            notImplErr = "Crypto interface - generatePkceCodes() has not been implemented";
            throw AuthError.createUnexpectedError(notImplErr);
          });
        });
      },
      getPublicKeyThumbprint: function() {
        return __awaiter(this, void 0, void 0, function() {
          var notImplErr;
          return __generator(this, function(_a) {
            notImplErr = "Crypto interface - getPublicKeyThumbprint() has not been implemented";
            throw AuthError.createUnexpectedError(notImplErr);
          });
        });
      },
      signJwt: function() {
        return __awaiter(this, void 0, void 0, function() {
          var notImplErr;
          return __generator(this, function(_a) {
            notImplErr = "Crypto interface - signJwt() has not been implemented";
            throw AuthError.createUnexpectedError(notImplErr);
          });
        });
      }
    };
    var ClientAuthErrorMessage = {
      clientInfoDecodingError: {
        code: "client_info_decoding_error",
        desc: "The client info could not be parsed/decoded correctly. Please review the trace to determine the root cause."
      },
      clientInfoEmptyError: {
        code: "client_info_empty_error",
        desc: "The client info was empty. Please review the trace to determine the root cause."
      },
      tokenParsingError: {
        code: "token_parsing_error",
        desc: "Token cannot be parsed. Please review stack trace to determine root cause."
      },
      nullOrEmptyToken: {
        code: "null_or_empty_token",
        desc: "The token is null or empty. Please review the trace to determine the root cause."
      },
      endpointResolutionError: {
        code: "endpoints_resolution_error",
        desc: "Error: could not resolve endpoints. Please check network and try again."
      },
      networkError: {
        code: "network_error",
        desc: "Network request failed. Please check network trace to determine root cause."
      },
      unableToGetOpenidConfigError: {
        code: "openid_config_error",
        desc: "Could not retrieve endpoints. Check your authority and verify the .well-known/openid-configuration endpoint returns the required endpoints."
      },
      hashNotDeserialized: {
        code: "hash_not_deserialized",
        desc: "The hash parameters could not be deserialized. Please review the trace to determine the root cause."
      },
      blankGuidGenerated: {
        code: "blank_guid_generated",
        desc: "The guid generated was blank. Please review the trace to determine the root cause."
      },
      invalidStateError: {
        code: "invalid_state",
        desc: "State was not the expected format. Please check the logs to determine whether the request was sent using ProtocolUtils.setRequestState()."
      },
      stateMismatchError: {
        code: "state_mismatch",
        desc: "State mismatch error. Please check your network. Continued requests may cause cache overflow."
      },
      stateNotFoundError: {
        code: "state_not_found",
        desc: "State not found"
      },
      nonceMismatchError: {
        code: "nonce_mismatch",
        desc: "Nonce mismatch error. This may be caused by a race condition in concurrent requests."
      },
      nonceNotFoundError: {
        code: "nonce_not_found",
        desc: "nonce not found"
      },
      noTokensFoundError: {
        code: "no_tokens_found",
        desc: "No tokens were found for the given scopes, and no authorization code was passed to acquireToken. You must retrieve an authorization code before making a call to acquireToken()."
      },
      multipleMatchingTokens: {
        code: "multiple_matching_tokens",
        desc: "The cache contains multiple tokens satisfying the requirements. Call AcquireToken again providing more requirements such as authority or account."
      },
      multipleMatchingAccounts: {
        code: "multiple_matching_accounts",
        desc: "The cache contains multiple accounts satisfying the given parameters. Please pass more info to obtain the correct account"
      },
      multipleMatchingAppMetadata: {
        code: "multiple_matching_appMetadata",
        desc: "The cache contains multiple appMetadata satisfying the given parameters. Please pass more info to obtain the correct appMetadata"
      },
      tokenRequestCannotBeMade: {
        code: "request_cannot_be_made",
        desc: "Token request cannot be made without authorization code or refresh token."
      },
      appendEmptyScopeError: {
        code: "cannot_append_empty_scope",
        desc: "Cannot append null or empty scope to ScopeSet. Please check the stack trace for more info."
      },
      removeEmptyScopeError: {
        code: "cannot_remove_empty_scope",
        desc: "Cannot remove null or empty scope from ScopeSet. Please check the stack trace for more info."
      },
      appendScopeSetError: {
        code: "cannot_append_scopeset",
        desc: "Cannot append ScopeSet due to error."
      },
      emptyInputScopeSetError: {
        code: "empty_input_scopeset",
        desc: "Empty input ScopeSet cannot be processed."
      },
      DeviceCodePollingCancelled: {
        code: "device_code_polling_cancelled",
        desc: "Caller has cancelled token endpoint polling during device code flow by setting DeviceCodeRequest.cancel = true."
      },
      DeviceCodeExpired: {
        code: "device_code_expired",
        desc: "Device code is expired."
      },
      DeviceCodeUnknownError: {
        code: "device_code_unknown_error",
        desc: "Device code stopped polling for unknown reasons."
      },
      NoAccountInSilentRequest: {
        code: "no_account_in_silent_request",
        desc: "Please pass an account object, silent flow is not supported without account information"
      },
      invalidCacheRecord: {
        code: "invalid_cache_record",
        desc: "Cache record object was null or undefined."
      },
      invalidCacheEnvironment: {
        code: "invalid_cache_environment",
        desc: "Invalid environment when attempting to create cache entry"
      },
      noAccountFound: {
        code: "no_account_found",
        desc: "No account found in cache for given key."
      },
      CachePluginError: {
        code: "no cache plugin set on CacheManager",
        desc: "ICachePlugin needs to be set before using readFromStorage or writeFromStorage"
      },
      noCryptoObj: {
        code: "no_crypto_object",
        desc: "No crypto object detected. This is required for the following operation: "
      },
      invalidCacheType: {
        code: "invalid_cache_type",
        desc: "Invalid cache type"
      },
      unexpectedAccountType: {
        code: "unexpected_account_type",
        desc: "Unexpected account type."
      },
      unexpectedCredentialType: {
        code: "unexpected_credential_type",
        desc: "Unexpected credential type."
      },
      invalidAssertion: {
        code: "invalid_assertion",
        desc: "Client assertion must meet requirements described in https://tools.ietf.org/html/rfc7515"
      },
      invalidClientCredential: {
        code: "invalid_client_credential",
        desc: "Client credential (secret, certificate, or assertion) must not be empty when creating a confidential client. An application should at most have one credential"
      },
      tokenRefreshRequired: {
        code: "token_refresh_required",
        desc: "Cannot return token from cache because it must be refreshed. This may be due to one of the following reasons: forceRefresh parameter is set to true, claims have been requested, there is no cached access token or it is expired."
      },
      userTimeoutReached: {
        code: "user_timeout_reached",
        desc: "User defined timeout for device code polling reached"
      },
      tokenClaimsRequired: {
        code: "token_claims_cnf_required_for_signedjwt",
        desc: "Cannot generate a POP jwt if the token_claims are not populated"
      },
      noAuthorizationCodeFromServer: {
        code: "authorization_code_missing_from_server_response",
        desc: "Server response does not contain an authorization code to proceed"
      },
      noAzureRegionDetected: {
        code: "no_azure_region_detected",
        desc: "No azure region was detected and no fallback was made available"
      },
      accessTokenEntityNullError: {
        code: "access_token_entity_null",
        desc: "Access token entity is null, please check logs and cache to ensure a valid access token is present."
      }
    };
    var ClientAuthError = function(_super) {
      __extends(ClientAuthError2, _super);
      function ClientAuthError2(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "ClientAuthError";
        Object.setPrototypeOf(_this, ClientAuthError2.prototype);
        return _this;
      }
      ClientAuthError2.createClientInfoDecodingError = function(caughtError) {
        return new ClientAuthError2(ClientAuthErrorMessage.clientInfoDecodingError.code, ClientAuthErrorMessage.clientInfoDecodingError.desc + " Failed with error: " + caughtError);
      };
      ClientAuthError2.createClientInfoEmptyError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.clientInfoEmptyError.code, "" + ClientAuthErrorMessage.clientInfoEmptyError.desc);
      };
      ClientAuthError2.createTokenParsingError = function(caughtExtractionError) {
        return new ClientAuthError2(ClientAuthErrorMessage.tokenParsingError.code, ClientAuthErrorMessage.tokenParsingError.desc + " Failed with error: " + caughtExtractionError);
      };
      ClientAuthError2.createTokenNullOrEmptyError = function(invalidRawTokenString) {
        return new ClientAuthError2(ClientAuthErrorMessage.nullOrEmptyToken.code, ClientAuthErrorMessage.nullOrEmptyToken.desc + " Raw Token Value: " + invalidRawTokenString);
      };
      ClientAuthError2.createEndpointDiscoveryIncompleteError = function(errDetail) {
        return new ClientAuthError2(ClientAuthErrorMessage.endpointResolutionError.code, ClientAuthErrorMessage.endpointResolutionError.desc + " Detail: " + errDetail);
      };
      ClientAuthError2.createNetworkError = function(endpoint, errDetail) {
        return new ClientAuthError2(ClientAuthErrorMessage.networkError.code, ClientAuthErrorMessage.networkError.desc + " | Fetch client threw: " + errDetail + " | Attempted to reach: " + endpoint.split("?")[0]);
      };
      ClientAuthError2.createUnableToGetOpenidConfigError = function(errDetail) {
        return new ClientAuthError2(ClientAuthErrorMessage.unableToGetOpenidConfigError.code, ClientAuthErrorMessage.unableToGetOpenidConfigError.desc + " Attempted to retrieve endpoints from: " + errDetail);
      };
      ClientAuthError2.createHashNotDeserializedError = function(hashParamObj) {
        return new ClientAuthError2(ClientAuthErrorMessage.hashNotDeserialized.code, ClientAuthErrorMessage.hashNotDeserialized.desc + " Given Object: " + hashParamObj);
      };
      ClientAuthError2.createInvalidStateError = function(invalidState, errorString) {
        return new ClientAuthError2(ClientAuthErrorMessage.invalidStateError.code, ClientAuthErrorMessage.invalidStateError.desc + " Invalid State: " + invalidState + ", Root Err: " + errorString);
      };
      ClientAuthError2.createStateMismatchError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.stateMismatchError.code, ClientAuthErrorMessage.stateMismatchError.desc);
      };
      ClientAuthError2.createStateNotFoundError = function(missingState) {
        return new ClientAuthError2(ClientAuthErrorMessage.stateNotFoundError.code, ClientAuthErrorMessage.stateNotFoundError.desc + ":  " + missingState);
      };
      ClientAuthError2.createNonceMismatchError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.nonceMismatchError.code, ClientAuthErrorMessage.nonceMismatchError.desc);
      };
      ClientAuthError2.createNonceNotFoundError = function(missingNonce) {
        return new ClientAuthError2(ClientAuthErrorMessage.nonceNotFoundError.code, ClientAuthErrorMessage.nonceNotFoundError.desc + ":  " + missingNonce);
      };
      ClientAuthError2.createNoTokensFoundError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.noTokensFoundError.code, ClientAuthErrorMessage.noTokensFoundError.desc);
      };
      ClientAuthError2.createMultipleMatchingTokensInCacheError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.multipleMatchingTokens.code, ClientAuthErrorMessage.multipleMatchingTokens.desc + ".");
      };
      ClientAuthError2.createMultipleMatchingAccountsInCacheError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.multipleMatchingAccounts.code, ClientAuthErrorMessage.multipleMatchingAccounts.desc);
      };
      ClientAuthError2.createMultipleMatchingAppMetadataInCacheError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.multipleMatchingAppMetadata.code, ClientAuthErrorMessage.multipleMatchingAppMetadata.desc);
      };
      ClientAuthError2.createTokenRequestCannotBeMadeError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.tokenRequestCannotBeMade.code, ClientAuthErrorMessage.tokenRequestCannotBeMade.desc);
      };
      ClientAuthError2.createAppendEmptyScopeToSetError = function(givenScope) {
        return new ClientAuthError2(ClientAuthErrorMessage.appendEmptyScopeError.code, ClientAuthErrorMessage.appendEmptyScopeError.desc + " Given Scope: " + givenScope);
      };
      ClientAuthError2.createRemoveEmptyScopeFromSetError = function(givenScope) {
        return new ClientAuthError2(ClientAuthErrorMessage.removeEmptyScopeError.code, ClientAuthErrorMessage.removeEmptyScopeError.desc + " Given Scope: " + givenScope);
      };
      ClientAuthError2.createAppendScopeSetError = function(appendError) {
        return new ClientAuthError2(ClientAuthErrorMessage.appendScopeSetError.code, ClientAuthErrorMessage.appendScopeSetError.desc + " Detail Error: " + appendError);
      };
      ClientAuthError2.createEmptyInputScopeSetError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.emptyInputScopeSetError.code, "" + ClientAuthErrorMessage.emptyInputScopeSetError.desc);
      };
      ClientAuthError2.createDeviceCodeCancelledError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.DeviceCodePollingCancelled.code, "" + ClientAuthErrorMessage.DeviceCodePollingCancelled.desc);
      };
      ClientAuthError2.createDeviceCodeExpiredError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.DeviceCodeExpired.code, "" + ClientAuthErrorMessage.DeviceCodeExpired.desc);
      };
      ClientAuthError2.createDeviceCodeUnknownError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.DeviceCodeUnknownError.code, "" + ClientAuthErrorMessage.DeviceCodeUnknownError.desc);
      };
      ClientAuthError2.createNoAccountInSilentRequestError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.NoAccountInSilentRequest.code, "" + ClientAuthErrorMessage.NoAccountInSilentRequest.desc);
      };
      ClientAuthError2.createNullOrUndefinedCacheRecord = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.invalidCacheRecord.code, ClientAuthErrorMessage.invalidCacheRecord.desc);
      };
      ClientAuthError2.createInvalidCacheEnvironmentError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.invalidCacheEnvironment.code, ClientAuthErrorMessage.invalidCacheEnvironment.desc);
      };
      ClientAuthError2.createNoAccountFoundError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.noAccountFound.code, ClientAuthErrorMessage.noAccountFound.desc);
      };
      ClientAuthError2.createCachePluginError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.CachePluginError.code, "" + ClientAuthErrorMessage.CachePluginError.desc);
      };
      ClientAuthError2.createNoCryptoObjectError = function(operationName) {
        return new ClientAuthError2(ClientAuthErrorMessage.noCryptoObj.code, "" + ClientAuthErrorMessage.noCryptoObj.desc + operationName);
      };
      ClientAuthError2.createInvalidCacheTypeError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.invalidCacheType.code, "" + ClientAuthErrorMessage.invalidCacheType.desc);
      };
      ClientAuthError2.createUnexpectedAccountTypeError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.unexpectedAccountType.code, "" + ClientAuthErrorMessage.unexpectedAccountType.desc);
      };
      ClientAuthError2.createUnexpectedCredentialTypeError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.unexpectedCredentialType.code, "" + ClientAuthErrorMessage.unexpectedCredentialType.desc);
      };
      ClientAuthError2.createInvalidAssertionError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.invalidAssertion.code, "" + ClientAuthErrorMessage.invalidAssertion.desc);
      };
      ClientAuthError2.createInvalidCredentialError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.invalidClientCredential.code, "" + ClientAuthErrorMessage.invalidClientCredential.desc);
      };
      ClientAuthError2.createRefreshRequiredError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.tokenRefreshRequired.code, ClientAuthErrorMessage.tokenRefreshRequired.desc);
      };
      ClientAuthError2.createUserTimeoutReachedError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.userTimeoutReached.code, ClientAuthErrorMessage.userTimeoutReached.desc);
      };
      ClientAuthError2.createTokenClaimsRequiredError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.tokenClaimsRequired.code, ClientAuthErrorMessage.tokenClaimsRequired.desc);
      };
      ClientAuthError2.createNoAuthCodeInServerResponseError = function() {
        return new ClientAuthError2(ClientAuthErrorMessage.noAuthorizationCodeFromServer.code, ClientAuthErrorMessage.noAuthorizationCodeFromServer.desc);
      };
      return ClientAuthError2;
    }(AuthError);
    var StringUtils = function() {
      function StringUtils2() {
      }
      StringUtils2.decodeAuthToken = function(authToken) {
        if (StringUtils2.isEmpty(authToken)) {
          throw ClientAuthError.createTokenNullOrEmptyError(authToken);
        }
        var tokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        var matches = tokenPartsRegex.exec(authToken);
        if (!matches || matches.length < 4) {
          throw ClientAuthError.createTokenParsingError("Given token is malformed: " + JSON.stringify(authToken));
        }
        var crackedToken = {
          header: matches[1],
          JWSPayload: matches[2],
          JWSSig: matches[3]
        };
        return crackedToken;
      };
      StringUtils2.isEmpty = function(str) {
        return typeof str === "undefined" || !str || str.length === 0;
      };
      StringUtils2.isEmptyObj = function(strObj) {
        if (strObj && !StringUtils2.isEmpty(strObj)) {
          try {
            var obj = JSON.parse(strObj);
            return Object.keys(obj).length === 0;
          } catch (e) {
          }
        }
        return true;
      };
      StringUtils2.startsWith = function(str, search) {
        return str.indexOf(search) === 0;
      };
      StringUtils2.endsWith = function(str, search) {
        return str.length >= search.length && str.lastIndexOf(search) === str.length - search.length;
      };
      StringUtils2.queryStringToObject = function(query) {
        var match;
        var pl = /\+/g;
        var search = /([^&=]+)=([^&]*)/g;
        var decode = function(s) {
          return decodeURIComponent(decodeURIComponent(s.replace(pl, " ")));
        };
        var obj = {};
        match = search.exec(query);
        while (match) {
          obj[decode(match[1])] = decode(match[2]);
          match = search.exec(query);
        }
        return obj;
      };
      StringUtils2.trimArrayEntries = function(arr) {
        return arr.map(function(entry) {
          return entry.trim();
        });
      };
      StringUtils2.removeEmptyStringsFromArray = function(arr) {
        return arr.filter(function(entry) {
          return !StringUtils2.isEmpty(entry);
        });
      };
      StringUtils2.jsonParseHelper = function(str) {
        try {
          return JSON.parse(str);
        } catch (e) {
          return null;
        }
      };
      StringUtils2.matchPattern = function(pattern, input) {
        var regex = new RegExp(pattern.replace(/\*/g, "[^ ]*").replace(/\?/g, "\\?"));
        return regex.test(input);
      };
      return StringUtils2;
    }();
    (function(LogLevel) {
      LogLevel[LogLevel["Error"] = 0] = "Error";
      LogLevel[LogLevel["Warning"] = 1] = "Warning";
      LogLevel[LogLevel["Info"] = 2] = "Info";
      LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
      LogLevel[LogLevel["Trace"] = 4] = "Trace";
    })(exports.LogLevel || (exports.LogLevel = {}));
    var Logger = function() {
      function Logger2(loggerOptions, packageName, packageVersion) {
        this.level = exports.LogLevel.Info;
        var defaultLoggerCallback = function() {
        };
        this.localCallback = loggerOptions.loggerCallback || defaultLoggerCallback;
        this.piiLoggingEnabled = loggerOptions.piiLoggingEnabled || false;
        this.level = loggerOptions.logLevel || exports.LogLevel.Info;
        this.correlationId = loggerOptions.correlationId || "";
        this.packageName = packageName || Constants.EMPTY_STRING;
        this.packageVersion = packageVersion || Constants.EMPTY_STRING;
      }
      Logger2.prototype.clone = function(packageName, packageVersion, correlationId) {
        return new Logger2({ loggerCallback: this.localCallback, piiLoggingEnabled: this.piiLoggingEnabled, logLevel: this.level, correlationId: correlationId || this.correlationId }, packageName, packageVersion);
      };
      Logger2.prototype.logMessage = function(logMessage, options) {
        if (options.logLevel > this.level || !this.piiLoggingEnabled && options.containsPii) {
          return;
        }
        var timestamp = new Date().toUTCString();
        var logHeader;
        if (!StringUtils.isEmpty(options.correlationId)) {
          logHeader = "[" + timestamp + "] : [" + options.correlationId + "]";
        } else if (!StringUtils.isEmpty(this.correlationId)) {
          logHeader = "[" + timestamp + "] : [" + this.correlationId + "]";
        } else {
          logHeader = "[" + timestamp + "]";
        }
        var log = logHeader + " : " + this.packageName + "@" + this.packageVersion + " : " + exports.LogLevel[options.logLevel] + " - " + logMessage;
        this.executeCallback(options.logLevel, log, options.containsPii || false);
      };
      Logger2.prototype.executeCallback = function(level, message, containsPii) {
        if (this.localCallback) {
          this.localCallback(level, message, containsPii);
        }
      };
      Logger2.prototype.error = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Error,
          containsPii: false,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.errorPii = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Error,
          containsPii: true,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.warning = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Warning,
          containsPii: false,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.warningPii = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Warning,
          containsPii: true,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.info = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Info,
          containsPii: false,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.infoPii = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Info,
          containsPii: true,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.verbose = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Verbose,
          containsPii: false,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.verbosePii = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Verbose,
          containsPii: true,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.trace = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Trace,
          containsPii: false,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.tracePii = function(message, correlationId) {
        this.logMessage(message, {
          logLevel: exports.LogLevel.Trace,
          containsPii: true,
          correlationId: correlationId || ""
        });
      };
      Logger2.prototype.isPiiLoggingEnabled = function() {
        return this.piiLoggingEnabled || false;
      };
      return Logger2;
    }();
    var name = "@azure/msal-common";
    var version = "4.5.0";
    var CredentialEntity = function() {
      function CredentialEntity2() {
      }
      CredentialEntity2.prototype.generateAccountId = function() {
        return CredentialEntity2.generateAccountIdForCacheKey(this.homeAccountId, this.environment);
      };
      CredentialEntity2.prototype.generateCredentialId = function() {
        return CredentialEntity2.generateCredentialIdForCacheKey(this.credentialType, this.clientId, this.realm, this.familyId);
      };
      CredentialEntity2.prototype.generateTarget = function() {
        return CredentialEntity2.generateTargetForCacheKey(this.target);
      };
      CredentialEntity2.prototype.generateCredentialKey = function() {
        return CredentialEntity2.generateCredentialCacheKey(this.homeAccountId, this.environment, this.credentialType, this.clientId, this.realm, this.target, this.familyId);
      };
      CredentialEntity2.prototype.generateType = function() {
        switch (this.credentialType) {
          case exports.CredentialType.ID_TOKEN:
            return exports.CacheType.ID_TOKEN;
          case exports.CredentialType.ACCESS_TOKEN:
            return exports.CacheType.ACCESS_TOKEN;
          case exports.CredentialType.REFRESH_TOKEN:
            return exports.CacheType.REFRESH_TOKEN;
          default: {
            throw ClientAuthError.createUnexpectedCredentialTypeError();
          }
        }
      };
      CredentialEntity2.getCredentialType = function(key) {
        if (key.indexOf(exports.CredentialType.ACCESS_TOKEN.toLowerCase()) !== -1) {
          if (key.indexOf(exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME.toLowerCase()) !== -1) {
            return exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
          }
          return exports.CredentialType.ACCESS_TOKEN;
        } else if (key.indexOf(exports.CredentialType.ID_TOKEN.toLowerCase()) !== -1) {
          return exports.CredentialType.ID_TOKEN;
        } else if (key.indexOf(exports.CredentialType.REFRESH_TOKEN.toLowerCase()) !== -1) {
          return exports.CredentialType.REFRESH_TOKEN;
        }
        return Constants.NOT_DEFINED;
      };
      CredentialEntity2.generateCredentialCacheKey = function(homeAccountId, environment, credentialType, clientId, realm, target, familyId) {
        var credentialKey = [
          this.generateAccountIdForCacheKey(homeAccountId, environment),
          this.generateCredentialIdForCacheKey(credentialType, clientId, realm, familyId),
          this.generateTargetForCacheKey(target)
        ];
        return credentialKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
      };
      CredentialEntity2.generateAccountIdForCacheKey = function(homeAccountId, environment) {
        var accountId = [homeAccountId, environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
      };
      CredentialEntity2.generateCredentialIdForCacheKey = function(credentialType, clientId, realm, familyId) {
        var clientOrFamilyId = credentialType === exports.CredentialType.REFRESH_TOKEN ? familyId || clientId : clientId;
        var credentialId = [
          credentialType,
          clientOrFamilyId,
          realm || ""
        ];
        return credentialId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
      };
      CredentialEntity2.generateTargetForCacheKey = function(scopes) {
        return (scopes || "").toLowerCase();
      };
      return CredentialEntity2;
    }();
    var ClientConfigurationErrorMessage = {
      redirectUriNotSet: {
        code: "redirect_uri_empty",
        desc: "A redirect URI is required for all calls, and none has been set."
      },
      postLogoutUriNotSet: {
        code: "post_logout_uri_empty",
        desc: "A post logout redirect has not been set."
      },
      claimsRequestParsingError: {
        code: "claims_request_parsing_error",
        desc: "Could not parse the given claims request object."
      },
      authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https.  Please see here for valid authority configuration options: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-js-initializing-client-applications#configuration-options"
      },
      urlParseError: {
        code: "url_parse_error",
        desc: "URL could not be parsed into appropriate segments."
      },
      urlEmptyError: {
        code: "empty_url_error",
        desc: "URL was empty or null."
      },
      emptyScopesError: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as null, undefined or empty array because they are required to obtain an access token."
      },
      nonArrayScopesError: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array."
      },
      clientIdSingleScopeError: {
        code: "clientid_input_scopes_error",
        desc: "Client ID can only be provided as a single scope."
      },
      invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent', 'create' and 'none'.  Please see here for valid configuration options: https://azuread.github.io/microsoft-authentication-library-for-js/ref/modules/_azure_msal_common.html#commonauthorizationurlrequest"
      },
      invalidClaimsRequest: {
        code: "invalid_claims",
        desc: "Given claims parameter must be a stringified JSON object."
      },
      tokenRequestEmptyError: {
        code: "token_request_empty",
        desc: "Token request was empty and not found in cache."
      },
      logoutRequestEmptyError: {
        code: "logout_request_empty",
        desc: "The logout request was null or undefined."
      },
      invalidCodeChallengeMethod: {
        code: "invalid_code_challenge_method",
        desc: 'code_challenge_method passed is invalid. Valid values are "plain" and "S256".'
      },
      invalidCodeChallengeParams: {
        code: "pkce_params_missing",
        desc: "Both params: code_challenge and code_challenge_method are to be passed if to be sent in the request"
      },
      invalidCloudDiscoveryMetadata: {
        code: "invalid_cloud_discovery_metadata",
        desc: "Invalid cloudDiscoveryMetadata provided. Must be a JSON object containing tenant_discovery_endpoint and metadata fields"
      },
      invalidAuthorityMetadata: {
        code: "invalid_authority_metadata",
        desc: "Invalid authorityMetadata provided. Must by a JSON object containing authorization_endpoint, token_endpoint, end_session_endpoint, issuer fields."
      },
      untrustedAuthority: {
        code: "untrusted_authority",
        desc: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter."
      }
    };
    var ClientConfigurationError = function(_super) {
      __extends(ClientConfigurationError2, _super);
      function ClientConfigurationError2(errorCode, errorMessage) {
        var _this = _super.call(this, errorCode, errorMessage) || this;
        _this.name = "ClientConfigurationError";
        Object.setPrototypeOf(_this, ClientConfigurationError2.prototype);
        return _this;
      }
      ClientConfigurationError2.createRedirectUriEmptyError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.redirectUriNotSet.code, ClientConfigurationErrorMessage.redirectUriNotSet.desc);
      };
      ClientConfigurationError2.createPostLogoutRedirectUriEmptyError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.postLogoutUriNotSet.code, ClientConfigurationErrorMessage.postLogoutUriNotSet.desc);
      };
      ClientConfigurationError2.createClaimsRequestParsingError = function(claimsRequestParseError) {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.claimsRequestParsingError.code, ClientConfigurationErrorMessage.claimsRequestParsingError.desc + " Given value: " + claimsRequestParseError);
      };
      ClientConfigurationError2.createInsecureAuthorityUriError = function(urlString) {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.authorityUriInsecure.code, ClientConfigurationErrorMessage.authorityUriInsecure.desc + " Given URI: " + urlString);
      };
      ClientConfigurationError2.createUrlParseError = function(urlParseError) {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.urlParseError.code, ClientConfigurationErrorMessage.urlParseError.desc + " Given Error: " + urlParseError);
      };
      ClientConfigurationError2.createUrlEmptyError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.urlEmptyError.code, ClientConfigurationErrorMessage.urlEmptyError.desc);
      };
      ClientConfigurationError2.createEmptyScopesArrayError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.emptyScopesError.code, "" + ClientConfigurationErrorMessage.emptyScopesError.desc);
      };
      ClientConfigurationError2.createClientIdSingleScopeError = function(inputScopes) {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.clientIdSingleScopeError.code, ClientConfigurationErrorMessage.clientIdSingleScopeError.desc + " Given Scopes: " + inputScopes);
      };
      ClientConfigurationError2.createInvalidPromptError = function(promptValue) {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.invalidPrompt.code, ClientConfigurationErrorMessage.invalidPrompt.desc + " Given value: " + promptValue);
      };
      ClientConfigurationError2.createInvalidClaimsRequestError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.invalidClaimsRequest.code, ClientConfigurationErrorMessage.invalidClaimsRequest.desc);
      };
      ClientConfigurationError2.createEmptyLogoutRequestError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.logoutRequestEmptyError.code, ClientConfigurationErrorMessage.logoutRequestEmptyError.desc);
      };
      ClientConfigurationError2.createEmptyTokenRequestError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.tokenRequestEmptyError.code, ClientConfigurationErrorMessage.tokenRequestEmptyError.desc);
      };
      ClientConfigurationError2.createInvalidCodeChallengeMethodError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.invalidCodeChallengeMethod.code, ClientConfigurationErrorMessage.invalidCodeChallengeMethod.desc);
      };
      ClientConfigurationError2.createInvalidCodeChallengeParamsError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.invalidCodeChallengeParams.code, ClientConfigurationErrorMessage.invalidCodeChallengeParams.desc);
      };
      ClientConfigurationError2.createInvalidCloudDiscoveryMetadataError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.code, ClientConfigurationErrorMessage.invalidCloudDiscoveryMetadata.desc);
      };
      ClientConfigurationError2.createInvalidAuthorityMetadataError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.invalidAuthorityMetadata.code, ClientConfigurationErrorMessage.invalidAuthorityMetadata.desc);
      };
      ClientConfigurationError2.createUntrustedAuthorityError = function() {
        return new ClientConfigurationError2(ClientConfigurationErrorMessage.untrustedAuthority.code, ClientConfigurationErrorMessage.untrustedAuthority.desc);
      };
      return ClientConfigurationError2;
    }(ClientAuthError);
    var ScopeSet = function() {
      function ScopeSet2(inputScopes) {
        var _this = this;
        var scopeArr = inputScopes ? StringUtils.trimArrayEntries(__spreadArrays(inputScopes)) : [];
        var filteredInput = scopeArr ? StringUtils.removeEmptyStringsFromArray(scopeArr) : [];
        this.validateInputScopes(filteredInput);
        this.scopes = new Set();
        filteredInput.forEach(function(scope) {
          return _this.scopes.add(scope);
        });
      }
      ScopeSet2.fromString = function(inputScopeString) {
        var scopeString = inputScopeString || "";
        var inputScopes = scopeString.split(" ");
        return new ScopeSet2(inputScopes);
      };
      ScopeSet2.prototype.validateInputScopes = function(inputScopes) {
        if (!inputScopes || inputScopes.length < 1) {
          throw ClientConfigurationError.createEmptyScopesArrayError();
        }
      };
      ScopeSet2.prototype.containsScope = function(scope) {
        var lowerCaseScopes = this.printScopesLowerCase().split(" ");
        var lowerCaseScopesSet = new ScopeSet2(lowerCaseScopes);
        return !StringUtils.isEmpty(scope) ? lowerCaseScopesSet.scopes.has(scope.toLowerCase()) : false;
      };
      ScopeSet2.prototype.containsScopeSet = function(scopeSet) {
        var _this = this;
        if (!scopeSet || scopeSet.scopes.size <= 0) {
          return false;
        }
        return this.scopes.size >= scopeSet.scopes.size && scopeSet.asArray().every(function(scope) {
          return _this.containsScope(scope);
        });
      };
      ScopeSet2.prototype.containsOnlyOIDCScopes = function() {
        var _this = this;
        var defaultScopeCount = 0;
        OIDC_SCOPES.forEach(function(defaultScope) {
          if (_this.containsScope(defaultScope)) {
            defaultScopeCount += 1;
          }
        });
        return this.scopes.size === defaultScopeCount;
      };
      ScopeSet2.prototype.appendScope = function(newScope) {
        if (!StringUtils.isEmpty(newScope)) {
          this.scopes.add(newScope.trim());
        }
      };
      ScopeSet2.prototype.appendScopes = function(newScopes) {
        var _this = this;
        try {
          newScopes.forEach(function(newScope) {
            return _this.appendScope(newScope);
          });
        } catch (e) {
          throw ClientAuthError.createAppendScopeSetError(e);
        }
      };
      ScopeSet2.prototype.removeScope = function(scope) {
        if (StringUtils.isEmpty(scope)) {
          throw ClientAuthError.createRemoveEmptyScopeFromSetError(scope);
        }
        this.scopes.delete(scope.trim());
      };
      ScopeSet2.prototype.removeOIDCScopes = function() {
        var _this = this;
        OIDC_SCOPES.forEach(function(defaultScope) {
          _this.scopes.delete(defaultScope);
        });
      };
      ScopeSet2.prototype.unionScopeSets = function(otherScopes) {
        if (!otherScopes) {
          throw ClientAuthError.createEmptyInputScopeSetError();
        }
        var unionScopes = new Set();
        otherScopes.scopes.forEach(function(scope) {
          return unionScopes.add(scope.toLowerCase());
        });
        this.scopes.forEach(function(scope) {
          return unionScopes.add(scope.toLowerCase());
        });
        return unionScopes;
      };
      ScopeSet2.prototype.intersectingScopeSets = function(otherScopes) {
        if (!otherScopes) {
          throw ClientAuthError.createEmptyInputScopeSetError();
        }
        if (!otherScopes.containsOnlyOIDCScopes()) {
          otherScopes.removeOIDCScopes();
        }
        var unionScopes = this.unionScopeSets(otherScopes);
        var sizeOtherScopes = otherScopes.getScopeCount();
        var sizeThisScopes = this.getScopeCount();
        var sizeUnionScopes = unionScopes.size;
        return sizeUnionScopes < sizeThisScopes + sizeOtherScopes;
      };
      ScopeSet2.prototype.getScopeCount = function() {
        return this.scopes.size;
      };
      ScopeSet2.prototype.asArray = function() {
        var array = [];
        this.scopes.forEach(function(val) {
          return array.push(val);
        });
        return array;
      };
      ScopeSet2.prototype.printScopes = function() {
        if (this.scopes) {
          var scopeArr = this.asArray();
          return scopeArr.join(" ");
        }
        return "";
      };
      ScopeSet2.prototype.printScopesLowerCase = function() {
        return this.printScopes().toLowerCase();
      };
      return ScopeSet2;
    }();
    function buildClientInfo(rawClientInfo, crypto) {
      if (StringUtils.isEmpty(rawClientInfo)) {
        throw ClientAuthError.createClientInfoEmptyError();
      }
      try {
        var decodedClientInfo = crypto.base64Decode(rawClientInfo);
        return JSON.parse(decodedClientInfo);
      } catch (e) {
        throw ClientAuthError.createClientInfoDecodingError(e);
      }
    }
    function buildClientInfoFromHomeAccountId(homeAccountId) {
      if (StringUtils.isEmpty(homeAccountId)) {
        throw ClientAuthError.createClientInfoDecodingError("Home account ID was empty.");
      }
      var clientInfoParts = homeAccountId.split(Separators.CLIENT_INFO_SEPARATOR, 2);
      return {
        uid: clientInfoParts[0],
        utid: clientInfoParts.length < 2 ? Constants.EMPTY_STRING : clientInfoParts[1]
      };
    }
    (function(AuthorityType) {
      AuthorityType[AuthorityType["Default"] = 0] = "Default";
      AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
    })(exports.AuthorityType || (exports.AuthorityType = {}));
    var AccountEntity = function() {
      function AccountEntity2() {
      }
      AccountEntity2.prototype.generateAccountId = function() {
        var accountId = [this.homeAccountId, this.environment];
        return accountId.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
      };
      AccountEntity2.prototype.generateAccountKey = function() {
        return AccountEntity2.generateAccountCacheKey({
          homeAccountId: this.homeAccountId,
          environment: this.environment,
          tenantId: this.realm,
          username: this.username,
          localAccountId: this.localAccountId
        });
      };
      AccountEntity2.prototype.generateType = function() {
        switch (this.authorityType) {
          case exports.CacheAccountType.ADFS_ACCOUNT_TYPE:
            return exports.CacheType.ADFS;
          case exports.CacheAccountType.MSAV1_ACCOUNT_TYPE:
            return exports.CacheType.MSA;
          case exports.CacheAccountType.MSSTS_ACCOUNT_TYPE:
            return exports.CacheType.MSSTS;
          case exports.CacheAccountType.GENERIC_ACCOUNT_TYPE:
            return exports.CacheType.GENERIC;
          default: {
            throw ClientAuthError.createUnexpectedAccountTypeError();
          }
        }
      };
      AccountEntity2.prototype.getAccountInfo = function() {
        return {
          homeAccountId: this.homeAccountId,
          environment: this.environment,
          tenantId: this.realm,
          username: this.username,
          localAccountId: this.localAccountId,
          name: this.name,
          idTokenClaims: this.idTokenClaims
        };
      };
      AccountEntity2.generateAccountCacheKey = function(accountInterface) {
        var accountKey = [
          accountInterface.homeAccountId,
          accountInterface.environment || "",
          accountInterface.tenantId || ""
        ];
        return accountKey.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
      };
      AccountEntity2.createAccount = function(clientInfo, homeAccountId, authority, idToken, oboAssertion, cloudGraphHostName, msGraphHost) {
        var _a, _b, _c, _d, _e, _f;
        var account = new AccountEntity2();
        account.authorityType = exports.CacheAccountType.MSSTS_ACCOUNT_TYPE;
        account.clientInfo = clientInfo;
        account.homeAccountId = homeAccountId;
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
          throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        account.environment = env;
        account.realm = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.tid) || "";
        account.oboAssertion = oboAssertion;
        if (idToken) {
          account.idTokenClaims = idToken.claims;
          account.localAccountId = ((_b = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _b === void 0 ? void 0 : _b.oid) || ((_c = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _c === void 0 ? void 0 : _c.sub) || "";
          account.username = ((_d = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _d === void 0 ? void 0 : _d.preferred_username) || (((_e = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _e === void 0 ? void 0 : _e.emails) ? idToken.claims.emails[0] : "");
          account.name = (_f = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _f === void 0 ? void 0 : _f.name;
        }
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        return account;
      };
      AccountEntity2.createGenericAccount = function(authority, homeAccountId, idToken, oboAssertion, cloudGraphHostName, msGraphHost) {
        var _a, _b, _c, _d;
        var account = new AccountEntity2();
        account.authorityType = authority.authorityType === exports.AuthorityType.Adfs ? exports.CacheAccountType.ADFS_ACCOUNT_TYPE : exports.CacheAccountType.GENERIC_ACCOUNT_TYPE;
        account.homeAccountId = homeAccountId;
        account.realm = "";
        account.oboAssertion = oboAssertion;
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
          throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        if (idToken) {
          account.localAccountId = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.oid) || ((_b = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _b === void 0 ? void 0 : _b.sub) || "";
          account.username = ((_c = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _c === void 0 ? void 0 : _c.upn) || "";
          account.name = ((_d = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _d === void 0 ? void 0 : _d.name) || "";
          account.idTokenClaims = idToken === null || idToken === void 0 ? void 0 : idToken.claims;
        }
        account.environment = env;
        account.cloudGraphHostName = cloudGraphHostName;
        account.msGraphHost = msGraphHost;
        return account;
      };
      AccountEntity2.generateHomeAccountId = function(serverClientInfo, authType, logger, cryptoObj, idToken) {
        var _a;
        var accountId = ((_a = idToken === null || idToken === void 0 ? void 0 : idToken.claims) === null || _a === void 0 ? void 0 : _a.sub) ? idToken.claims.sub : Constants.EMPTY_STRING;
        if (authType === exports.AuthorityType.Adfs) {
          return accountId;
        }
        if (serverClientInfo) {
          try {
            var clientInfo = buildClientInfo(serverClientInfo, cryptoObj);
            if (!StringUtils.isEmpty(clientInfo.uid) && !StringUtils.isEmpty(clientInfo.utid)) {
              return "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid;
            }
          } catch (e) {
          }
        }
        logger.verbose("No client info in response");
        return accountId;
      };
      AccountEntity2.isAccountEntity = function(entity) {
        if (!entity) {
          return false;
        }
        return entity.hasOwnProperty("homeAccountId") && entity.hasOwnProperty("environment") && entity.hasOwnProperty("realm") && entity.hasOwnProperty("localAccountId") && entity.hasOwnProperty("username") && entity.hasOwnProperty("authorityType");
      };
      AccountEntity2.accountInfoIsEqual = function(accountA, accountB, compareClaims) {
        if (!accountA || !accountB) {
          return false;
        }
        var claimsMatch = true;
        if (compareClaims) {
          var accountAClaims = accountA.idTokenClaims || {};
          var accountBClaims = accountB.idTokenClaims || {};
          claimsMatch = accountAClaims.iat === accountBClaims.iat && accountAClaims.nonce === accountBClaims.nonce;
        }
        return accountA.homeAccountId === accountB.homeAccountId && accountA.localAccountId === accountB.localAccountId && accountA.username === accountB.username && accountA.tenantId === accountB.tenantId && accountA.environment === accountB.environment && claimsMatch;
      };
      return AccountEntity2;
    }();
    var AuthToken = function() {
      function AuthToken2(rawToken, crypto) {
        if (StringUtils.isEmpty(rawToken)) {
          throw ClientAuthError.createTokenNullOrEmptyError(rawToken);
        }
        this.rawToken = rawToken;
        this.claims = AuthToken2.extractTokenClaims(rawToken, crypto);
      }
      AuthToken2.extractTokenClaims = function(encodedToken, crypto) {
        var decodedToken = StringUtils.decodeAuthToken(encodedToken);
        try {
          var base64TokenPayload = decodedToken.JWSPayload;
          var base64Decoded = crypto.base64Decode(base64TokenPayload);
          return JSON.parse(base64Decoded);
        } catch (err) {
          throw ClientAuthError.createTokenParsingError(err);
        }
      };
      return AuthToken2;
    }();
    var CacheManager = function() {
      function CacheManager2(clientId, cryptoImpl) {
        this.clientId = clientId;
        this.cryptoImpl = cryptoImpl;
      }
      CacheManager2.prototype.getAllAccounts = function() {
        var _this = this;
        var currentAccounts = this.getAccountsFilteredBy();
        var accountValues = Object.keys(currentAccounts).map(function(accountKey) {
          return currentAccounts[accountKey];
        });
        var numAccounts = accountValues.length;
        if (numAccounts < 1) {
          return [];
        } else {
          var allAccounts = accountValues.map(function(value) {
            var accountEntity = CacheManager2.toObject(new AccountEntity(), value);
            var accountInfo = accountEntity.getAccountInfo();
            var idToken = _this.readIdTokenFromCache(_this.clientId, accountInfo);
            if (idToken && !accountInfo.idTokenClaims) {
              accountInfo.idTokenClaims = new AuthToken(idToken.secret, _this.cryptoImpl).claims;
            }
            return accountInfo;
          });
          return allAccounts;
        }
      };
      CacheManager2.prototype.saveCacheRecord = function(cacheRecord) {
        if (!cacheRecord) {
          throw ClientAuthError.createNullOrUndefinedCacheRecord();
        }
        if (!!cacheRecord.account) {
          this.setAccount(cacheRecord.account);
        }
        if (!!cacheRecord.idToken) {
          this.setIdTokenCredential(cacheRecord.idToken);
        }
        if (!!cacheRecord.accessToken) {
          this.saveAccessToken(cacheRecord.accessToken);
        }
        if (!!cacheRecord.refreshToken) {
          this.setRefreshTokenCredential(cacheRecord.refreshToken);
        }
        if (!!cacheRecord.appMetadata) {
          this.setAppMetadata(cacheRecord.appMetadata);
        }
      };
      CacheManager2.prototype.saveAccessToken = function(credential) {
        var _this = this;
        var currentTokenCache = this.getCredentialsFilteredBy({
          clientId: credential.clientId,
          credentialType: credential.credentialType,
          environment: credential.environment,
          homeAccountId: credential.homeAccountId,
          realm: credential.realm
        });
        var currentScopes = ScopeSet.fromString(credential.target);
        var currentAccessTokens = Object.keys(currentTokenCache.accessTokens).map(function(key) {
          return currentTokenCache.accessTokens[key];
        });
        if (currentAccessTokens) {
          currentAccessTokens.forEach(function(tokenEntity) {
            var tokenScopeSet = ScopeSet.fromString(tokenEntity.target);
            if (tokenScopeSet.intersectingScopeSets(currentScopes)) {
              _this.removeCredential(tokenEntity);
            }
          });
        }
        this.setAccessTokenCredential(credential);
      };
      CacheManager2.prototype.getAccountsFilteredBy = function(accountFilter) {
        return this.getAccountsFilteredByInternal(accountFilter ? accountFilter.homeAccountId : "", accountFilter ? accountFilter.environment : "", accountFilter ? accountFilter.realm : "");
      };
      CacheManager2.prototype.getAccountsFilteredByInternal = function(homeAccountId, environment, realm) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingAccounts = {};
        allCacheKeys.forEach(function(cacheKey) {
          var entity = _this.getAccount(cacheKey);
          if (!entity) {
            return;
          }
          if (!!homeAccountId && !_this.matchHomeAccountId(entity, homeAccountId)) {
            return;
          }
          if (!!environment && !_this.matchEnvironment(entity, environment)) {
            return;
          }
          if (!!realm && !_this.matchRealm(entity, realm)) {
            return;
          }
          matchingAccounts[cacheKey] = entity;
        });
        return matchingAccounts;
      };
      CacheManager2.prototype.getCredentialsFilteredBy = function(filter) {
        return this.getCredentialsFilteredByInternal(filter.homeAccountId, filter.environment, filter.credentialType, filter.clientId, filter.familyId, filter.realm, filter.target, filter.oboAssertion);
      };
      CacheManager2.prototype.getCredentialsFilteredByInternal = function(homeAccountId, environment, credentialType, clientId, familyId, realm, target, oboAssertion) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingCredentials = {
          idTokens: {},
          accessTokens: {},
          refreshTokens: {}
        };
        allCacheKeys.forEach(function(cacheKey) {
          var credType = CredentialEntity.getCredentialType(cacheKey);
          if (credType === Constants.NOT_DEFINED) {
            return;
          }
          var entity = _this.getSpecificCredential(cacheKey, credType);
          if (!entity) {
            return;
          }
          if (!!oboAssertion && !_this.matchOboAssertion(entity, oboAssertion)) {
            return;
          }
          if (!!homeAccountId && !_this.matchHomeAccountId(entity, homeAccountId)) {
            return;
          }
          if (!!environment && !_this.matchEnvironment(entity, environment)) {
            return;
          }
          if (!!realm && !_this.matchRealm(entity, realm)) {
            return;
          }
          if (!!credentialType && !_this.matchCredentialType(entity, credentialType)) {
            return;
          }
          if (!!clientId && !_this.matchClientId(entity, clientId)) {
            return;
          }
          if (!!familyId && !_this.matchFamilyId(entity, familyId)) {
            return;
          }
          if (!!target && !_this.matchTarget(entity, target)) {
            return;
          }
          switch (credType) {
            case exports.CredentialType.ID_TOKEN:
              matchingCredentials.idTokens[cacheKey] = entity;
              break;
            case exports.CredentialType.ACCESS_TOKEN:
            case exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME:
              matchingCredentials.accessTokens[cacheKey] = entity;
              break;
            case exports.CredentialType.REFRESH_TOKEN:
              matchingCredentials.refreshTokens[cacheKey] = entity;
              break;
          }
        });
        return matchingCredentials;
      };
      CacheManager2.prototype.getAppMetadataFilteredBy = function(filter) {
        return this.getAppMetadataFilteredByInternal(filter.environment, filter.clientId);
      };
      CacheManager2.prototype.getAppMetadataFilteredByInternal = function(environment, clientId) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var matchingAppMetadata = {};
        allCacheKeys.forEach(function(cacheKey) {
          if (!_this.isAppMetadata(cacheKey)) {
            return;
          }
          var entity = _this.getAppMetadata(cacheKey);
          if (!entity) {
            return;
          }
          if (!!environment && !_this.matchEnvironment(entity, environment)) {
            return;
          }
          if (!!clientId && !_this.matchClientId(entity, clientId)) {
            return;
          }
          matchingAppMetadata[cacheKey] = entity;
        });
        return matchingAppMetadata;
      };
      CacheManager2.prototype.getAuthorityMetadataByAlias = function(host) {
        var _this = this;
        var allCacheKeys = this.getAuthorityMetadataKeys();
        var matchedEntity = null;
        allCacheKeys.forEach(function(cacheKey) {
          if (!_this.isAuthorityMetadata(cacheKey) || cacheKey.indexOf(_this.clientId) === -1) {
            return;
          }
          var entity = _this.getAuthorityMetadata(cacheKey);
          if (!entity) {
            return;
          }
          if (entity.aliases.indexOf(host) === -1) {
            return;
          }
          matchedEntity = entity;
        });
        return matchedEntity;
      };
      CacheManager2.prototype.removeAllAccounts = function() {
        var _this = this;
        var allCacheKeys = this.getKeys();
        allCacheKeys.forEach(function(cacheKey) {
          var entity = _this.getAccount(cacheKey);
          if (!entity) {
            return;
          }
          _this.removeAccount(cacheKey);
        });
        return true;
      };
      CacheManager2.prototype.removeAccount = function(accountKey) {
        var account = this.getAccount(accountKey);
        if (!account) {
          throw ClientAuthError.createNoAccountFoundError();
        }
        return this.removeAccountContext(account) && this.removeItem(accountKey, exports.CacheSchemaType.ACCOUNT);
      };
      CacheManager2.prototype.removeAccountContext = function(account) {
        var _this = this;
        var allCacheKeys = this.getKeys();
        var accountId = account.generateAccountId();
        allCacheKeys.forEach(function(cacheKey) {
          var credType = CredentialEntity.getCredentialType(cacheKey);
          if (credType === Constants.NOT_DEFINED) {
            return;
          }
          var cacheEntity = _this.getSpecificCredential(cacheKey, credType);
          if (!!cacheEntity && accountId === cacheEntity.generateAccountId()) {
            _this.removeCredential(cacheEntity);
          }
        });
        return true;
      };
      CacheManager2.prototype.removeCredential = function(credential) {
        var key = credential.generateCredentialKey();
        return this.removeItem(key, exports.CacheSchemaType.CREDENTIAL);
      };
      CacheManager2.prototype.removeAppMetadata = function() {
        var _this = this;
        var allCacheKeys = this.getKeys();
        allCacheKeys.forEach(function(cacheKey) {
          if (_this.isAppMetadata(cacheKey)) {
            _this.removeItem(cacheKey, exports.CacheSchemaType.APP_METADATA);
          }
        });
        return true;
      };
      CacheManager2.prototype.readCacheRecord = function(account, clientId, scopes, environment, authScheme) {
        var cachedAccount = this.readAccountFromCache(account);
        var cachedIdToken = this.readIdTokenFromCache(clientId, account);
        var cachedAccessToken = this.readAccessTokenFromCache(clientId, account, scopes, authScheme);
        var cachedRefreshToken = this.readRefreshTokenFromCache(clientId, account, false);
        var cachedAppMetadata = this.readAppMetadataFromCache(environment, clientId);
        if (cachedAccount && cachedIdToken) {
          cachedAccount.idTokenClaims = new AuthToken(cachedIdToken.secret, this.cryptoImpl).claims;
        }
        return {
          account: cachedAccount,
          idToken: cachedIdToken,
          accessToken: cachedAccessToken,
          refreshToken: cachedRefreshToken,
          appMetadata: cachedAppMetadata
        };
      };
      CacheManager2.prototype.readAccountFromCache = function(account) {
        var accountKey = AccountEntity.generateAccountCacheKey(account);
        return this.getAccount(accountKey);
      };
      CacheManager2.prototype.readIdTokenFromCache = function(clientId, account) {
        var idTokenFilter = {
          homeAccountId: account.homeAccountId,
          environment: account.environment,
          credentialType: exports.CredentialType.ID_TOKEN,
          clientId,
          realm: account.tenantId
        };
        var credentialCache = this.getCredentialsFilteredBy(idTokenFilter);
        var idTokens = Object.keys(credentialCache.idTokens).map(function(key) {
          return credentialCache.idTokens[key];
        });
        var numIdTokens = idTokens.length;
        if (numIdTokens < 1) {
          return null;
        } else if (numIdTokens > 1) {
          throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return idTokens[0];
      };
      CacheManager2.prototype.readAccessTokenFromCache = function(clientId, account, scopes, authScheme) {
        var credentialType = authScheme === exports.AuthenticationScheme.POP ? exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME : exports.CredentialType.ACCESS_TOKEN;
        var accessTokenFilter = {
          homeAccountId: account.homeAccountId,
          environment: account.environment,
          credentialType,
          clientId,
          realm: account.tenantId,
          target: scopes.printScopesLowerCase()
        };
        var credentialCache = this.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function(key) {
          return credentialCache.accessTokens[key];
        });
        var numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
          return null;
        } else if (numAccessTokens > 1) {
          throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
      };
      CacheManager2.prototype.readRefreshTokenFromCache = function(clientId, account, familyRT) {
        var id = familyRT ? THE_FAMILY_ID : void 0;
        var refreshTokenFilter = {
          homeAccountId: account.homeAccountId,
          environment: account.environment,
          credentialType: exports.CredentialType.REFRESH_TOKEN,
          clientId,
          familyId: id
        };
        var credentialCache = this.getCredentialsFilteredBy(refreshTokenFilter);
        var refreshTokens = Object.keys(credentialCache.refreshTokens).map(function(key) {
          return credentialCache.refreshTokens[key];
        });
        var numRefreshTokens = refreshTokens.length;
        if (numRefreshTokens < 1) {
          return null;
        }
        return refreshTokens[0];
      };
      CacheManager2.prototype.readAppMetadataFromCache = function(environment, clientId) {
        var appMetadataFilter = {
          environment,
          clientId
        };
        var appMetadata = this.getAppMetadataFilteredBy(appMetadataFilter);
        var appMetadataEntries = Object.keys(appMetadata).map(function(key) {
          return appMetadata[key];
        });
        var numAppMetadata = appMetadataEntries.length;
        if (numAppMetadata < 1) {
          return null;
        } else if (numAppMetadata > 1) {
          throw ClientAuthError.createMultipleMatchingAppMetadataInCacheError();
        }
        return appMetadataEntries[0];
      };
      CacheManager2.prototype.isAppMetadataFOCI = function(environment, clientId) {
        var appMetadata = this.readAppMetadataFromCache(environment, clientId);
        return !!(appMetadata && appMetadata.familyId === THE_FAMILY_ID);
      };
      CacheManager2.prototype.matchHomeAccountId = function(entity, homeAccountId) {
        return !!(entity.homeAccountId && homeAccountId === entity.homeAccountId);
      };
      CacheManager2.prototype.matchOboAssertion = function(entity, oboAssertion) {
        return !!(entity.oboAssertion && oboAssertion === entity.oboAssertion);
      };
      CacheManager2.prototype.matchEnvironment = function(entity, environment) {
        var cloudMetadata = this.getAuthorityMetadataByAlias(environment);
        if (cloudMetadata && cloudMetadata.aliases.indexOf(entity.environment) > -1) {
          return true;
        }
        return false;
      };
      CacheManager2.prototype.matchCredentialType = function(entity, credentialType) {
        return entity.credentialType && credentialType.toLowerCase() === entity.credentialType.toLowerCase();
      };
      CacheManager2.prototype.matchClientId = function(entity, clientId) {
        return !!(entity.clientId && clientId === entity.clientId);
      };
      CacheManager2.prototype.matchFamilyId = function(entity, familyId) {
        return !!(entity.familyId && familyId === entity.familyId);
      };
      CacheManager2.prototype.matchRealm = function(entity, realm) {
        return !!(entity.realm && realm === entity.realm);
      };
      CacheManager2.prototype.matchTarget = function(entity, target) {
        var isNotAccessTokenCredential = entity.credentialType !== exports.CredentialType.ACCESS_TOKEN && entity.credentialType !== exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
        if (isNotAccessTokenCredential || !entity.target) {
          return false;
        }
        var entityScopeSet = ScopeSet.fromString(entity.target);
        var requestTargetScopeSet = ScopeSet.fromString(target);
        if (!requestTargetScopeSet.containsOnlyOIDCScopes()) {
          requestTargetScopeSet.removeOIDCScopes();
        } else {
          requestTargetScopeSet.removeScope(Constants.OFFLINE_ACCESS_SCOPE);
        }
        return entityScopeSet.containsScopeSet(requestTargetScopeSet);
      };
      CacheManager2.prototype.isAppMetadata = function(key) {
        return key.indexOf(APP_METADATA) !== -1;
      };
      CacheManager2.prototype.isAuthorityMetadata = function(key) {
        return key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) !== -1;
      };
      CacheManager2.prototype.generateAuthorityMetadataCacheKey = function(authority) {
        return AUTHORITY_METADATA_CONSTANTS.CACHE_KEY + "-" + this.clientId + "-" + authority;
      };
      CacheManager2.prototype.getSpecificCredential = function(key, credType) {
        switch (credType) {
          case exports.CredentialType.ID_TOKEN: {
            return this.getIdTokenCredential(key);
          }
          case exports.CredentialType.ACCESS_TOKEN:
          case exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME: {
            return this.getAccessTokenCredential(key);
          }
          case exports.CredentialType.REFRESH_TOKEN: {
            return this.getRefreshTokenCredential(key);
          }
          default:
            return null;
        }
      };
      CacheManager2.toObject = function(obj, json) {
        for (var propertyName in json) {
          obj[propertyName] = json[propertyName];
        }
        return obj;
      };
      return CacheManager2;
    }();
    var DefaultStorageClass = function(_super) {
      __extends(DefaultStorageClass2, _super);
      function DefaultStorageClass2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      DefaultStorageClass2.prototype.setAccount = function() {
        var notImplErr = "Storage interface - setAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getAccount = function() {
        var notImplErr = "Storage interface - getAccount() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.setIdTokenCredential = function() {
        var notImplErr = "Storage interface - setIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getIdTokenCredential = function() {
        var notImplErr = "Storage interface - getIdTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.setAccessTokenCredential = function() {
        var notImplErr = "Storage interface - setAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getAccessTokenCredential = function() {
        var notImplErr = "Storage interface - getAccessTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.setRefreshTokenCredential = function() {
        var notImplErr = "Storage interface - setRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getRefreshTokenCredential = function() {
        var notImplErr = "Storage interface - getRefreshTokenCredential() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.setAppMetadata = function() {
        var notImplErr = "Storage interface - setAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getAppMetadata = function() {
        var notImplErr = "Storage interface - getAppMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.setServerTelemetry = function() {
        var notImplErr = "Storage interface - setServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getServerTelemetry = function() {
        var notImplErr = "Storage interface - getServerTelemetry() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.setAuthorityMetadata = function() {
        var notImplErr = "Storage interface - setAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getAuthorityMetadata = function() {
        var notImplErr = "Storage interface - getAuthorityMetadata() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getAuthorityMetadataKeys = function() {
        var notImplErr = "Storage interface - getAuthorityMetadataKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.setThrottlingCache = function() {
        var notImplErr = "Storage interface - setThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getThrottlingCache = function() {
        var notImplErr = "Storage interface - getThrottlingCache() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.removeItem = function() {
        var notImplErr = "Storage interface - removeItem() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.containsKey = function() {
        var notImplErr = "Storage interface - containsKey() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.getKeys = function() {
        var notImplErr = "Storage interface - getKeys() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      DefaultStorageClass2.prototype.clear = function() {
        var notImplErr = "Storage interface - clear() has not been implemented for the cacheStorage interface.";
        throw AuthError.createUnexpectedError(notImplErr);
      };
      return DefaultStorageClass2;
    }(CacheManager);
    var DEFAULT_TOKEN_RENEWAL_OFFSET_SEC = 300;
    var DEFAULT_SYSTEM_OPTIONS = {
      tokenRenewalOffsetSeconds: DEFAULT_TOKEN_RENEWAL_OFFSET_SEC,
      preventCorsPreflight: false
    };
    var DEFAULT_LOGGER_IMPLEMENTATION = {
      loggerCallback: function() {
      },
      piiLoggingEnabled: false,
      logLevel: exports.LogLevel.Info,
      correlationId: ""
    };
    var DEFAULT_NETWORK_IMPLEMENTATION = {
      sendGetRequestAsync: function() {
        return __awaiter(this, void 0, void 0, function() {
          var notImplErr;
          return __generator(this, function(_a) {
            notImplErr = "Network interface - sendGetRequestAsync() has not been implemented";
            throw AuthError.createUnexpectedError(notImplErr);
          });
        });
      },
      sendPostRequestAsync: function() {
        return __awaiter(this, void 0, void 0, function() {
          var notImplErr;
          return __generator(this, function(_a) {
            notImplErr = "Network interface - sendPostRequestAsync() has not been implemented";
            throw AuthError.createUnexpectedError(notImplErr);
          });
        });
      }
    };
    var DEFAULT_LIBRARY_INFO = {
      sku: Constants.SKU,
      version,
      cpu: "",
      os: ""
    };
    var DEFAULT_CLIENT_CREDENTIALS = {
      clientSecret: "",
      clientAssertion: void 0
    };
    function buildClientConfiguration(_a) {
      var userAuthOptions = _a.authOptions, userSystemOptions = _a.systemOptions, userLoggerOption = _a.loggerOptions, storageImplementation = _a.storageInterface, networkImplementation = _a.networkInterface, cryptoImplementation = _a.cryptoInterface, clientCredentials = _a.clientCredentials, libraryInfo = _a.libraryInfo, serverTelemetryManager = _a.serverTelemetryManager, persistencePlugin = _a.persistencePlugin, serializableCache = _a.serializableCache;
      return {
        authOptions: buildAuthOptions(userAuthOptions),
        systemOptions: __assign(__assign({}, DEFAULT_SYSTEM_OPTIONS), userSystemOptions),
        loggerOptions: __assign(__assign({}, DEFAULT_LOGGER_IMPLEMENTATION), userLoggerOption),
        storageInterface: storageImplementation || new DefaultStorageClass(userAuthOptions.clientId, DEFAULT_CRYPTO_IMPLEMENTATION),
        networkInterface: networkImplementation || DEFAULT_NETWORK_IMPLEMENTATION,
        cryptoInterface: cryptoImplementation || DEFAULT_CRYPTO_IMPLEMENTATION,
        clientCredentials: clientCredentials || DEFAULT_CLIENT_CREDENTIALS,
        libraryInfo: __assign(__assign({}, DEFAULT_LIBRARY_INFO), libraryInfo),
        serverTelemetryManager: serverTelemetryManager || null,
        persistencePlugin: persistencePlugin || null,
        serializableCache: serializableCache || null
      };
    }
    function buildAuthOptions(authOptions) {
      return __assign({ clientCapabilities: [] }, authOptions);
    }
    var ServerError = function(_super) {
      __extends(ServerError2, _super);
      function ServerError2(errorCode, errorMessage, subError) {
        var _this = _super.call(this, errorCode, errorMessage, subError) || this;
        _this.name = "ServerError";
        Object.setPrototypeOf(_this, ServerError2.prototype);
        return _this;
      }
      return ServerError2;
    }(AuthError);
    var ThrottlingUtils = function() {
      function ThrottlingUtils2() {
      }
      ThrottlingUtils2.generateThrottlingStorageKey = function(thumbprint) {
        return ThrottlingConstants.THROTTLING_PREFIX + "." + JSON.stringify(thumbprint);
      };
      ThrottlingUtils2.preProcess = function(cacheManager, thumbprint) {
        var _a;
        var key = ThrottlingUtils2.generateThrottlingStorageKey(thumbprint);
        var value = cacheManager.getThrottlingCache(key);
        if (value) {
          if (value.throttleTime < Date.now()) {
            cacheManager.removeItem(key, exports.CacheSchemaType.THROTTLING);
            return;
          }
          throw new ServerError(((_a = value.errorCodes) === null || _a === void 0 ? void 0 : _a.join(" ")) || Constants.EMPTY_STRING, value.errorMessage, value.subError);
        }
      };
      ThrottlingUtils2.postProcess = function(cacheManager, thumbprint, response) {
        if (ThrottlingUtils2.checkResponseStatus(response) || ThrottlingUtils2.checkResponseForRetryAfter(response)) {
          var thumbprintValue = {
            throttleTime: ThrottlingUtils2.calculateThrottleTime(parseInt(response.headers[HeaderNames.RETRY_AFTER])),
            error: response.body.error,
            errorCodes: response.body.error_codes,
            errorMessage: response.body.error_description,
            subError: response.body.suberror
          };
          cacheManager.setThrottlingCache(ThrottlingUtils2.generateThrottlingStorageKey(thumbprint), thumbprintValue);
        }
      };
      ThrottlingUtils2.checkResponseStatus = function(response) {
        return response.status === 429 || response.status >= 500 && response.status < 600;
      };
      ThrottlingUtils2.checkResponseForRetryAfter = function(response) {
        if (response.headers) {
          return response.headers.hasOwnProperty(HeaderNames.RETRY_AFTER) && (response.status < 200 || response.status >= 300);
        }
        return false;
      };
      ThrottlingUtils2.calculateThrottleTime = function(throttleTime) {
        var time = throttleTime <= 0 ? 0 : throttleTime;
        var currentSeconds = Date.now() / 1e3;
        return Math.floor(Math.min(currentSeconds + (time || ThrottlingConstants.DEFAULT_THROTTLE_TIME_SECONDS), currentSeconds + ThrottlingConstants.DEFAULT_MAX_THROTTLE_TIME_SECONDS) * 1e3);
      };
      ThrottlingUtils2.removeThrottle = function(cacheManager, clientId, authority, scopes, homeAccountIdentifier) {
        var thumbprint = {
          clientId,
          authority,
          scopes,
          homeAccountIdentifier
        };
        var key = this.generateThrottlingStorageKey(thumbprint);
        return cacheManager.removeItem(key, exports.CacheSchemaType.THROTTLING);
      };
      return ThrottlingUtils2;
    }();
    var NetworkManager = function() {
      function NetworkManager2(networkClient, cacheManager) {
        this.networkClient = networkClient;
        this.cacheManager = cacheManager;
      }
      NetworkManager2.prototype.sendPostRequest = function(thumbprint, tokenEndpoint, options) {
        return __awaiter(this, void 0, void 0, function() {
          var response, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                ThrottlingUtils.preProcess(this.cacheManager, thumbprint);
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, this.networkClient.sendPostRequestAsync(tokenEndpoint, options)];
              case 2:
                response = _a.sent();
                return [3, 4];
              case 3:
                e_1 = _a.sent();
                if (e_1 instanceof AuthError) {
                  throw e_1;
                } else {
                  throw ClientAuthError.createNetworkError(tokenEndpoint, e_1);
                }
              case 4:
                ThrottlingUtils.postProcess(this.cacheManager, thumbprint, response);
                return [2, response];
            }
          });
        });
      };
      return NetworkManager2;
    }();
    (function(CcsCredentialType) {
      CcsCredentialType["HOME_ACCOUNT_ID"] = "home_account_id";
      CcsCredentialType["UPN"] = "UPN";
    })(exports.CcsCredentialType || (exports.CcsCredentialType = {}));
    var BaseClient = function() {
      function BaseClient2(configuration) {
        this.config = buildClientConfiguration(configuration);
        this.logger = new Logger(this.config.loggerOptions, name, version);
        this.cryptoUtils = this.config.cryptoInterface;
        this.cacheManager = this.config.storageInterface;
        this.networkClient = this.config.networkInterface;
        this.networkManager = new NetworkManager(this.networkClient, this.cacheManager);
        this.serverTelemetryManager = this.config.serverTelemetryManager;
        this.authority = this.config.authOptions.authority;
      }
      BaseClient2.prototype.createTokenRequestHeaders = function(ccsCred) {
        var headers = {};
        headers[HeaderNames.CONTENT_TYPE] = Constants.URL_FORM_CONTENT_TYPE;
        if (!this.config.systemOptions.preventCorsPreflight && ccsCred) {
          switch (ccsCred.type) {
            case exports.CcsCredentialType.HOME_ACCOUNT_ID:
              try {
                var clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                headers[HeaderNames.CCS_HEADER] = "Oid:" + clientInfo.uid + "@" + clientInfo.utid;
              } catch (e) {
                this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
              }
              break;
            case exports.CcsCredentialType.UPN:
              headers[HeaderNames.CCS_HEADER] = "UPN: " + ccsCred.credential;
              break;
          }
        }
        return headers;
      };
      BaseClient2.prototype.executePostToTokenEndpoint = function(tokenEndpoint, queryString, headers, thumbprint) {
        return __awaiter(this, void 0, void 0, function() {
          var response;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.networkManager.sendPostRequest(thumbprint, tokenEndpoint, { body: queryString, headers })];
              case 1:
                response = _a.sent();
                if (this.config.serverTelemetryManager && response.status < 500 && response.status !== 429) {
                  this.config.serverTelemetryManager.clearTelemetryCache();
                }
                return [2, response];
            }
          });
        });
      };
      BaseClient2.prototype.updateAuthority = function(updatedAuthority) {
        if (!updatedAuthority.discoveryComplete()) {
          throw ClientAuthError.createEndpointDiscoveryIncompleteError("Updated authority has not completed endpoint discovery.");
        }
        this.authority = updatedAuthority;
      };
      return BaseClient2;
    }();
    var RequestValidator = function() {
      function RequestValidator2() {
      }
      RequestValidator2.validateRedirectUri = function(redirectUri) {
        if (StringUtils.isEmpty(redirectUri)) {
          throw ClientConfigurationError.createRedirectUriEmptyError();
        }
      };
      RequestValidator2.validatePrompt = function(prompt) {
        var promptValues = [];
        for (var value in PromptValue) {
          promptValues.push(PromptValue[value]);
        }
        if (promptValues.indexOf(prompt) < 0) {
          throw ClientConfigurationError.createInvalidPromptError(prompt);
        }
      };
      RequestValidator2.validateClaims = function(claims) {
        try {
          JSON.parse(claims);
        } catch (e) {
          throw ClientConfigurationError.createInvalidClaimsRequestError();
        }
      };
      RequestValidator2.validateCodeChallengeParams = function(codeChallenge, codeChallengeMethod) {
        if (StringUtils.isEmpty(codeChallenge) || StringUtils.isEmpty(codeChallengeMethod)) {
          throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        } else {
          this.validateCodeChallengeMethod(codeChallengeMethod);
        }
      };
      RequestValidator2.validateCodeChallengeMethod = function(codeChallengeMethod) {
        if ([
          CodeChallengeMethodValues.PLAIN,
          CodeChallengeMethodValues.S256
        ].indexOf(codeChallengeMethod) < 0) {
          throw ClientConfigurationError.createInvalidCodeChallengeMethodError();
        }
      };
      RequestValidator2.sanitizeEQParams = function(eQParams, queryParams) {
        if (!eQParams) {
          return {};
        }
        queryParams.forEach(function(value, key) {
          if (eQParams[key]) {
            delete eQParams[key];
          }
        });
        return eQParams;
      };
      return RequestValidator2;
    }();
    var RequestParameterBuilder = function() {
      function RequestParameterBuilder2() {
        this.parameters = new Map();
      }
      RequestParameterBuilder2.prototype.addResponseTypeCode = function() {
        this.parameters.set(AADServerParamKeys.RESPONSE_TYPE, encodeURIComponent(Constants.CODE_RESPONSE_TYPE));
      };
      RequestParameterBuilder2.prototype.addResponseMode = function(responseMode) {
        this.parameters.set(AADServerParamKeys.RESPONSE_MODE, encodeURIComponent(responseMode ? responseMode : exports.ResponseMode.QUERY));
      };
      RequestParameterBuilder2.prototype.addScopes = function(scopes, addOidcScopes) {
        if (addOidcScopes === void 0) {
          addOidcScopes = true;
        }
        var requestScopes = addOidcScopes ? __spreadArrays(scopes || [], OIDC_DEFAULT_SCOPES) : scopes || [];
        var scopeSet = new ScopeSet(requestScopes);
        this.parameters.set(AADServerParamKeys.SCOPE, encodeURIComponent(scopeSet.printScopes()));
      };
      RequestParameterBuilder2.prototype.addClientId = function(clientId) {
        this.parameters.set(AADServerParamKeys.CLIENT_ID, encodeURIComponent(clientId));
      };
      RequestParameterBuilder2.prototype.addRedirectUri = function(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.REDIRECT_URI, encodeURIComponent(redirectUri));
      };
      RequestParameterBuilder2.prototype.addPostLogoutRedirectUri = function(redirectUri) {
        RequestValidator.validateRedirectUri(redirectUri);
        this.parameters.set(AADServerParamKeys.POST_LOGOUT_URI, encodeURIComponent(redirectUri));
      };
      RequestParameterBuilder2.prototype.addIdTokenHint = function(idTokenHint) {
        this.parameters.set(AADServerParamKeys.ID_TOKEN_HINT, encodeURIComponent(idTokenHint));
      };
      RequestParameterBuilder2.prototype.addDomainHint = function(domainHint) {
        this.parameters.set(SSOTypes.DOMAIN_HINT, encodeURIComponent(domainHint));
      };
      RequestParameterBuilder2.prototype.addLoginHint = function(loginHint) {
        this.parameters.set(SSOTypes.LOGIN_HINT, encodeURIComponent(loginHint));
      };
      RequestParameterBuilder2.prototype.addCcsUpn = function(loginHint) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent("UPN:" + loginHint));
      };
      RequestParameterBuilder2.prototype.addCcsOid = function(clientInfo) {
        this.parameters.set(HeaderNames.CCS_HEADER, encodeURIComponent("Oid:" + clientInfo.uid + "@" + clientInfo.utid));
      };
      RequestParameterBuilder2.prototype.addSid = function(sid) {
        this.parameters.set(SSOTypes.SID, encodeURIComponent(sid));
      };
      RequestParameterBuilder2.prototype.addClaims = function(claims, clientCapabilities) {
        var mergedClaims = this.addClientCapabilitiesToClaims(claims, clientCapabilities);
        RequestValidator.validateClaims(mergedClaims);
        this.parameters.set(AADServerParamKeys.CLAIMS, encodeURIComponent(mergedClaims));
      };
      RequestParameterBuilder2.prototype.addCorrelationId = function(correlationId) {
        this.parameters.set(AADServerParamKeys.CLIENT_REQUEST_ID, encodeURIComponent(correlationId));
      };
      RequestParameterBuilder2.prototype.addLibraryInfo = function(libraryInfo) {
        this.parameters.set(AADServerParamKeys.X_CLIENT_SKU, libraryInfo.sku);
        this.parameters.set(AADServerParamKeys.X_CLIENT_VER, libraryInfo.version);
        this.parameters.set(AADServerParamKeys.X_CLIENT_OS, libraryInfo.os);
        this.parameters.set(AADServerParamKeys.X_CLIENT_CPU, libraryInfo.cpu);
      };
      RequestParameterBuilder2.prototype.addPrompt = function(prompt) {
        RequestValidator.validatePrompt(prompt);
        this.parameters.set("" + AADServerParamKeys.PROMPT, encodeURIComponent(prompt));
      };
      RequestParameterBuilder2.prototype.addState = function(state) {
        if (!StringUtils.isEmpty(state)) {
          this.parameters.set(AADServerParamKeys.STATE, encodeURIComponent(state));
        }
      };
      RequestParameterBuilder2.prototype.addNonce = function(nonce) {
        this.parameters.set(AADServerParamKeys.NONCE, encodeURIComponent(nonce));
      };
      RequestParameterBuilder2.prototype.addCodeChallengeParams = function(codeChallenge, codeChallengeMethod) {
        RequestValidator.validateCodeChallengeParams(codeChallenge, codeChallengeMethod);
        if (codeChallenge && codeChallengeMethod) {
          this.parameters.set(AADServerParamKeys.CODE_CHALLENGE, encodeURIComponent(codeChallenge));
          this.parameters.set(AADServerParamKeys.CODE_CHALLENGE_METHOD, encodeURIComponent(codeChallengeMethod));
        } else {
          throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
      };
      RequestParameterBuilder2.prototype.addAuthorizationCode = function(code) {
        this.parameters.set(AADServerParamKeys.CODE, encodeURIComponent(code));
      };
      RequestParameterBuilder2.prototype.addDeviceCode = function(code) {
        this.parameters.set(AADServerParamKeys.DEVICE_CODE, encodeURIComponent(code));
      };
      RequestParameterBuilder2.prototype.addRefreshToken = function(refreshToken) {
        this.parameters.set(AADServerParamKeys.REFRESH_TOKEN, encodeURIComponent(refreshToken));
      };
      RequestParameterBuilder2.prototype.addCodeVerifier = function(codeVerifier) {
        this.parameters.set(AADServerParamKeys.CODE_VERIFIER, encodeURIComponent(codeVerifier));
      };
      RequestParameterBuilder2.prototype.addClientSecret = function(clientSecret) {
        this.parameters.set(AADServerParamKeys.CLIENT_SECRET, encodeURIComponent(clientSecret));
      };
      RequestParameterBuilder2.prototype.addClientAssertion = function(clientAssertion) {
        this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION, encodeURIComponent(clientAssertion));
      };
      RequestParameterBuilder2.prototype.addClientAssertionType = function(clientAssertionType) {
        this.parameters.set(AADServerParamKeys.CLIENT_ASSERTION_TYPE, encodeURIComponent(clientAssertionType));
      };
      RequestParameterBuilder2.prototype.addOboAssertion = function(oboAssertion) {
        this.parameters.set(AADServerParamKeys.OBO_ASSERTION, encodeURIComponent(oboAssertion));
      };
      RequestParameterBuilder2.prototype.addRequestTokenUse = function(tokenUse) {
        this.parameters.set(AADServerParamKeys.REQUESTED_TOKEN_USE, encodeURIComponent(tokenUse));
      };
      RequestParameterBuilder2.prototype.addGrantType = function(grantType) {
        this.parameters.set(AADServerParamKeys.GRANT_TYPE, encodeURIComponent(grantType));
      };
      RequestParameterBuilder2.prototype.addClientInfo = function() {
        this.parameters.set(CLIENT_INFO, "1");
      };
      RequestParameterBuilder2.prototype.addExtraQueryParameters = function(eQparams) {
        var _this = this;
        RequestValidator.sanitizeEQParams(eQparams, this.parameters);
        Object.keys(eQparams).forEach(function(key) {
          _this.parameters.set(key, eQparams[key]);
        });
      };
      RequestParameterBuilder2.prototype.addClientCapabilitiesToClaims = function(claims, clientCapabilities) {
        var mergedClaims;
        if (!claims) {
          mergedClaims = {};
        } else {
          try {
            mergedClaims = JSON.parse(claims);
          } catch (e) {
            throw ClientConfigurationError.createInvalidClaimsRequestError();
          }
        }
        if (clientCapabilities && clientCapabilities.length > 0) {
          if (!mergedClaims.hasOwnProperty(ClaimsRequestKeys.ACCESS_TOKEN)) {
            mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN] = {};
          }
          mergedClaims[ClaimsRequestKeys.ACCESS_TOKEN][ClaimsRequestKeys.XMS_CC] = {
            values: clientCapabilities
          };
        }
        return JSON.stringify(mergedClaims);
      };
      RequestParameterBuilder2.prototype.addUsername = function(username) {
        this.parameters.set(PasswordGrantConstants.username, username);
      };
      RequestParameterBuilder2.prototype.addPassword = function(password) {
        this.parameters.set(PasswordGrantConstants.password, password);
      };
      RequestParameterBuilder2.prototype.addPopToken = function(cnfString) {
        if (!StringUtils.isEmpty(cnfString)) {
          this.parameters.set(AADServerParamKeys.TOKEN_TYPE, exports.AuthenticationScheme.POP);
          this.parameters.set(AADServerParamKeys.REQ_CNF, encodeURIComponent(cnfString));
        }
      };
      RequestParameterBuilder2.prototype.addServerTelemetry = function(serverTelemetryManager) {
        this.parameters.set(AADServerParamKeys.X_CLIENT_CURR_TELEM, serverTelemetryManager.generateCurrentRequestHeaderValue());
        this.parameters.set(AADServerParamKeys.X_CLIENT_LAST_TELEM, serverTelemetryManager.generateLastRequestHeaderValue());
      };
      RequestParameterBuilder2.prototype.addThrottling = function() {
        this.parameters.set(AADServerParamKeys.X_MS_LIB_CAPABILITY, ThrottlingConstants.X_MS_LIB_CAPABILITY_VALUE);
      };
      RequestParameterBuilder2.prototype.createQueryString = function() {
        var queryParameterArray = new Array();
        this.parameters.forEach(function(value, key) {
          queryParameterArray.push(key + "=" + value);
        });
        return queryParameterArray.join("&");
      };
      return RequestParameterBuilder2;
    }();
    var IdTokenEntity = function(_super) {
      __extends(IdTokenEntity2, _super);
      function IdTokenEntity2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      IdTokenEntity2.createIdTokenEntity = function(homeAccountId, environment, idToken, clientId, tenantId, oboAssertion) {
        var idTokenEntity = new IdTokenEntity2();
        idTokenEntity.credentialType = exports.CredentialType.ID_TOKEN;
        idTokenEntity.homeAccountId = homeAccountId;
        idTokenEntity.environment = environment;
        idTokenEntity.clientId = clientId;
        idTokenEntity.secret = idToken;
        idTokenEntity.realm = tenantId;
        idTokenEntity.oboAssertion = oboAssertion;
        return idTokenEntity;
      };
      IdTokenEntity2.isIdTokenEntity = function(entity) {
        if (!entity) {
          return false;
        }
        return entity.hasOwnProperty("homeAccountId") && entity.hasOwnProperty("environment") && entity.hasOwnProperty("credentialType") && entity.hasOwnProperty("realm") && entity.hasOwnProperty("clientId") && entity.hasOwnProperty("secret") && entity["credentialType"] === exports.CredentialType.ID_TOKEN;
      };
      return IdTokenEntity2;
    }(CredentialEntity);
    var TimeUtils = function() {
      function TimeUtils2() {
      }
      TimeUtils2.nowSeconds = function() {
        return Math.round(new Date().getTime() / 1e3);
      };
      TimeUtils2.isTokenExpired = function(expiresOn, offset) {
        var expirationSec = Number(expiresOn) || 0;
        var offsetCurrentTimeSec = TimeUtils2.nowSeconds() + offset;
        return offsetCurrentTimeSec > expirationSec;
      };
      TimeUtils2.wasClockTurnedBack = function(cachedAt) {
        var cachedAtSec = Number(cachedAt);
        return cachedAtSec > TimeUtils2.nowSeconds();
      };
      TimeUtils2.delay = function(t, value) {
        return new Promise(function(resolve) {
          return setTimeout(function() {
            return resolve(value);
          }, t);
        });
      };
      return TimeUtils2;
    }();
    var AccessTokenEntity = function(_super) {
      __extends(AccessTokenEntity2, _super);
      function AccessTokenEntity2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      AccessTokenEntity2.createAccessTokenEntity = function(homeAccountId, environment, accessToken, clientId, tenantId, scopes, expiresOn, extExpiresOn, cryptoUtils, refreshOn, tokenType, oboAssertion) {
        var _a;
        var atEntity = new AccessTokenEntity2();
        atEntity.homeAccountId = homeAccountId;
        atEntity.credentialType = exports.CredentialType.ACCESS_TOKEN;
        atEntity.secret = accessToken;
        var currentTime = TimeUtils.nowSeconds();
        atEntity.cachedAt = currentTime.toString();
        atEntity.expiresOn = expiresOn.toString();
        atEntity.extendedExpiresOn = extExpiresOn.toString();
        if (refreshOn) {
          atEntity.refreshOn = refreshOn.toString();
        }
        atEntity.environment = environment;
        atEntity.clientId = clientId;
        atEntity.realm = tenantId;
        atEntity.target = scopes;
        atEntity.oboAssertion = oboAssertion;
        atEntity.tokenType = StringUtils.isEmpty(tokenType) ? exports.AuthenticationScheme.BEARER : tokenType;
        if (atEntity.tokenType === exports.AuthenticationScheme.POP) {
          atEntity.credentialType = exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
          var tokenClaims = AuthToken.extractTokenClaims(accessToken, cryptoUtils);
          if (!((_a = tokenClaims === null || tokenClaims === void 0 ? void 0 : tokenClaims.cnf) === null || _a === void 0 ? void 0 : _a.kid)) {
            throw ClientAuthError.createTokenClaimsRequiredError();
          }
          atEntity.keyId = tokenClaims.cnf.kid;
        }
        return atEntity;
      };
      AccessTokenEntity2.isAccessTokenEntity = function(entity) {
        if (!entity) {
          return false;
        }
        return entity.hasOwnProperty("homeAccountId") && entity.hasOwnProperty("environment") && entity.hasOwnProperty("credentialType") && entity.hasOwnProperty("realm") && entity.hasOwnProperty("clientId") && entity.hasOwnProperty("secret") && entity.hasOwnProperty("target") && (entity["credentialType"] === exports.CredentialType.ACCESS_TOKEN || entity["credentialType"] === exports.CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME);
      };
      return AccessTokenEntity2;
    }(CredentialEntity);
    var RefreshTokenEntity = function(_super) {
      __extends(RefreshTokenEntity2, _super);
      function RefreshTokenEntity2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      RefreshTokenEntity2.createRefreshTokenEntity = function(homeAccountId, environment, refreshToken, clientId, familyId, oboAssertion) {
        var rtEntity = new RefreshTokenEntity2();
        rtEntity.clientId = clientId;
        rtEntity.credentialType = exports.CredentialType.REFRESH_TOKEN;
        rtEntity.environment = environment;
        rtEntity.homeAccountId = homeAccountId;
        rtEntity.secret = refreshToken;
        rtEntity.oboAssertion = oboAssertion;
        if (familyId)
          rtEntity.familyId = familyId;
        return rtEntity;
      };
      RefreshTokenEntity2.isRefreshTokenEntity = function(entity) {
        if (!entity) {
          return false;
        }
        return entity.hasOwnProperty("homeAccountId") && entity.hasOwnProperty("environment") && entity.hasOwnProperty("credentialType") && entity.hasOwnProperty("clientId") && entity.hasOwnProperty("secret") && entity["credentialType"] === exports.CredentialType.REFRESH_TOKEN;
      };
      return RefreshTokenEntity2;
    }(CredentialEntity);
    var InteractionRequiredAuthErrorMessage = [
      "interaction_required",
      "consent_required",
      "login_required"
    ];
    var InteractionRequiredAuthSubErrorMessage = [
      "message_only",
      "additional_action",
      "basic_action",
      "user_password_expired",
      "consent_required"
    ];
    var InteractionRequiredAuthError = function(_super) {
      __extends(InteractionRequiredAuthError2, _super);
      function InteractionRequiredAuthError2(errorCode, errorMessage, subError) {
        var _this = _super.call(this, errorCode, errorMessage, subError) || this;
        _this.name = "InteractionRequiredAuthError";
        Object.setPrototypeOf(_this, InteractionRequiredAuthError2.prototype);
        return _this;
      }
      InteractionRequiredAuthError2.isInteractionRequiredError = function(errorCode, errorString, subError) {
        var isInteractionRequiredErrorCode = !!errorCode && InteractionRequiredAuthErrorMessage.indexOf(errorCode) > -1;
        var isInteractionRequiredSubError = !!subError && InteractionRequiredAuthSubErrorMessage.indexOf(subError) > -1;
        var isInteractionRequiredErrorDesc = !!errorString && InteractionRequiredAuthErrorMessage.some(function(irErrorCode) {
          return errorString.indexOf(irErrorCode) > -1;
        });
        return isInteractionRequiredErrorCode || isInteractionRequiredErrorDesc || isInteractionRequiredSubError;
      };
      return InteractionRequiredAuthError2;
    }(ServerError);
    var CacheRecord = function() {
      function CacheRecord2(accountEntity, idTokenEntity, accessTokenEntity, refreshTokenEntity, appMetadataEntity) {
        this.account = accountEntity || null;
        this.idToken = idTokenEntity || null;
        this.accessToken = accessTokenEntity || null;
        this.refreshToken = refreshTokenEntity || null;
        this.appMetadata = appMetadataEntity || null;
      }
      return CacheRecord2;
    }();
    var ProtocolUtils = function() {
      function ProtocolUtils2() {
      }
      ProtocolUtils2.setRequestState = function(cryptoObj, userState, meta) {
        var libraryState = ProtocolUtils2.generateLibraryState(cryptoObj, meta);
        return !StringUtils.isEmpty(userState) ? "" + libraryState + Constants.RESOURCE_DELIM + userState : libraryState;
      };
      ProtocolUtils2.generateLibraryState = function(cryptoObj, meta) {
        if (!cryptoObj) {
          throw ClientAuthError.createNoCryptoObjectError("generateLibraryState");
        }
        var stateObj = {
          id: cryptoObj.createNewGuid()
        };
        if (meta) {
          stateObj.meta = meta;
        }
        var stateString = JSON.stringify(stateObj);
        return cryptoObj.base64Encode(stateString);
      };
      ProtocolUtils2.parseRequestState = function(cryptoObj, state) {
        if (!cryptoObj) {
          throw ClientAuthError.createNoCryptoObjectError("parseRequestState");
        }
        if (StringUtils.isEmpty(state)) {
          throw ClientAuthError.createInvalidStateError(state, "Null, undefined or empty state");
        }
        try {
          var splitState = decodeURIComponent(state).split(Constants.RESOURCE_DELIM);
          var libraryState = splitState[0];
          var userState = splitState.length > 1 ? splitState.slice(1).join(Constants.RESOURCE_DELIM) : "";
          var libraryStateString = cryptoObj.base64Decode(libraryState);
          var libraryStateObj = JSON.parse(libraryStateString);
          return {
            userRequestState: !StringUtils.isEmpty(userState) ? userState : "",
            libraryState: libraryStateObj
          };
        } catch (e) {
          throw ClientAuthError.createInvalidStateError(state, e);
        }
      };
      return ProtocolUtils2;
    }();
    var UrlString = function() {
      function UrlString2(url) {
        this._urlString = url;
        if (StringUtils.isEmpty(this._urlString)) {
          throw ClientConfigurationError.createUrlEmptyError();
        }
        if (StringUtils.isEmpty(this.getHash())) {
          this._urlString = UrlString2.canonicalizeUri(url);
        }
      }
      Object.defineProperty(UrlString2.prototype, "urlString", {
        get: function() {
          return this._urlString;
        },
        enumerable: true,
        configurable: true
      });
      UrlString2.canonicalizeUri = function(url) {
        if (url) {
          var lowerCaseUrl = url.toLowerCase();
          if (StringUtils.endsWith(lowerCaseUrl, "?")) {
            lowerCaseUrl = lowerCaseUrl.slice(0, -1);
          } else if (StringUtils.endsWith(lowerCaseUrl, "?/")) {
            lowerCaseUrl = lowerCaseUrl.slice(0, -2);
          }
          if (!StringUtils.endsWith(lowerCaseUrl, "/")) {
            lowerCaseUrl += "/";
          }
          return lowerCaseUrl;
        }
        return url;
      };
      UrlString2.prototype.validateAsUri = function() {
        var components;
        try {
          components = this.getUrlComponents();
        } catch (e) {
          throw ClientConfigurationError.createUrlParseError(e);
        }
        if (!components.HostNameAndPort || !components.PathSegments) {
          throw ClientConfigurationError.createUrlParseError("Given url string: " + this.urlString);
        }
        if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
          throw ClientConfigurationError.createInsecureAuthorityUriError(this.urlString);
        }
      };
      UrlString2.prototype.urlRemoveQueryStringParameter = function(name2) {
        var regex = new RegExp("(\\&" + name2 + "=)[^&]+");
        this._urlString = this.urlString.replace(regex, "");
        regex = new RegExp("(" + name2 + "=)[^&]+&");
        this._urlString = this.urlString.replace(regex, "");
        regex = new RegExp("(" + name2 + "=)[^&]+");
        this._urlString = this.urlString.replace(regex, "");
        return this.urlString;
      };
      UrlString2.appendQueryString = function(url, queryString) {
        if (StringUtils.isEmpty(queryString)) {
          return url;
        }
        return url.indexOf("?") < 0 ? url + "?" + queryString : url + "&" + queryString;
      };
      UrlString2.removeHashFromUrl = function(url) {
        return UrlString2.canonicalizeUri(url.split("#")[0]);
      };
      UrlString2.prototype.replaceTenantPath = function(tenantId) {
        var urlObject = this.getUrlComponents();
        var pathArray = urlObject.PathSegments;
        if (tenantId && (pathArray.length !== 0 && (pathArray[0] === AADAuthorityConstants.COMMON || pathArray[0] === AADAuthorityConstants.ORGANIZATIONS))) {
          pathArray[0] = tenantId;
        }
        return UrlString2.constructAuthorityUriFromObject(urlObject);
      };
      UrlString2.prototype.getHash = function() {
        return UrlString2.parseHash(this.urlString);
      };
      UrlString2.prototype.getUrlComponents = function() {
        var regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        var match = this.urlString.match(regEx);
        if (!match) {
          throw ClientConfigurationError.createUrlParseError("Given url string: " + this.urlString);
        }
        var urlComponents = {
          Protocol: match[1],
          HostNameAndPort: match[4],
          AbsolutePath: match[5],
          QueryString: match[7]
        };
        var pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter(function(val) {
          return val && val.length > 0;
        });
        urlComponents.PathSegments = pathSegments;
        if (!StringUtils.isEmpty(urlComponents.QueryString) && urlComponents.QueryString.endsWith("/")) {
          urlComponents.QueryString = urlComponents.QueryString.substring(0, urlComponents.QueryString.length - 1);
        }
        return urlComponents;
      };
      UrlString2.getDomainFromUrl = function(url) {
        var regEx = RegExp("^([^:/?#]+://)?([^/?#]*)");
        var match = url.match(regEx);
        if (!match) {
          throw ClientConfigurationError.createUrlParseError("Given url string: " + url);
        }
        return match[2];
      };
      UrlString2.getAbsoluteUrl = function(relativeUrl, baseUrl) {
        if (relativeUrl[0] === Constants.FORWARD_SLASH) {
          var url = new UrlString2(baseUrl);
          var baseComponents = url.getUrlComponents();
          return baseComponents.Protocol + "//" + baseComponents.HostNameAndPort + relativeUrl;
        }
        return relativeUrl;
      };
      UrlString2.parseHash = function(hashString) {
        var hashIndex1 = hashString.indexOf("#");
        var hashIndex2 = hashString.indexOf("#/");
        if (hashIndex2 > -1) {
          return hashString.substring(hashIndex2 + 2);
        } else if (hashIndex1 > -1) {
          return hashString.substring(hashIndex1 + 1);
        }
        return "";
      };
      UrlString2.constructAuthorityUriFromObject = function(urlObject) {
        return new UrlString2(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + urlObject.PathSegments.join("/"));
      };
      UrlString2.getDeserializedHash = function(hash) {
        if (StringUtils.isEmpty(hash)) {
          return {};
        }
        var parsedHash = UrlString2.parseHash(hash);
        var deserializedHash = StringUtils.queryStringToObject(StringUtils.isEmpty(parsedHash) ? hash : parsedHash);
        if (!deserializedHash) {
          throw ClientAuthError.createHashNotDeserializedError(JSON.stringify(deserializedHash));
        }
        return deserializedHash;
      };
      UrlString2.hashContainsKnownProperties = function(hash) {
        if (StringUtils.isEmpty(hash)) {
          return false;
        }
        var parameters = UrlString2.getDeserializedHash(hash);
        return !!(parameters.code || parameters.error_description || parameters.error || parameters.state);
      };
      return UrlString2;
    }();
    var KeyLocation;
    (function(KeyLocation2) {
      KeyLocation2["SW"] = "sw";
      KeyLocation2["UHW"] = "uhw";
    })(KeyLocation || (KeyLocation = {}));
    var PopTokenGenerator = function() {
      function PopTokenGenerator2(cryptoUtils) {
        this.cryptoUtils = cryptoUtils;
      }
      PopTokenGenerator2.prototype.generateCnf = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var kidThumbprint, reqCnf;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.cryptoUtils.getPublicKeyThumbprint(request)];
              case 1:
                kidThumbprint = _a.sent();
                reqCnf = {
                  kid: kidThumbprint,
                  xms_ksl: KeyLocation.SW
                };
                return [2, this.cryptoUtils.base64Encode(JSON.stringify(reqCnf))];
            }
          });
        });
      };
      PopTokenGenerator2.prototype.signPopToken = function(accessToken, request) {
        var _a;
        return __awaiter(this, void 0, void 0, function() {
          var tokenClaims, resourceRequestMethod, resourceRequestUri, shrClaims, resourceUrlString, resourceUrlComponents;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                tokenClaims = AuthToken.extractTokenClaims(accessToken, this.cryptoUtils);
                resourceRequestMethod = request.resourceRequestMethod, resourceRequestUri = request.resourceRequestUri, shrClaims = request.shrClaims;
                resourceUrlString = resourceRequestUri ? new UrlString(resourceRequestUri) : void 0;
                resourceUrlComponents = resourceUrlString === null || resourceUrlString === void 0 ? void 0 : resourceUrlString.getUrlComponents();
                if (!((_a = tokenClaims === null || tokenClaims === void 0 ? void 0 : tokenClaims.cnf) === null || _a === void 0 ? void 0 : _a.kid)) {
                  throw ClientAuthError.createTokenClaimsRequiredError();
                }
                return [4, this.cryptoUtils.signJwt({
                  at: accessToken,
                  ts: TimeUtils.nowSeconds(),
                  m: resourceRequestMethod === null || resourceRequestMethod === void 0 ? void 0 : resourceRequestMethod.toUpperCase(),
                  u: resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.HostNameAndPort,
                  nonce: this.cryptoUtils.createNewGuid(),
                  p: resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.AbsolutePath,
                  q: (resourceUrlComponents === null || resourceUrlComponents === void 0 ? void 0 : resourceUrlComponents.QueryString) ? [[], resourceUrlComponents.QueryString] : void 0,
                  client_claims: shrClaims || void 0
                }, tokenClaims.cnf.kid)];
              case 1:
                return [2, _b.sent()];
            }
          });
        });
      };
      return PopTokenGenerator2;
    }();
    var AppMetadataEntity = function() {
      function AppMetadataEntity2() {
      }
      AppMetadataEntity2.prototype.generateAppMetadataKey = function() {
        return AppMetadataEntity2.generateAppMetadataCacheKey(this.environment, this.clientId);
      };
      AppMetadataEntity2.generateAppMetadataCacheKey = function(environment, clientId) {
        var appMetaDataKeyArray = [
          APP_METADATA,
          environment,
          clientId
        ];
        return appMetaDataKeyArray.join(Separators.CACHE_KEY_SEPARATOR).toLowerCase();
      };
      AppMetadataEntity2.createAppMetadataEntity = function(clientId, environment, familyId) {
        var appMetadata = new AppMetadataEntity2();
        appMetadata.clientId = clientId;
        appMetadata.environment = environment;
        if (familyId) {
          appMetadata.familyId = familyId;
        }
        return appMetadata;
      };
      AppMetadataEntity2.isAppMetadataEntity = function(key, entity) {
        if (!entity) {
          return false;
        }
        return key.indexOf(APP_METADATA) === 0 && entity.hasOwnProperty("clientId") && entity.hasOwnProperty("environment");
      };
      return AppMetadataEntity2;
    }();
    var TokenCacheContext = function() {
      function TokenCacheContext2(tokenCache, hasChanged) {
        this.cache = tokenCache;
        this.hasChanged = hasChanged;
      }
      Object.defineProperty(TokenCacheContext2.prototype, "cacheHasChanged", {
        get: function() {
          return this.hasChanged;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(TokenCacheContext2.prototype, "tokenCache", {
        get: function() {
          return this.cache;
        },
        enumerable: true,
        configurable: true
      });
      return TokenCacheContext2;
    }();
    var ResponseHandler = function() {
      function ResponseHandler2(clientId, cacheStorage, cryptoObj, logger, serializableCache, persistencePlugin) {
        this.clientId = clientId;
        this.cacheStorage = cacheStorage;
        this.cryptoObj = cryptoObj;
        this.logger = logger;
        this.serializableCache = serializableCache;
        this.persistencePlugin = persistencePlugin;
      }
      ResponseHandler2.prototype.validateServerAuthorizationCodeResponse = function(serverResponseHash, cachedState, cryptoObj) {
        if (!serverResponseHash.state || !cachedState) {
          throw !serverResponseHash.state ? ClientAuthError.createStateNotFoundError("Server State") : ClientAuthError.createStateNotFoundError("Cached State");
        }
        if (decodeURIComponent(serverResponseHash.state) !== decodeURIComponent(cachedState)) {
          throw ClientAuthError.createStateMismatchError();
        }
        if (serverResponseHash.error || serverResponseHash.error_description || serverResponseHash.suberror) {
          if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponseHash.error, serverResponseHash.error_description, serverResponseHash.suberror)) {
            throw new InteractionRequiredAuthError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
          }
          throw new ServerError(serverResponseHash.error || Constants.EMPTY_STRING, serverResponseHash.error_description, serverResponseHash.suberror);
        }
        if (serverResponseHash.client_info) {
          buildClientInfo(serverResponseHash.client_info, cryptoObj);
        }
      };
      ResponseHandler2.prototype.validateTokenResponse = function(serverResponse) {
        if (serverResponse.error || serverResponse.error_description || serverResponse.suberror) {
          if (InteractionRequiredAuthError.isInteractionRequiredError(serverResponse.error, serverResponse.error_description, serverResponse.suberror)) {
            throw new InteractionRequiredAuthError(serverResponse.error, serverResponse.error_description, serverResponse.suberror);
          }
          var errString = serverResponse.error_codes + " - [" + serverResponse.timestamp + "]: " + serverResponse.error_description + " - Correlation ID: " + serverResponse.correlation_id + " - Trace ID: " + serverResponse.trace_id;
          throw new ServerError(serverResponse.error, errString, serverResponse.suberror);
        }
      };
      ResponseHandler2.prototype.handleServerTokenResponse = function(serverTokenResponse, authority, reqTimestamp, request, authCodePayload, oboAssertion, handlingRefreshTokenResponse) {
        return __awaiter(this, void 0, void 0, function() {
          var idTokenObj, requestStateObj, cacheRecord, cacheContext, key, account;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (serverTokenResponse.id_token) {
                  idTokenObj = new AuthToken(serverTokenResponse.id_token || Constants.EMPTY_STRING, this.cryptoObj);
                  if (authCodePayload && !StringUtils.isEmpty(authCodePayload.nonce)) {
                    if (idTokenObj.claims.nonce !== authCodePayload.nonce) {
                      throw ClientAuthError.createNonceMismatchError();
                    }
                  }
                }
                this.homeAccountIdentifier = AccountEntity.generateHomeAccountId(serverTokenResponse.client_info || Constants.EMPTY_STRING, authority.authorityType, this.logger, this.cryptoObj, idTokenObj);
                if (!!authCodePayload && !!authCodePayload.state) {
                  requestStateObj = ProtocolUtils.parseRequestState(this.cryptoObj, authCodePayload.state);
                }
                cacheRecord = this.generateCacheRecord(serverTokenResponse, authority, reqTimestamp, idTokenObj, request.scopes, oboAssertion, authCodePayload);
                _a.label = 1;
              case 1:
                _a.trys.push([1, , 4, 7]);
                if (!(this.persistencePlugin && this.serializableCache))
                  return [3, 3];
                this.logger.verbose("Persistence enabled, calling beforeCacheAccess");
                cacheContext = new TokenCacheContext(this.serializableCache, true);
                return [4, this.persistencePlugin.beforeCacheAccess(cacheContext)];
              case 2:
                _a.sent();
                _a.label = 3;
              case 3:
                if (handlingRefreshTokenResponse && cacheRecord.account) {
                  key = cacheRecord.account.generateAccountKey();
                  account = this.cacheStorage.getAccount(key);
                  if (!account) {
                    this.logger.warning("Account used to refresh tokens not in persistence, refreshed tokens will not be stored in the cache");
                    return [2, ResponseHandler2.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj)];
                  }
                }
                this.cacheStorage.saveCacheRecord(cacheRecord);
                return [3, 7];
              case 4:
                if (!(this.persistencePlugin && this.serializableCache && cacheContext))
                  return [3, 6];
                this.logger.verbose("Persistence enabled, calling afterCacheAccess");
                return [4, this.persistencePlugin.afterCacheAccess(cacheContext)];
              case 5:
                _a.sent();
                _a.label = 6;
              case 6:
                return [7];
              case 7:
                return [2, ResponseHandler2.generateAuthenticationResult(this.cryptoObj, authority, cacheRecord, false, request, idTokenObj, requestStateObj)];
            }
          });
        });
      };
      ResponseHandler2.prototype.generateCacheRecord = function(serverTokenResponse, authority, reqTimestamp, idTokenObj, requestScopes, oboAssertion, authCodePayload) {
        var env = authority.getPreferredCache();
        if (StringUtils.isEmpty(env)) {
          throw ClientAuthError.createInvalidCacheEnvironmentError();
        }
        var cachedIdToken;
        var cachedAccount;
        if (!StringUtils.isEmpty(serverTokenResponse.id_token) && !!idTokenObj) {
          cachedIdToken = IdTokenEntity.createIdTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.id_token || Constants.EMPTY_STRING, this.clientId, idTokenObj.claims.tid || Constants.EMPTY_STRING, oboAssertion);
          cachedAccount = this.generateAccountEntity(serverTokenResponse, idTokenObj, authority, oboAssertion, authCodePayload);
        }
        var cachedAccessToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.access_token)) {
          var responseScopes = serverTokenResponse.scope ? ScopeSet.fromString(serverTokenResponse.scope) : new ScopeSet(requestScopes || []);
          var expiresIn = (typeof serverTokenResponse.expires_in === "string" ? parseInt(serverTokenResponse.expires_in, 10) : serverTokenResponse.expires_in) || 0;
          var extExpiresIn = (typeof serverTokenResponse.ext_expires_in === "string" ? parseInt(serverTokenResponse.ext_expires_in, 10) : serverTokenResponse.ext_expires_in) || 0;
          var refreshIn = (typeof serverTokenResponse.refresh_in === "string" ? parseInt(serverTokenResponse.refresh_in, 10) : serverTokenResponse.refresh_in) || void 0;
          var tokenExpirationSeconds = reqTimestamp + expiresIn;
          var extendedTokenExpirationSeconds = tokenExpirationSeconds + extExpiresIn;
          var refreshOnSeconds = refreshIn && refreshIn > 0 ? reqTimestamp + refreshIn : void 0;
          cachedAccessToken = AccessTokenEntity.createAccessTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.access_token || Constants.EMPTY_STRING, this.clientId, idTokenObj ? idTokenObj.claims.tid || Constants.EMPTY_STRING : authority.tenant, responseScopes.printScopes(), tokenExpirationSeconds, extendedTokenExpirationSeconds, this.cryptoObj, refreshOnSeconds, serverTokenResponse.token_type, oboAssertion);
        }
        var cachedRefreshToken = null;
        if (!StringUtils.isEmpty(serverTokenResponse.refresh_token)) {
          cachedRefreshToken = RefreshTokenEntity.createRefreshTokenEntity(this.homeAccountIdentifier, env, serverTokenResponse.refresh_token || Constants.EMPTY_STRING, this.clientId, serverTokenResponse.foci, oboAssertion);
        }
        var cachedAppMetadata = null;
        if (!StringUtils.isEmpty(serverTokenResponse.foci)) {
          cachedAppMetadata = AppMetadataEntity.createAppMetadataEntity(this.clientId, env, serverTokenResponse.foci);
        }
        return new CacheRecord(cachedAccount, cachedIdToken, cachedAccessToken, cachedRefreshToken, cachedAppMetadata);
      };
      ResponseHandler2.prototype.generateAccountEntity = function(serverTokenResponse, idToken, authority, oboAssertion, authCodePayload) {
        var authorityType = authority.authorityType;
        var cloudGraphHostName = authCodePayload ? authCodePayload.cloud_graph_host_name : "";
        var msGraphhost = authCodePayload ? authCodePayload.msgraph_host : "";
        if (authorityType === exports.AuthorityType.Adfs) {
          this.logger.verbose("Authority type is ADFS, creating ADFS account");
          return AccountEntity.createGenericAccount(authority, this.homeAccountIdentifier, idToken, oboAssertion, cloudGraphHostName, msGraphhost);
        }
        if (StringUtils.isEmpty(serverTokenResponse.client_info) && authority.protocolMode === "AAD") {
          throw ClientAuthError.createClientInfoEmptyError();
        }
        return serverTokenResponse.client_info ? AccountEntity.createAccount(serverTokenResponse.client_info, this.homeAccountIdentifier, authority, idToken, oboAssertion, cloudGraphHostName, msGraphhost) : AccountEntity.createGenericAccount(authority, this.homeAccountIdentifier, idToken, oboAssertion, cloudGraphHostName, msGraphhost);
      };
      ResponseHandler2.generateAuthenticationResult = function(cryptoObj, authority, cacheRecord, fromTokenCache, request, idTokenObj, requestState) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function() {
          var accessToken, responseScopes, expiresOn, extExpiresOn, familyId, popTokenGenerator, uid, tid;
          return __generator(this, function(_d) {
            switch (_d.label) {
              case 0:
                accessToken = "";
                responseScopes = [];
                expiresOn = null;
                familyId = Constants.EMPTY_STRING;
                if (!cacheRecord.accessToken)
                  return [3, 4];
                if (!(cacheRecord.accessToken.tokenType === exports.AuthenticationScheme.POP))
                  return [3, 2];
                popTokenGenerator = new PopTokenGenerator(cryptoObj);
                return [4, popTokenGenerator.signPopToken(cacheRecord.accessToken.secret, request)];
              case 1:
                accessToken = _d.sent();
                return [3, 3];
              case 2:
                accessToken = cacheRecord.accessToken.secret;
                _d.label = 3;
              case 3:
                responseScopes = ScopeSet.fromString(cacheRecord.accessToken.target).asArray();
                expiresOn = new Date(Number(cacheRecord.accessToken.expiresOn) * 1e3);
                extExpiresOn = new Date(Number(cacheRecord.accessToken.extendedExpiresOn) * 1e3);
                _d.label = 4;
              case 4:
                if (cacheRecord.appMetadata) {
                  familyId = cacheRecord.appMetadata.familyId === THE_FAMILY_ID ? THE_FAMILY_ID : Constants.EMPTY_STRING;
                }
                uid = (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.oid) || (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.sub) || Constants.EMPTY_STRING;
                tid = (idTokenObj === null || idTokenObj === void 0 ? void 0 : idTokenObj.claims.tid) || Constants.EMPTY_STRING;
                return [2, {
                  authority: authority.canonicalAuthority,
                  uniqueId: uid,
                  tenantId: tid,
                  scopes: responseScopes,
                  account: cacheRecord.account ? cacheRecord.account.getAccountInfo() : null,
                  idToken: idTokenObj ? idTokenObj.rawToken : Constants.EMPTY_STRING,
                  idTokenClaims: idTokenObj ? idTokenObj.claims : {},
                  accessToken,
                  fromCache: fromTokenCache,
                  expiresOn,
                  extExpiresOn,
                  familyId,
                  tokenType: ((_a = cacheRecord.accessToken) === null || _a === void 0 ? void 0 : _a.tokenType) || Constants.EMPTY_STRING,
                  state: requestState ? requestState.userRequestState : Constants.EMPTY_STRING,
                  cloudGraphHostName: ((_b = cacheRecord.account) === null || _b === void 0 ? void 0 : _b.cloudGraphHostName) || Constants.EMPTY_STRING,
                  msGraphHost: ((_c = cacheRecord.account) === null || _c === void 0 ? void 0 : _c.msGraphHost) || Constants.EMPTY_STRING
                }];
            }
          });
        });
      };
      return ResponseHandler2;
    }();
    var AuthorizationCodeClient = function(_super) {
      __extends(AuthorizationCodeClient2, _super);
      function AuthorizationCodeClient2(configuration) {
        return _super.call(this, configuration) || this;
      }
      AuthorizationCodeClient2.prototype.getAuthCodeUrl = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var queryString;
          return __generator(this, function(_a) {
            queryString = this.createAuthCodeUrlQueryString(request);
            return [2, UrlString.appendQueryString(this.authority.authorizationEndpoint, queryString)];
          });
        });
      };
      AuthorizationCodeClient2.prototype.acquireToken = function(request, authCodePayload) {
        return __awaiter(this, void 0, void 0, function() {
          var reqTimestamp, response, responseHandler;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                this.logger.info("in acquireToken call");
                if (!request || StringUtils.isEmpty(request.code)) {
                  throw ClientAuthError.createTokenRequestCannotBeMadeError();
                }
                reqTimestamp = TimeUtils.nowSeconds();
                return [4, this.executeTokenRequest(this.authority, request)];
              case 1:
                response = _a.sent();
                responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                responseHandler.validateTokenResponse(response.body);
                return [4, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, authCodePayload)];
              case 2:
                return [2, _a.sent()];
            }
          });
        });
      };
      AuthorizationCodeClient2.prototype.handleFragmentResponse = function(hashFragment, cachedState) {
        var responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, null, null);
        var hashUrlString = new UrlString(hashFragment);
        var serverParams = UrlString.getDeserializedHash(hashUrlString.getHash());
        responseHandler.validateServerAuthorizationCodeResponse(serverParams, cachedState, this.cryptoUtils);
        if (!serverParams.code) {
          throw ClientAuthError.createNoAuthCodeInServerResponseError();
        }
        return __assign(__assign({}, serverParams), {
          code: serverParams.code
        });
      };
      AuthorizationCodeClient2.prototype.getLogoutUri = function(logoutRequest) {
        if (!logoutRequest) {
          throw ClientConfigurationError.createEmptyLogoutRequestError();
        }
        if (logoutRequest.account) {
          this.cacheManager.removeAccount(AccountEntity.generateAccountCacheKey(logoutRequest.account));
        } else {
          this.cacheManager.clear();
        }
        var queryString = this.createLogoutUrlQueryString(logoutRequest);
        return UrlString.appendQueryString(this.authority.endSessionEndpoint, queryString);
      };
      AuthorizationCodeClient2.prototype.executeTokenRequest = function(authority, request) {
        return __awaiter(this, void 0, void 0, function() {
          var thumbprint, requestBody, queryParameters, ccsCredential, clientInfo, headers, endpoint;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                thumbprint = {
                  clientId: this.config.authOptions.clientId,
                  authority: authority.canonicalAuthority,
                  scopes: request.scopes
                };
                return [4, this.createTokenRequestBody(request)];
              case 1:
                requestBody = _a.sent();
                queryParameters = this.createTokenQueryParameters(request);
                ccsCredential = void 0;
                if (request.clientInfo) {
                  try {
                    clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                    ccsCredential = {
                      credential: "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid,
                      type: exports.CcsCredentialType.HOME_ACCOUNT_ID
                    };
                  } catch (e) {
                    this.logger.verbose("Could not parse client info for CCS Header: " + e);
                  }
                }
                headers = this.createTokenRequestHeaders(ccsCredential || request.ccsCredential);
                endpoint = StringUtils.isEmpty(queryParameters) ? authority.tokenEndpoint : authority.tokenEndpoint + "?" + queryParameters;
                return [2, this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint)];
            }
          });
        });
      };
      AuthorizationCodeClient2.prototype.createTokenQueryParameters = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
          parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
      };
      AuthorizationCodeClient2.prototype.createTokenRequestBody = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var parameterBuilder, clientAssertion, popTokenGenerator, cnfString, correlationId, ccsCred, clientInfo, clientInfo;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                parameterBuilder = new RequestParameterBuilder();
                parameterBuilder.addClientId(this.config.authOptions.clientId);
                parameterBuilder.addRedirectUri(request.redirectUri);
                parameterBuilder.addScopes(request.scopes);
                parameterBuilder.addAuthorizationCode(request.code);
                parameterBuilder.addLibraryInfo(this.config.libraryInfo);
                parameterBuilder.addThrottling();
                if (this.serverTelemetryManager) {
                  parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
                }
                if (request.codeVerifier) {
                  parameterBuilder.addCodeVerifier(request.codeVerifier);
                }
                if (this.config.clientCredentials.clientSecret) {
                  parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
                }
                if (this.config.clientCredentials.clientAssertion) {
                  clientAssertion = this.config.clientCredentials.clientAssertion;
                  parameterBuilder.addClientAssertion(clientAssertion.assertion);
                  parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
                }
                parameterBuilder.addGrantType(GrantType.AUTHORIZATION_CODE_GRANT);
                parameterBuilder.addClientInfo();
                if (!(request.authenticationScheme === exports.AuthenticationScheme.POP))
                  return [3, 2];
                popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                return [4, popTokenGenerator.generateCnf(request)];
              case 1:
                cnfString = _a.sent();
                parameterBuilder.addPopToken(cnfString);
                _a.label = 2;
              case 2:
                correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
                parameterBuilder.addCorrelationId(correlationId);
                if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
                  parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
                }
                ccsCred = void 0;
                if (request.clientInfo) {
                  try {
                    clientInfo = buildClientInfo(request.clientInfo, this.cryptoUtils);
                    ccsCred = {
                      credential: "" + clientInfo.uid + Separators.CLIENT_INFO_SEPARATOR + clientInfo.utid,
                      type: exports.CcsCredentialType.HOME_ACCOUNT_ID
                    };
                  } catch (e) {
                    this.logger.verbose("Could not parse client info for CCS Header: " + e);
                  }
                } else {
                  ccsCred = request.ccsCredential;
                }
                if (this.config.systemOptions.preventCorsPreflight && ccsCred) {
                  switch (ccsCred.type) {
                    case exports.CcsCredentialType.HOME_ACCOUNT_ID:
                      try {
                        clientInfo = buildClientInfoFromHomeAccountId(ccsCred.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                      } catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                      }
                      break;
                    case exports.CcsCredentialType.UPN:
                      parameterBuilder.addCcsUpn(ccsCred.credential);
                      break;
                  }
                }
                return [2, parameterBuilder.createQueryString()];
            }
          });
        });
      };
      AuthorizationCodeClient2.prototype.createAuthCodeUrlQueryString = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        var requestScopes = __spreadArrays(request.scopes || [], request.extraScopesToConsent || []);
        parameterBuilder.addScopes(requestScopes);
        parameterBuilder.addRedirectUri(request.redirectUri);
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        parameterBuilder.addResponseMode(request.responseMode);
        parameterBuilder.addResponseTypeCode();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addClientInfo();
        if (request.codeChallenge && request.codeChallengeMethod) {
          parameterBuilder.addCodeChallengeParams(request.codeChallenge, request.codeChallengeMethod);
        }
        if (request.prompt) {
          parameterBuilder.addPrompt(request.prompt);
        }
        if (request.domainHint) {
          parameterBuilder.addDomainHint(request.domainHint);
        }
        if (request.prompt !== PromptValue.SELECT_ACCOUNT) {
          if (request.sid && request.prompt === PromptValue.NONE) {
            this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from request");
            parameterBuilder.addSid(request.sid);
          } else if (request.account) {
            var accountSid = this.extractAccountSid(request.account);
            if (accountSid && request.prompt === PromptValue.NONE) {
              this.logger.verbose("createAuthCodeUrlQueryString: Prompt is none, adding sid from account");
              parameterBuilder.addSid(accountSid);
              try {
                var clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                parameterBuilder.addCcsOid(clientInfo);
              } catch (e) {
                this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
              }
            } else if (request.loginHint) {
              this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from request");
              parameterBuilder.addLoginHint(request.loginHint);
              parameterBuilder.addCcsUpn(request.loginHint);
            } else if (request.account.username) {
              this.logger.verbose("createAuthCodeUrlQueryString: Adding login_hint from account");
              parameterBuilder.addLoginHint(request.account.username);
              try {
                var clientInfo = buildClientInfoFromHomeAccountId(request.account.homeAccountId);
                parameterBuilder.addCcsOid(clientInfo);
              } catch (e) {
                this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
              }
            }
          } else if (request.loginHint) {
            this.logger.verbose("createAuthCodeUrlQueryString: No account, adding login_hint from request");
            parameterBuilder.addLoginHint(request.loginHint);
            parameterBuilder.addCcsUpn(request.loginHint);
          }
        } else {
          this.logger.verbose("createAuthCodeUrlQueryString: Prompt is select_account, ignoring account hints");
        }
        if (request.nonce) {
          parameterBuilder.addNonce(request.nonce);
        }
        if (request.state) {
          parameterBuilder.addState(request.state);
        }
        if (!StringUtils.isEmpty(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
          parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (request.extraQueryParameters) {
          parameterBuilder.addExtraQueryParameters(request.extraQueryParameters);
        }
        return parameterBuilder.createQueryString();
      };
      AuthorizationCodeClient2.prototype.createLogoutUrlQueryString = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.postLogoutRedirectUri) {
          parameterBuilder.addPostLogoutRedirectUri(request.postLogoutRedirectUri);
        }
        if (request.correlationId) {
          parameterBuilder.addCorrelationId(request.correlationId);
        }
        if (request.idTokenHint) {
          parameterBuilder.addIdTokenHint(request.idTokenHint);
        }
        return parameterBuilder.createQueryString();
      };
      AuthorizationCodeClient2.prototype.extractAccountSid = function(account) {
        if (account.idTokenClaims) {
          var tokenClaims = account.idTokenClaims;
          return tokenClaims.sid || null;
        }
        return null;
      };
      return AuthorizationCodeClient2;
    }(BaseClient);
    var DeviceCodeClient = function(_super) {
      __extends(DeviceCodeClient2, _super);
      function DeviceCodeClient2(configuration) {
        return _super.call(this, configuration) || this;
      }
      DeviceCodeClient2.prototype.acquireToken = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var deviceCodeResponse, reqTimestamp, response, responseHandler;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.getDeviceCode(request)];
              case 1:
                deviceCodeResponse = _a.sent();
                request.deviceCodeCallback(deviceCodeResponse);
                reqTimestamp = TimeUtils.nowSeconds();
                return [4, this.acquireTokenWithDeviceCode(request, deviceCodeResponse)];
              case 2:
                response = _a.sent();
                responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                responseHandler.validateTokenResponse(response);
                return [4, responseHandler.handleServerTokenResponse(response, this.authority, reqTimestamp, request)];
              case 3:
                return [2, _a.sent()];
            }
          });
        });
      };
      DeviceCodeClient2.prototype.getDeviceCode = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var queryString, headers, thumbprint;
          return __generator(this, function(_a) {
            queryString = this.createQueryString(request);
            headers = this.createTokenRequestHeaders();
            thumbprint = {
              clientId: this.config.authOptions.clientId,
              authority: request.authority,
              scopes: request.scopes
            };
            return [2, this.executePostRequestToDeviceCodeEndpoint(this.authority.deviceCodeEndpoint, queryString, headers, thumbprint)];
          });
        });
      };
      DeviceCodeClient2.prototype.executePostRequestToDeviceCodeEndpoint = function(deviceCodeEndpoint, queryString, headers, thumbprint) {
        return __awaiter(this, void 0, void 0, function() {
          var _a, userCode, deviceCode, verificationUri, expiresIn, interval, message;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                return [4, this.networkManager.sendPostRequest(thumbprint, deviceCodeEndpoint, {
                  body: queryString,
                  headers
                })];
              case 1:
                _a = _b.sent().body, userCode = _a.user_code, deviceCode = _a.device_code, verificationUri = _a.verification_uri, expiresIn = _a.expires_in, interval = _a.interval, message = _a.message;
                return [2, {
                  userCode,
                  deviceCode,
                  verificationUri,
                  expiresIn,
                  interval,
                  message
                }];
            }
          });
        });
      };
      DeviceCodeClient2.prototype.createQueryString = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        if (!StringUtils.isEmpty(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
          parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
      };
      DeviceCodeClient2.prototype.continuePolling = function(deviceCodeExpirationTime, userSpecifiedTimeout, userSpecifiedCancelFlag) {
        if (userSpecifiedCancelFlag) {
          this.logger.error("Token request cancelled by setting DeviceCodeRequest.cancel = true");
          throw ClientAuthError.createDeviceCodeCancelledError();
        } else if (userSpecifiedTimeout && userSpecifiedTimeout < deviceCodeExpirationTime && TimeUtils.nowSeconds() > userSpecifiedTimeout) {
          this.logger.error("User defined timeout for device code polling reached. The timeout was set for " + userSpecifiedTimeout);
          throw ClientAuthError.createUserTimeoutReachedError();
        } else if (TimeUtils.nowSeconds() > deviceCodeExpirationTime) {
          if (userSpecifiedTimeout) {
            this.logger.verbose("User specified timeout ignored as the device code has expired before the timeout elapsed. The user specified timeout was set for " + userSpecifiedTimeout);
          }
          this.logger.error("Device code expired. Expiration time of device code was " + deviceCodeExpirationTime);
          throw ClientAuthError.createDeviceCodeExpiredError();
        }
        return true;
      };
      DeviceCodeClient2.prototype.acquireTokenWithDeviceCode = function(request, deviceCodeResponse) {
        return __awaiter(this, void 0, void 0, function() {
          var requestBody, headers, userSpecifiedTimeout, deviceCodeExpirationTime, pollingIntervalMilli, thumbprint, response;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                requestBody = this.createTokenRequestBody(request, deviceCodeResponse);
                headers = this.createTokenRequestHeaders();
                userSpecifiedTimeout = request.timeout ? TimeUtils.nowSeconds() + request.timeout : void 0;
                deviceCodeExpirationTime = TimeUtils.nowSeconds() + deviceCodeResponse.expiresIn;
                pollingIntervalMilli = deviceCodeResponse.interval * 1e3;
                _a.label = 1;
              case 1:
                if (!this.continuePolling(deviceCodeExpirationTime, userSpecifiedTimeout, request.cancel))
                  return [3, 6];
                thumbprint = {
                  clientId: this.config.authOptions.clientId,
                  authority: request.authority,
                  scopes: request.scopes
                };
                return [4, this.executePostToTokenEndpoint(this.authority.tokenEndpoint, requestBody, headers, thumbprint)];
              case 2:
                response = _a.sent();
                if (!(response.body && response.body.error === Constants.AUTHORIZATION_PENDING))
                  return [3, 4];
                this.logger.info(response.body.error_description || "Authorization pending. Continue polling.");
                return [4, TimeUtils.delay(pollingIntervalMilli)];
              case 3:
                _a.sent();
                return [3, 5];
              case 4:
                this.logger.verbose("Authorization completed successfully. Polling stopped.");
                return [2, response.body];
              case 5:
                return [3, 1];
              case 6:
                this.logger.error("Polling stopped for unknown reasons.");
                throw ClientAuthError.createDeviceCodeUnknownError();
            }
          });
        });
      };
      DeviceCodeClient2.prototype.createTokenRequestBody = function(request, deviceCodeResponse) {
        var requestParameters = new RequestParameterBuilder();
        requestParameters.addScopes(request.scopes);
        requestParameters.addClientId(this.config.authOptions.clientId);
        requestParameters.addGrantType(GrantType.DEVICE_CODE_GRANT);
        requestParameters.addDeviceCode(deviceCodeResponse.deviceCode);
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        requestParameters.addCorrelationId(correlationId);
        requestParameters.addClientInfo();
        requestParameters.addLibraryInfo(this.config.libraryInfo);
        requestParameters.addThrottling();
        if (this.serverTelemetryManager) {
          requestParameters.addServerTelemetry(this.serverTelemetryManager);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
          requestParameters.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return requestParameters.createQueryString();
      };
      return DeviceCodeClient2;
    }(BaseClient);
    var RefreshTokenClient = function(_super) {
      __extends(RefreshTokenClient2, _super);
      function RefreshTokenClient2(configuration) {
        return _super.call(this, configuration) || this;
      }
      RefreshTokenClient2.prototype.acquireToken = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var reqTimestamp, response, responseHandler;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                reqTimestamp = TimeUtils.nowSeconds();
                return [4, this.executeTokenRequest(request, this.authority)];
              case 1:
                response = _a.sent();
                responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                responseHandler.validateTokenResponse(response.body);
                return [2, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request, void 0, void 0, true)];
            }
          });
        });
      };
      RefreshTokenClient2.prototype.acquireTokenByRefreshToken = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var isFOCI, noFamilyRTInCache, clientMismatchErrorWithFamilyRT;
          return __generator(this, function(_a) {
            if (!request) {
              throw ClientConfigurationError.createEmptyTokenRequestError();
            }
            if (!request.account) {
              throw ClientAuthError.createNoAccountInSilentRequestError();
            }
            isFOCI = this.cacheManager.isAppMetadataFOCI(request.account.environment, this.config.authOptions.clientId);
            if (isFOCI) {
              try {
                return [2, this.acquireTokenWithCachedRefreshToken(request, true)];
              } catch (e) {
                noFamilyRTInCache = e instanceof ClientAuthError && e.errorCode === ClientAuthErrorMessage.noTokensFoundError.code;
                clientMismatchErrorWithFamilyRT = e instanceof ServerError && e.errorCode === Errors.INVALID_GRANT_ERROR && e.subError === Errors.CLIENT_MISMATCH_ERROR;
                if (noFamilyRTInCache || clientMismatchErrorWithFamilyRT) {
                  return [2, this.acquireTokenWithCachedRefreshToken(request, false)];
                } else {
                  throw e;
                }
              }
            }
            return [2, this.acquireTokenWithCachedRefreshToken(request, false)];
          });
        });
      };
      RefreshTokenClient2.prototype.acquireTokenWithCachedRefreshToken = function(request, foci) {
        return __awaiter(this, void 0, void 0, function() {
          var refreshToken, refreshTokenRequest;
          return __generator(this, function(_a) {
            refreshToken = this.cacheManager.readRefreshTokenFromCache(this.config.authOptions.clientId, request.account, foci);
            if (!refreshToken) {
              throw ClientAuthError.createNoTokensFoundError();
            }
            refreshTokenRequest = __assign(__assign({}, request), { refreshToken: refreshToken.secret, authenticationScheme: request.authenticationScheme || exports.AuthenticationScheme.BEARER, ccsCredential: {
              credential: request.account.homeAccountId,
              type: exports.CcsCredentialType.HOME_ACCOUNT_ID
            } });
            return [2, this.acquireToken(refreshTokenRequest)];
          });
        });
      };
      RefreshTokenClient2.prototype.executeTokenRequest = function(request, authority) {
        return __awaiter(this, void 0, void 0, function() {
          var requestBody, queryParameters, headers, thumbprint, endpoint;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.createTokenRequestBody(request)];
              case 1:
                requestBody = _a.sent();
                queryParameters = this.createTokenQueryParameters(request);
                headers = this.createTokenRequestHeaders(request.ccsCredential);
                thumbprint = {
                  clientId: this.config.authOptions.clientId,
                  authority: authority.canonicalAuthority,
                  scopes: request.scopes
                };
                endpoint = UrlString.appendQueryString(authority.tokenEndpoint, queryParameters);
                return [2, this.executePostToTokenEndpoint(endpoint, requestBody, headers, thumbprint)];
            }
          });
        });
      };
      RefreshTokenClient2.prototype.createTokenQueryParameters = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        if (request.tokenQueryParameters) {
          parameterBuilder.addExtraQueryParameters(request.tokenQueryParameters);
        }
        return parameterBuilder.createQueryString();
      };
      RefreshTokenClient2.prototype.createTokenRequestBody = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var parameterBuilder, correlationId, clientAssertion, popTokenGenerator, _a, _b, clientInfo;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                parameterBuilder = new RequestParameterBuilder();
                parameterBuilder.addClientId(this.config.authOptions.clientId);
                parameterBuilder.addScopes(request.scopes);
                parameterBuilder.addGrantType(GrantType.REFRESH_TOKEN_GRANT);
                parameterBuilder.addClientInfo();
                parameterBuilder.addLibraryInfo(this.config.libraryInfo);
                parameterBuilder.addThrottling();
                if (this.serverTelemetryManager) {
                  parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
                }
                correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
                parameterBuilder.addCorrelationId(correlationId);
                parameterBuilder.addRefreshToken(request.refreshToken);
                if (this.config.clientCredentials.clientSecret) {
                  parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
                }
                if (this.config.clientCredentials.clientAssertion) {
                  clientAssertion = this.config.clientCredentials.clientAssertion;
                  parameterBuilder.addClientAssertion(clientAssertion.assertion);
                  parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
                }
                if (!(request.authenticationScheme === exports.AuthenticationScheme.POP))
                  return [3, 2];
                popTokenGenerator = new PopTokenGenerator(this.cryptoUtils);
                _b = (_a = parameterBuilder).addPopToken;
                return [4, popTokenGenerator.generateCnf(request)];
              case 1:
                _b.apply(_a, [_c.sent()]);
                _c.label = 2;
              case 2:
                if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
                  parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
                }
                if (this.config.systemOptions.preventCorsPreflight && request.ccsCredential) {
                  switch (request.ccsCredential.type) {
                    case exports.CcsCredentialType.HOME_ACCOUNT_ID:
                      try {
                        clientInfo = buildClientInfoFromHomeAccountId(request.ccsCredential.credential);
                        parameterBuilder.addCcsOid(clientInfo);
                      } catch (e) {
                        this.logger.verbose("Could not parse home account ID for CCS Header: " + e);
                      }
                      break;
                    case exports.CcsCredentialType.UPN:
                      parameterBuilder.addCcsUpn(request.ccsCredential.credential);
                      break;
                  }
                }
                return [2, parameterBuilder.createQueryString()];
            }
          });
        });
      };
      return RefreshTokenClient2;
    }(BaseClient);
    var ClientCredentialClient = function(_super) {
      __extends(ClientCredentialClient2, _super);
      function ClientCredentialClient2(configuration) {
        return _super.call(this, configuration) || this;
      }
      ClientCredentialClient2.prototype.acquireToken = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var cachedAuthenticationResult;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                this.scopeSet = new ScopeSet(request.scopes || []);
                if (!request.skipCache)
                  return [3, 2];
                return [4, this.executeTokenRequest(request, this.authority)];
              case 1:
                return [2, _a.sent()];
              case 2:
                return [4, this.getCachedAuthenticationResult(request)];
              case 3:
                cachedAuthenticationResult = _a.sent();
                if (!cachedAuthenticationResult)
                  return [3, 4];
                return [2, cachedAuthenticationResult];
              case 4:
                return [4, this.executeTokenRequest(request, this.authority)];
              case 5:
                return [2, _a.sent()];
            }
          });
        });
      };
      ClientCredentialClient2.prototype.getCachedAuthenticationResult = function(request) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function() {
          var cachedAccessToken;
          return __generator(this, function(_c) {
            switch (_c.label) {
              case 0:
                cachedAccessToken = this.readAccessTokenFromCache();
                if (!cachedAccessToken) {
                  (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                  return [2, null];
                }
                if (TimeUtils.isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                  (_b = this.serverTelemetryManager) === null || _b === void 0 ? void 0 : _b.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
                  return [2, null];
                }
                return [4, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
                  account: null,
                  idToken: null,
                  accessToken: cachedAccessToken,
                  refreshToken: null,
                  appMetadata: null
                }, true, request)];
              case 1:
                return [2, _c.sent()];
            }
          });
        });
      };
      ClientCredentialClient2.prototype.readAccessTokenFromCache = function() {
        var accessTokenFilter = {
          homeAccountId: "",
          environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
          credentialType: exports.CredentialType.ACCESS_TOKEN,
          clientId: this.config.authOptions.clientId,
          realm: this.authority.tenant,
          target: this.scopeSet.printScopesLowerCase()
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function(key) {
          return credentialCache.accessTokens[key];
        });
        if (accessTokens.length < 1) {
          return null;
        } else if (accessTokens.length > 1) {
          throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
      };
      ClientCredentialClient2.prototype.executeTokenRequest = function(request, authority) {
        return __awaiter(this, void 0, void 0, function() {
          var requestBody, headers, thumbprint, reqTimestamp, response, responseHandler, tokenResponse;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                requestBody = this.createTokenRequestBody(request);
                headers = this.createTokenRequestHeaders();
                thumbprint = {
                  clientId: this.config.authOptions.clientId,
                  authority: request.authority,
                  scopes: request.scopes
                };
                reqTimestamp = TimeUtils.nowSeconds();
                return [4, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
              case 1:
                response = _a.sent();
                responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                responseHandler.validateTokenResponse(response.body);
                return [4, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request)];
              case 2:
                tokenResponse = _a.sent();
                return [2, tokenResponse];
            }
          });
        });
      };
      ClientCredentialClient2.prototype.createTokenRequestBody = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes, false);
        parameterBuilder.addGrantType(GrantType.CLIENT_CREDENTIALS_GRANT);
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
          parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (this.config.clientCredentials.clientSecret) {
          parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
          var clientAssertion = this.config.clientCredentials.clientAssertion;
          parameterBuilder.addClientAssertion(clientAssertion.assertion);
          parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
          parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        return parameterBuilder.createQueryString();
      };
      return ClientCredentialClient2;
    }(BaseClient);
    var OnBehalfOfClient = function(_super) {
      __extends(OnBehalfOfClient2, _super);
      function OnBehalfOfClient2(configuration) {
        return _super.call(this, configuration) || this;
      }
      OnBehalfOfClient2.prototype.acquireToken = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var cachedAuthenticationResult;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                this.scopeSet = new ScopeSet(request.scopes || []);
                if (!request.skipCache)
                  return [3, 2];
                return [4, this.executeTokenRequest(request, this.authority)];
              case 1:
                return [2, _a.sent()];
              case 2:
                return [4, this.getCachedAuthenticationResult(request)];
              case 3:
                cachedAuthenticationResult = _a.sent();
                if (!cachedAuthenticationResult)
                  return [3, 4];
                return [2, cachedAuthenticationResult];
              case 4:
                return [4, this.executeTokenRequest(request, this.authority)];
              case 5:
                return [2, _a.sent()];
            }
          });
        });
      };
      OnBehalfOfClient2.prototype.getCachedAuthenticationResult = function(request) {
        var _a;
        return __awaiter(this, void 0, void 0, function() {
          var cachedAccessToken, cachedIdToken, idTokenObject, cachedAccount, localAccountId, accountInfo;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                cachedAccessToken = this.readAccessTokenFromCache();
                if (!cachedAccessToken || TimeUtils.isTokenExpired(cachedAccessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                  (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(!cachedAccessToken ? CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED : CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                  return [2, null];
                }
                cachedIdToken = this.readIdTokenFromCache(request);
                cachedAccount = null;
                if (cachedIdToken) {
                  idTokenObject = new AuthToken(cachedIdToken.secret, this.config.cryptoInterface);
                  localAccountId = idTokenObject.claims.oid ? idTokenObject.claims.oid : idTokenObject.claims.sub;
                  accountInfo = {
                    homeAccountId: cachedIdToken.homeAccountId,
                    environment: cachedIdToken.environment,
                    tenantId: cachedIdToken.realm,
                    username: Constants.EMPTY_STRING,
                    localAccountId: localAccountId || ""
                  };
                  cachedAccount = this.readAccountFromCache(accountInfo);
                }
                return [4, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, {
                  account: cachedAccount,
                  accessToken: cachedAccessToken,
                  idToken: cachedIdToken,
                  refreshToken: null,
                  appMetadata: null
                }, true, request, idTokenObject)];
              case 1:
                return [2, _b.sent()];
            }
          });
        });
      };
      OnBehalfOfClient2.prototype.readAccessTokenFromCache = function() {
        var accessTokenFilter = {
          environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
          credentialType: exports.CredentialType.ACCESS_TOKEN,
          clientId: this.config.authOptions.clientId,
          realm: this.authority.tenant,
          target: this.scopeSet.printScopesLowerCase()
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(accessTokenFilter);
        var accessTokens = Object.keys(credentialCache.accessTokens).map(function(key) {
          return credentialCache.accessTokens[key];
        });
        var numAccessTokens = accessTokens.length;
        if (numAccessTokens < 1) {
          return null;
        } else if (numAccessTokens > 1) {
          throw ClientAuthError.createMultipleMatchingTokensInCacheError();
        }
        return accessTokens[0];
      };
      OnBehalfOfClient2.prototype.readIdTokenFromCache = function(request) {
        var idTokenFilter = {
          environment: this.authority.canonicalAuthorityUrlComponents.HostNameAndPort,
          credentialType: exports.CredentialType.ID_TOKEN,
          clientId: this.config.authOptions.clientId,
          realm: this.authority.tenant,
          oboAssertion: request.oboAssertion
        };
        var credentialCache = this.cacheManager.getCredentialsFilteredBy(idTokenFilter);
        var idTokens = Object.keys(credentialCache.idTokens).map(function(key) {
          return credentialCache.idTokens[key];
        });
        if (idTokens.length < 1) {
          return null;
        }
        return idTokens[0];
      };
      OnBehalfOfClient2.prototype.readAccountFromCache = function(account) {
        return this.cacheManager.readAccountFromCache(account);
      };
      OnBehalfOfClient2.prototype.executeTokenRequest = function(request, authority) {
        return __awaiter(this, void 0, void 0, function() {
          var requestBody, headers, thumbprint, reqTimestamp, response, responseHandler, tokenResponse;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                requestBody = this.createTokenRequestBody(request);
                headers = this.createTokenRequestHeaders();
                thumbprint = {
                  clientId: this.config.authOptions.clientId,
                  authority: request.authority,
                  scopes: request.scopes
                };
                reqTimestamp = TimeUtils.nowSeconds();
                return [4, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
              case 1:
                response = _a.sent();
                responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                responseHandler.validateTokenResponse(response.body);
                return [4, responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request)];
              case 2:
                tokenResponse = _a.sent();
                return [2, tokenResponse];
            }
          });
        });
      };
      OnBehalfOfClient2.prototype.createTokenRequestBody = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addGrantType(GrantType.JWT_BEARER);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
          parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        parameterBuilder.addRequestTokenUse(AADServerParamKeys.ON_BEHALF_OF);
        parameterBuilder.addOboAssertion(request.oboAssertion);
        if (this.config.clientCredentials.clientSecret) {
          parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
          var clientAssertion = this.config.clientCredentials.clientAssertion;
          parameterBuilder.addClientAssertion(clientAssertion.assertion);
          parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        return parameterBuilder.createQueryString();
      };
      return OnBehalfOfClient2;
    }(BaseClient);
    var SilentFlowClient = function(_super) {
      __extends(SilentFlowClient2, _super);
      function SilentFlowClient2(configuration) {
        return _super.call(this, configuration) || this;
      }
      SilentFlowClient2.prototype.acquireToken = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var e_1, refreshTokenClient;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, this.acquireCachedToken(request)];
              case 1:
                return [2, _a.sent()];
              case 2:
                e_1 = _a.sent();
                if (e_1 instanceof ClientAuthError && e_1.errorCode === ClientAuthErrorMessage.tokenRefreshRequired.code) {
                  refreshTokenClient = new RefreshTokenClient(this.config);
                  return [2, refreshTokenClient.acquireTokenByRefreshToken(request)];
                } else {
                  throw e_1;
                }
              case 3:
                return [2];
            }
          });
        });
      };
      SilentFlowClient2.prototype.acquireCachedToken = function(request) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function() {
          var requestScopes, environment, authScheme, cacheRecord;
          return __generator(this, function(_e) {
            switch (_e.label) {
              case 0:
                if (!request) {
                  throw ClientConfigurationError.createEmptyTokenRequestError();
                }
                if (!request.account) {
                  throw ClientAuthError.createNoAccountInSilentRequestError();
                }
                requestScopes = new ScopeSet(request.scopes || []);
                environment = request.authority || this.authority.getPreferredCache();
                authScheme = request.authenticationScheme || exports.AuthenticationScheme.BEARER;
                cacheRecord = this.cacheManager.readCacheRecord(request.account, this.config.authOptions.clientId, requestScopes, environment, authScheme);
                if (request.forceRefresh) {
                  (_a = this.serverTelemetryManager) === null || _a === void 0 ? void 0 : _a.setCacheOutcome(CacheOutcome.FORCE_REFRESH);
                  throw ClientAuthError.createRefreshRequiredError();
                } else if (!cacheRecord.accessToken) {
                  (_b = this.serverTelemetryManager) === null || _b === void 0 ? void 0 : _b.setCacheOutcome(CacheOutcome.NO_CACHED_ACCESS_TOKEN);
                  throw ClientAuthError.createRefreshRequiredError();
                } else if (TimeUtils.wasClockTurnedBack(cacheRecord.accessToken.cachedAt) || TimeUtils.isTokenExpired(cacheRecord.accessToken.expiresOn, this.config.systemOptions.tokenRenewalOffsetSeconds)) {
                  (_c = this.serverTelemetryManager) === null || _c === void 0 ? void 0 : _c.setCacheOutcome(CacheOutcome.CACHED_ACCESS_TOKEN_EXPIRED);
                  throw ClientAuthError.createRefreshRequiredError();
                } else if (cacheRecord.accessToken.refreshOn && TimeUtils.isTokenExpired(cacheRecord.accessToken.refreshOn, 0)) {
                  (_d = this.serverTelemetryManager) === null || _d === void 0 ? void 0 : _d.setCacheOutcome(CacheOutcome.REFRESH_CACHED_ACCESS_TOKEN);
                  throw ClientAuthError.createRefreshRequiredError();
                } else if (!StringUtils.isEmptyObj(request.claims)) {
                  throw ClientAuthError.createRefreshRequiredError();
                }
                if (this.config.serverTelemetryManager) {
                  this.config.serverTelemetryManager.incrementCacheHits();
                }
                return [4, this.generateResultFromCacheRecord(cacheRecord, request)];
              case 1:
                return [2, _e.sent()];
            }
          });
        });
      };
      SilentFlowClient2.prototype.generateResultFromCacheRecord = function(cacheRecord, request) {
        return __awaiter(this, void 0, void 0, function() {
          var idTokenObj;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                if (cacheRecord.idToken) {
                  idTokenObj = new AuthToken(cacheRecord.idToken.secret, this.config.cryptoInterface);
                }
                return [4, ResponseHandler.generateAuthenticationResult(this.cryptoUtils, this.authority, cacheRecord, true, request, idTokenObj)];
              case 1:
                return [2, _a.sent()];
            }
          });
        });
      };
      return SilentFlowClient2;
    }(BaseClient);
    var UsernamePasswordClient = function(_super) {
      __extends(UsernamePasswordClient2, _super);
      function UsernamePasswordClient2(configuration) {
        return _super.call(this, configuration) || this;
      }
      UsernamePasswordClient2.prototype.acquireToken = function(request) {
        return __awaiter(this, void 0, void 0, function() {
          var reqTimestamp, response, responseHandler, tokenResponse;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                this.logger.info("in acquireToken call");
                reqTimestamp = TimeUtils.nowSeconds();
                return [4, this.executeTokenRequest(this.authority, request)];
              case 1:
                response = _a.sent();
                responseHandler = new ResponseHandler(this.config.authOptions.clientId, this.cacheManager, this.cryptoUtils, this.logger, this.config.serializableCache, this.config.persistencePlugin);
                responseHandler.validateTokenResponse(response.body);
                tokenResponse = responseHandler.handleServerTokenResponse(response.body, this.authority, reqTimestamp, request);
                return [2, tokenResponse];
            }
          });
        });
      };
      UsernamePasswordClient2.prototype.executeTokenRequest = function(authority, request) {
        return __awaiter(this, void 0, void 0, function() {
          var thumbprint, requestBody, headers;
          return __generator(this, function(_a) {
            thumbprint = {
              clientId: this.config.authOptions.clientId,
              authority: authority.canonicalAuthority,
              scopes: request.scopes
            };
            requestBody = this.createTokenRequestBody(request);
            headers = this.createTokenRequestHeaders({
              credential: request.username,
              type: exports.CcsCredentialType.UPN
            });
            return [2, this.executePostToTokenEndpoint(authority.tokenEndpoint, requestBody, headers, thumbprint)];
          });
        });
      };
      UsernamePasswordClient2.prototype.createTokenRequestBody = function(request) {
        var parameterBuilder = new RequestParameterBuilder();
        parameterBuilder.addClientId(this.config.authOptions.clientId);
        parameterBuilder.addUsername(request.username);
        parameterBuilder.addPassword(request.password);
        parameterBuilder.addScopes(request.scopes);
        parameterBuilder.addGrantType(GrantType.RESOURCE_OWNER_PASSWORD_GRANT);
        parameterBuilder.addClientInfo();
        parameterBuilder.addLibraryInfo(this.config.libraryInfo);
        parameterBuilder.addThrottling();
        if (this.serverTelemetryManager) {
          parameterBuilder.addServerTelemetry(this.serverTelemetryManager);
        }
        var correlationId = request.correlationId || this.config.cryptoInterface.createNewGuid();
        parameterBuilder.addCorrelationId(correlationId);
        if (this.config.clientCredentials.clientSecret) {
          parameterBuilder.addClientSecret(this.config.clientCredentials.clientSecret);
        }
        if (this.config.clientCredentials.clientAssertion) {
          var clientAssertion = this.config.clientCredentials.clientAssertion;
          parameterBuilder.addClientAssertion(clientAssertion.assertion);
          parameterBuilder.addClientAssertionType(clientAssertion.assertionType);
        }
        if (!StringUtils.isEmptyObj(request.claims) || this.config.authOptions.clientCapabilities && this.config.authOptions.clientCapabilities.length > 0) {
          parameterBuilder.addClaims(request.claims, this.config.authOptions.clientCapabilities);
        }
        if (this.config.systemOptions.preventCorsPreflight && request.username) {
          parameterBuilder.addCcsUpn(request.username);
        }
        return parameterBuilder.createQueryString();
      };
      return UsernamePasswordClient2;
    }(BaseClient);
    function isOpenIdConfigResponse(response) {
      return response.hasOwnProperty("authorization_endpoint") && response.hasOwnProperty("token_endpoint") && response.hasOwnProperty("end_session_endpoint") && response.hasOwnProperty("issuer");
    }
    (function(ProtocolMode) {
      ProtocolMode["AAD"] = "AAD";
      ProtocolMode["OIDC"] = "OIDC";
    })(exports.ProtocolMode || (exports.ProtocolMode = {}));
    var AuthorityMetadataEntity = function() {
      function AuthorityMetadataEntity2() {
        this.expiresAt = TimeUtils.nowSeconds() + AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
      }
      AuthorityMetadataEntity2.prototype.updateCloudDiscoveryMetadata = function(metadata, fromNetwork) {
        this.aliases = metadata.aliases;
        this.preferred_cache = metadata.preferred_cache;
        this.preferred_network = metadata.preferred_network;
        this.aliasesFromNetwork = fromNetwork;
      };
      AuthorityMetadataEntity2.prototype.updateEndpointMetadata = function(metadata, fromNetwork) {
        this.authorization_endpoint = metadata.authorization_endpoint;
        this.token_endpoint = metadata.token_endpoint;
        this.end_session_endpoint = metadata.end_session_endpoint;
        this.issuer = metadata.issuer;
        this.endpointsFromNetwork = fromNetwork;
      };
      AuthorityMetadataEntity2.prototype.updateCanonicalAuthority = function(authority) {
        this.canonical_authority = authority;
      };
      AuthorityMetadataEntity2.prototype.resetExpiresAt = function() {
        this.expiresAt = TimeUtils.nowSeconds() + AUTHORITY_METADATA_CONSTANTS.REFRESH_TIME_SECONDS;
      };
      AuthorityMetadataEntity2.prototype.isExpired = function() {
        return this.expiresAt <= TimeUtils.nowSeconds();
      };
      AuthorityMetadataEntity2.isAuthorityMetadataEntity = function(key, entity) {
        if (!entity) {
          return false;
        }
        return key.indexOf(AUTHORITY_METADATA_CONSTANTS.CACHE_KEY) === 0 && entity.hasOwnProperty("aliases") && entity.hasOwnProperty("preferred_cache") && entity.hasOwnProperty("preferred_network") && entity.hasOwnProperty("canonical_authority") && entity.hasOwnProperty("authorization_endpoint") && entity.hasOwnProperty("token_endpoint") && entity.hasOwnProperty("end_session_endpoint") && entity.hasOwnProperty("issuer") && entity.hasOwnProperty("aliasesFromNetwork") && entity.hasOwnProperty("endpointsFromNetwork") && entity.hasOwnProperty("expiresAt");
      };
      return AuthorityMetadataEntity2;
    }();
    function isCloudInstanceDiscoveryResponse(response) {
      return response.hasOwnProperty("tenant_discovery_endpoint") && response.hasOwnProperty("metadata");
    }
    var RegionDiscovery = function() {
      function RegionDiscovery2(networkInterface) {
        this.networkInterface = networkInterface;
      }
      RegionDiscovery2.prototype.detectRegion = function(environmentRegion, regionDiscoveryMetadata) {
        return __awaiter(this, void 0, void 0, function() {
          var autodetectedRegionName, localIMDSVersionResponse, currentIMDSVersion, currentIMDSVersionResponse, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                autodetectedRegionName = environmentRegion;
                if (!!autodetectedRegionName)
                  return [3, 8];
                _a.label = 1;
              case 1:
                _a.trys.push([1, 6, , 7]);
                return [4, this.getRegionFromIMDS(Constants.IMDS_VERSION)];
              case 2:
                localIMDSVersionResponse = _a.sent();
                if (localIMDSVersionResponse.status === ResponseCodes.httpSuccess) {
                  autodetectedRegionName = localIMDSVersionResponse.body;
                  regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
                }
                if (!(localIMDSVersionResponse.status === ResponseCodes.httpBadRequest))
                  return [3, 5];
                return [4, this.getCurrentVersion()];
              case 3:
                currentIMDSVersion = _a.sent();
                if (!currentIMDSVersion) {
                  regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                  return [2, null];
                }
                return [4, this.getRegionFromIMDS(currentIMDSVersion)];
              case 4:
                currentIMDSVersionResponse = _a.sent();
                if (currentIMDSVersionResponse.status === ResponseCodes.httpSuccess) {
                  autodetectedRegionName = currentIMDSVersionResponse.body;
                  regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
                }
                _a.label = 5;
              case 5:
                return [3, 7];
              case 6:
                e_1 = _a.sent();
                regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                return [2, null];
              case 7:
                return [3, 9];
              case 8:
                regionDiscoveryMetadata.region_source = RegionDiscoverySources.ENVIRONMENT_VARIABLE;
                _a.label = 9;
              case 9:
                if (!autodetectedRegionName) {
                  regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                }
                return [2, autodetectedRegionName || null];
            }
          });
        });
      };
      RegionDiscovery2.prototype.getRegionFromIMDS = function(version2) {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a) {
            return [2, this.networkInterface.sendGetRequestAsync(Constants.IMDS_ENDPOINT + "?api-version=" + version2 + "&format=text", RegionDiscovery2.IMDS_OPTIONS, Constants.IMDS_TIMEOUT)];
          });
        });
      };
      RegionDiscovery2.prototype.getCurrentVersion = function() {
        return __awaiter(this, void 0, void 0, function() {
          var response, e_2;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, this.networkInterface.sendGetRequestAsync(Constants.IMDS_ENDPOINT + "?format=json", RegionDiscovery2.IMDS_OPTIONS)];
              case 1:
                response = _a.sent();
                if (response.status === ResponseCodes.httpBadRequest && response.body && response.body["newest-versions"] && response.body["newest-versions"].length > 0) {
                  return [2, response.body["newest-versions"][0]];
                }
                return [2, null];
              case 2:
                e_2 = _a.sent();
                return [2, null];
              case 3:
                return [2];
            }
          });
        });
      };
      RegionDiscovery2.IMDS_OPTIONS = { headers: { "Metadata": "true" } };
      return RegionDiscovery2;
    }();
    var Authority = function() {
      function Authority2(authority, networkInterface, cacheManager, authorityOptions) {
        this.canonicalAuthority = authority;
        this._canonicalAuthority.validateAsUri();
        this.networkInterface = networkInterface;
        this.cacheManager = cacheManager;
        this.authorityOptions = authorityOptions;
        this.regionDiscovery = new RegionDiscovery(networkInterface);
        this.regionDiscoveryMetadata = { region_used: void 0, region_source: void 0, region_outcome: void 0 };
      }
      Object.defineProperty(Authority2.prototype, "authorityType", {
        get: function() {
          var pathSegments = this.canonicalAuthorityUrlComponents.PathSegments;
          if (pathSegments.length && pathSegments[0].toLowerCase() === Constants.ADFS) {
            return exports.AuthorityType.Adfs;
          }
          return exports.AuthorityType.Default;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "protocolMode", {
        get: function() {
          return this.authorityOptions.protocolMode;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "options", {
        get: function() {
          return this.authorityOptions;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "canonicalAuthority", {
        get: function() {
          return this._canonicalAuthority.urlString;
        },
        set: function(url) {
          this._canonicalAuthority = new UrlString(url);
          this._canonicalAuthority.validateAsUri();
          this._canonicalAuthorityUrlComponents = null;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "canonicalAuthorityUrlComponents", {
        get: function() {
          if (!this._canonicalAuthorityUrlComponents) {
            this._canonicalAuthorityUrlComponents = this._canonicalAuthority.getUrlComponents();
          }
          return this._canonicalAuthorityUrlComponents;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "hostnameAndPort", {
        get: function() {
          return this.canonicalAuthorityUrlComponents.HostNameAndPort.toLowerCase();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "tenant", {
        get: function() {
          return this.canonicalAuthorityUrlComponents.PathSegments[0];
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "authorizationEndpoint", {
        get: function() {
          if (this.discoveryComplete()) {
            var endpoint = this.replacePath(this.metadata.authorization_endpoint);
            return this.replaceTenant(endpoint);
          } else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "tokenEndpoint", {
        get: function() {
          if (this.discoveryComplete()) {
            var endpoint = this.replacePath(this.metadata.token_endpoint);
            return this.replaceTenant(endpoint);
          } else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "deviceCodeEndpoint", {
        get: function() {
          if (this.discoveryComplete()) {
            var endpoint = this.replacePath(this.metadata.token_endpoint.replace("/token", "/devicecode"));
            return this.replaceTenant(endpoint);
          } else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "endSessionEndpoint", {
        get: function() {
          if (this.discoveryComplete()) {
            var endpoint = this.replacePath(this.metadata.end_session_endpoint);
            return this.replaceTenant(endpoint);
          } else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
          }
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(Authority2.prototype, "selfSignedJwtAudience", {
        get: function() {
          if (this.discoveryComplete()) {
            var endpoint = this.replacePath(this.metadata.issuer);
            return this.replaceTenant(endpoint);
          } else {
            throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
          }
        },
        enumerable: true,
        configurable: true
      });
      Authority2.prototype.replaceTenant = function(urlString) {
        return urlString.replace(/{tenant}|{tenantid}/g, this.tenant);
      };
      Authority2.prototype.replacePath = function(urlString) {
        var endpoint = urlString;
        var cachedAuthorityUrl = new UrlString(this.metadata.canonical_authority);
        var cachedAuthorityParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        var currentAuthorityParts = this.canonicalAuthorityUrlComponents.PathSegments;
        currentAuthorityParts.forEach(function(currentPart, index) {
          var cachedPart = cachedAuthorityParts[index];
          if (currentPart !== cachedPart) {
            endpoint = endpoint.replace("/" + cachedPart + "/", "/" + currentPart + "/");
          }
        });
        return endpoint;
      };
      Object.defineProperty(Authority2.prototype, "defaultOpenIdConfigurationEndpoint", {
        get: function() {
          if (this.authorityType === exports.AuthorityType.Adfs || this.protocolMode === exports.ProtocolMode.OIDC) {
            return this.canonicalAuthority + ".well-known/openid-configuration";
          }
          return this.canonicalAuthority + "v2.0/.well-known/openid-configuration";
        },
        enumerable: true,
        configurable: true
      });
      Authority2.prototype.discoveryComplete = function() {
        return !!this.metadata;
      };
      Authority2.prototype.resolveEndpointsAsync = function() {
        return __awaiter(this, void 0, void 0, function() {
          var metadataEntity, cloudDiscoverySource, endpointSource, cacheKey;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                metadataEntity = this.cacheManager.getAuthorityMetadataByAlias(this.hostnameAndPort);
                if (!metadataEntity) {
                  metadataEntity = new AuthorityMetadataEntity();
                  metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
                }
                return [4, this.updateCloudDiscoveryMetadata(metadataEntity)];
              case 1:
                cloudDiscoverySource = _a.sent();
                this.canonicalAuthority = this.canonicalAuthority.replace(this.hostnameAndPort, metadataEntity.preferred_network);
                return [4, this.updateEndpointMetadata(metadataEntity)];
              case 2:
                endpointSource = _a.sent();
                if (cloudDiscoverySource !== AuthorityMetadataSource.CACHE && endpointSource !== AuthorityMetadataSource.CACHE) {
                  metadataEntity.resetExpiresAt();
                  metadataEntity.updateCanonicalAuthority(this.canonicalAuthority);
                }
                cacheKey = this.cacheManager.generateAuthorityMetadataCacheKey(metadataEntity.preferred_cache);
                this.cacheManager.setAuthorityMetadata(cacheKey, metadataEntity);
                this.metadata = metadataEntity;
                return [2];
            }
          });
        });
      };
      Authority2.prototype.updateEndpointMetadata = function(metadataEntity) {
        var _a;
        return __awaiter(this, void 0, void 0, function() {
          var metadata, autodetectedRegionName, azureRegion;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                metadata = this.getEndpointMetadataFromConfig();
                if (metadata) {
                  metadataEntity.updateEndpointMetadata(metadata, false);
                  return [2, AuthorityMetadataSource.CONFIG];
                }
                if (this.isAuthoritySameType(metadataEntity) && metadataEntity.endpointsFromNetwork && !metadataEntity.isExpired()) {
                  return [2, AuthorityMetadataSource.CACHE];
                }
                return [4, this.getEndpointMetadataFromNetwork()];
              case 1:
                metadata = _b.sent();
                if (!metadata)
                  return [3, 4];
                if (!((_a = this.authorityOptions.azureRegionConfiguration) === null || _a === void 0 ? void 0 : _a.azureRegion))
                  return [3, 3];
                return [4, this.regionDiscovery.detectRegion(this.authorityOptions.azureRegionConfiguration.environmentRegion, this.regionDiscoveryMetadata)];
              case 2:
                autodetectedRegionName = _b.sent();
                azureRegion = this.authorityOptions.azureRegionConfiguration.azureRegion === Constants.AZURE_REGION_AUTO_DISCOVER_FLAG ? autodetectedRegionName : this.authorityOptions.azureRegionConfiguration.azureRegion;
                if (this.authorityOptions.azureRegionConfiguration.azureRegion === Constants.AZURE_REGION_AUTO_DISCOVER_FLAG) {
                  this.regionDiscoveryMetadata.region_outcome = autodetectedRegionName ? RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_SUCCESSFUL : RegionDiscoveryOutcomes.AUTO_DETECTION_REQUESTED_FAILED;
                } else {
                  if (autodetectedRegionName) {
                    this.regionDiscoveryMetadata.region_outcome = this.authorityOptions.azureRegionConfiguration.azureRegion === autodetectedRegionName ? RegionDiscoveryOutcomes.CONFIGURED_MATCHES_DETECTED : RegionDiscoveryOutcomes.CONFIGURED_NOT_DETECTED;
                  } else {
                    this.regionDiscoveryMetadata.region_outcome = RegionDiscoveryOutcomes.CONFIGURED_NO_AUTO_DETECTION;
                  }
                }
                if (azureRegion) {
                  this.regionDiscoveryMetadata.region_used = azureRegion;
                  metadata = Authority2.replaceWithRegionalInformation(metadata, azureRegion);
                }
                _b.label = 3;
              case 3:
                metadataEntity.updateEndpointMetadata(metadata, true);
                return [2, AuthorityMetadataSource.NETWORK];
              case 4:
                throw ClientAuthError.createUnableToGetOpenidConfigError(this.defaultOpenIdConfigurationEndpoint);
            }
          });
        });
      };
      Authority2.prototype.isAuthoritySameType = function(metadataEntity) {
        var cachedAuthorityUrl = new UrlString(metadataEntity.canonical_authority);
        var cachedParts = cachedAuthorityUrl.getUrlComponents().PathSegments;
        return cachedParts.length === this.canonicalAuthorityUrlComponents.PathSegments.length;
      };
      Authority2.prototype.getEndpointMetadataFromConfig = function() {
        if (this.authorityOptions.authorityMetadata) {
          try {
            return JSON.parse(this.authorityOptions.authorityMetadata);
          } catch (e) {
            throw ClientConfigurationError.createInvalidAuthorityMetadataError();
          }
        }
        return null;
      };
      Authority2.prototype.getEndpointMetadataFromNetwork = function() {
        return __awaiter(this, void 0, void 0, function() {
          var response, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, this.networkInterface.sendGetRequestAsync(this.defaultOpenIdConfigurationEndpoint)];
              case 1:
                response = _a.sent();
                return [2, isOpenIdConfigResponse(response.body) ? response.body : null];
              case 2:
                e_1 = _a.sent();
                return [2, null];
              case 3:
                return [2];
            }
          });
        });
      };
      Authority2.prototype.updateCloudDiscoveryMetadata = function(metadataEntity) {
        return __awaiter(this, void 0, void 0, function() {
          var metadata;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                metadata = this.getCloudDiscoveryMetadataFromConfig();
                if (metadata) {
                  metadataEntity.updateCloudDiscoveryMetadata(metadata, false);
                  return [2, AuthorityMetadataSource.CONFIG];
                }
                if (this.isAuthoritySameType(metadataEntity) && metadataEntity.aliasesFromNetwork && !metadataEntity.isExpired()) {
                  return [2, AuthorityMetadataSource.CACHE];
                }
                return [4, this.getCloudDiscoveryMetadataFromNetwork()];
              case 1:
                metadata = _a.sent();
                if (metadata) {
                  metadataEntity.updateCloudDiscoveryMetadata(metadata, true);
                  return [2, AuthorityMetadataSource.NETWORK];
                } else {
                  throw ClientConfigurationError.createUntrustedAuthorityError();
                }
            }
          });
        });
      };
      Authority2.prototype.getCloudDiscoveryMetadataFromConfig = function() {
        if (this.authorityOptions.cloudDiscoveryMetadata) {
          try {
            var parsedResponse = JSON.parse(this.authorityOptions.cloudDiscoveryMetadata);
            var metadata = Authority2.getCloudDiscoveryMetadataFromNetworkResponse(parsedResponse.metadata, this.hostnameAndPort);
            if (metadata) {
              return metadata;
            }
          } catch (e) {
            throw ClientConfigurationError.createInvalidCloudDiscoveryMetadataError();
          }
        }
        if (this.isInKnownAuthorities()) {
          return Authority2.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
        }
        return null;
      };
      Authority2.prototype.getCloudDiscoveryMetadataFromNetwork = function() {
        return __awaiter(this, void 0, void 0, function() {
          var instanceDiscoveryEndpoint, match, response, metadata, e_2;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                instanceDiscoveryEndpoint = "" + Constants.AAD_INSTANCE_DISCOVERY_ENDPT + this.canonicalAuthority + "oauth2/v2.0/authorize";
                match = null;
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, this.networkInterface.sendGetRequestAsync(instanceDiscoveryEndpoint)];
              case 2:
                response = _a.sent();
                metadata = isCloudInstanceDiscoveryResponse(response.body) ? response.body.metadata : [];
                if (metadata.length === 0) {
                  return [2, null];
                }
                match = Authority2.getCloudDiscoveryMetadataFromNetworkResponse(metadata, this.hostnameAndPort);
                return [3, 4];
              case 3:
                e_2 = _a.sent();
                return [2, null];
              case 4:
                if (!match) {
                  match = Authority2.createCloudDiscoveryMetadataFromHost(this.hostnameAndPort);
                }
                return [2, match];
            }
          });
        });
      };
      Authority2.prototype.isInKnownAuthorities = function() {
        var _this = this;
        var matches = this.authorityOptions.knownAuthorities.filter(function(authority) {
          return UrlString.getDomainFromUrl(authority).toLowerCase() === _this.hostnameAndPort;
        });
        return matches.length > 0;
      };
      Authority2.createCloudDiscoveryMetadataFromHost = function(host) {
        return {
          preferred_network: host,
          preferred_cache: host,
          aliases: [host]
        };
      };
      Authority2.getCloudDiscoveryMetadataFromNetworkResponse = function(response, authority) {
        for (var i = 0; i < response.length; i++) {
          var metadata = response[i];
          if (metadata.aliases.indexOf(authority) > -1) {
            return metadata;
          }
        }
        return null;
      };
      Authority2.prototype.getPreferredCache = function() {
        if (this.discoveryComplete()) {
          return this.metadata.preferred_cache;
        } else {
          throw ClientAuthError.createEndpointDiscoveryIncompleteError("Discovery incomplete.");
        }
      };
      Authority2.prototype.isAlias = function(host) {
        return this.metadata.aliases.indexOf(host) > -1;
      };
      Authority2.isPublicCloudAuthority = function(host) {
        return Constants.KNOWN_PUBLIC_CLOUDS.indexOf(host) >= 0;
      };
      Authority2.buildRegionalAuthorityString = function(host, region, queryString) {
        var authorityUrlInstance = new UrlString(host);
        authorityUrlInstance.validateAsUri();
        var authorityUrlParts = authorityUrlInstance.getUrlComponents();
        var hostNameAndPort = region + "." + authorityUrlParts.HostNameAndPort;
        if (this.isPublicCloudAuthority(authorityUrlParts.HostNameAndPort)) {
          hostNameAndPort = region + "." + Constants.REGIONAL_AUTH_PUBLIC_CLOUD_SUFFIX;
        }
        var url = UrlString.constructAuthorityUriFromObject(__assign(__assign({}, authorityUrlInstance.getUrlComponents()), { HostNameAndPort: hostNameAndPort })).urlString;
        if (queryString)
          return url + "?" + queryString;
        return url;
      };
      Authority2.replaceWithRegionalInformation = function(metadata, azureRegion) {
        metadata.authorization_endpoint = Authority2.buildRegionalAuthorityString(metadata.authorization_endpoint, azureRegion);
        metadata.token_endpoint = Authority2.buildRegionalAuthorityString(metadata.token_endpoint, azureRegion, "allowestsrnonmsi=true");
        metadata.end_session_endpoint = Authority2.buildRegionalAuthorityString(metadata.end_session_endpoint, azureRegion);
        return metadata;
      };
      return Authority2;
    }();
    var AuthorityFactory = function() {
      function AuthorityFactory2() {
      }
      AuthorityFactory2.createDiscoveredInstance = function(authorityUri, networkClient, cacheManager, authorityOptions) {
        return __awaiter(this, void 0, void 0, function() {
          var acquireTokenAuthority, e_1;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                acquireTokenAuthority = AuthorityFactory2.createInstance(authorityUri, networkClient, cacheManager, authorityOptions);
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, , 4]);
                return [4, acquireTokenAuthority.resolveEndpointsAsync()];
              case 2:
                _a.sent();
                return [2, acquireTokenAuthority];
              case 3:
                e_1 = _a.sent();
                throw ClientAuthError.createEndpointDiscoveryIncompleteError(e_1);
              case 4:
                return [2];
            }
          });
        });
      };
      AuthorityFactory2.createInstance = function(authorityUrl, networkInterface, cacheManager, authorityOptions) {
        if (StringUtils.isEmpty(authorityUrl)) {
          throw ClientConfigurationError.createUrlEmptyError();
        }
        return new Authority(authorityUrl, networkInterface, cacheManager, authorityOptions);
      };
      return AuthorityFactory2;
    }();
    var ServerTelemetryEntity = function() {
      function ServerTelemetryEntity2() {
        this.failedRequests = [];
        this.errors = [];
        this.cacheHits = 0;
      }
      ServerTelemetryEntity2.isServerTelemetryEntity = function(key, entity) {
        var validateKey = key.indexOf(SERVER_TELEM_CONSTANTS.CACHE_KEY) === 0;
        var validateEntity = true;
        if (entity) {
          validateEntity = entity.hasOwnProperty("failedRequests") && entity.hasOwnProperty("errors") && entity.hasOwnProperty("cacheHits");
        }
        return validateKey && validateEntity;
      };
      return ServerTelemetryEntity2;
    }();
    var ThrottlingEntity = function() {
      function ThrottlingEntity2() {
      }
      ThrottlingEntity2.isThrottlingEntity = function(key, entity) {
        var validateKey = false;
        if (key) {
          validateKey = key.indexOf(ThrottlingConstants.THROTTLING_PREFIX) === 0;
        }
        var validateEntity = true;
        if (entity) {
          validateEntity = entity.hasOwnProperty("throttleTime");
        }
        return validateKey && validateEntity;
      };
      return ThrottlingEntity2;
    }();
    var StubbedNetworkModule = {
      sendGetRequestAsync: function() {
        var notImplErr = "Network interface - sendGetRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
      },
      sendPostRequestAsync: function() {
        var notImplErr = "Network interface - sendPostRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
      }
    };
    var ServerTelemetryManager = function() {
      function ServerTelemetryManager2(telemetryRequest, cacheManager) {
        this.cacheOutcome = CacheOutcome.NO_CACHE_HIT;
        this.cacheManager = cacheManager;
        this.apiId = telemetryRequest.apiId;
        this.correlationId = telemetryRequest.correlationId;
        this.wrapperSKU = telemetryRequest.wrapperSKU || Constants.EMPTY_STRING;
        this.wrapperVer = telemetryRequest.wrapperVer || Constants.EMPTY_STRING;
        this.telemetryCacheKey = SERVER_TELEM_CONSTANTS.CACHE_KEY + Separators.CACHE_KEY_SEPARATOR + telemetryRequest.clientId;
      }
      ServerTelemetryManager2.prototype.generateCurrentRequestHeaderValue = function() {
        var request = "" + this.apiId + SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR + this.cacheOutcome;
        var platformFields = [this.wrapperSKU, this.wrapperVer].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var regionDiscoveryFields = this.getRegionDiscoveryFields();
        var requestWithRegionDiscoveryFields = [request, regionDiscoveryFields].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [SERVER_TELEM_CONSTANTS.SCHEMA_VERSION, requestWithRegionDiscoveryFields, platformFields].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
      };
      ServerTelemetryManager2.prototype.generateLastRequestHeaderValue = function() {
        var lastRequests = this.getLastRequests();
        var maxErrors = ServerTelemetryManager2.maxErrorsToSend(lastRequests);
        var failedRequests = lastRequests.failedRequests.slice(0, 2 * maxErrors).join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var errors = lastRequests.errors.slice(0, maxErrors).join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var errorCount = lastRequests.errors.length;
        var overflow = maxErrors < errorCount ? SERVER_TELEM_CONSTANTS.OVERFLOW_TRUE : SERVER_TELEM_CONSTANTS.OVERFLOW_FALSE;
        var platformFields = [errorCount, overflow].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [SERVER_TELEM_CONSTANTS.SCHEMA_VERSION, lastRequests.cacheHits, failedRequests, errors, platformFields].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
      };
      ServerTelemetryManager2.prototype.cacheFailedRequest = function(error) {
        var lastRequests = this.getLastRequests();
        if (lastRequests.errors.length >= SERVER_TELEM_CONSTANTS.MAX_CACHED_ERRORS) {
          lastRequests.failedRequests.shift();
          lastRequests.failedRequests.shift();
          lastRequests.errors.shift();
        }
        lastRequests.failedRequests.push(this.apiId, this.correlationId);
        if (!StringUtils.isEmpty(error.subError)) {
          lastRequests.errors.push(error.subError);
        } else if (!StringUtils.isEmpty(error.errorCode)) {
          lastRequests.errors.push(error.errorCode);
        } else if (!!error && error.toString()) {
          lastRequests.errors.push(error.toString());
        } else {
          lastRequests.errors.push(SERVER_TELEM_CONSTANTS.UNKNOWN_ERROR);
        }
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return;
      };
      ServerTelemetryManager2.prototype.incrementCacheHits = function() {
        var lastRequests = this.getLastRequests();
        lastRequests.cacheHits += 1;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return lastRequests.cacheHits;
      };
      ServerTelemetryManager2.prototype.getLastRequests = function() {
        var initialValue = new ServerTelemetryEntity();
        var lastRequests = this.cacheManager.getServerTelemetry(this.telemetryCacheKey);
        return lastRequests || initialValue;
      };
      ServerTelemetryManager2.prototype.clearTelemetryCache = function() {
        var lastRequests = this.getLastRequests();
        var numErrorsFlushed = ServerTelemetryManager2.maxErrorsToSend(lastRequests);
        var errorCount = lastRequests.errors.length;
        if (numErrorsFlushed === errorCount) {
          this.cacheManager.removeItem(this.telemetryCacheKey);
        } else {
          var serverTelemEntity = new ServerTelemetryEntity();
          serverTelemEntity.failedRequests = lastRequests.failedRequests.slice(numErrorsFlushed * 2);
          serverTelemEntity.errors = lastRequests.errors.slice(numErrorsFlushed);
          this.cacheManager.setServerTelemetry(this.telemetryCacheKey, serverTelemEntity);
        }
      };
      ServerTelemetryManager2.maxErrorsToSend = function(serverTelemetryEntity) {
        var i;
        var maxErrors = 0;
        var dataSize = 0;
        var errorCount = serverTelemetryEntity.errors.length;
        for (i = 0; i < errorCount; i++) {
          var apiId = serverTelemetryEntity.failedRequests[2 * i] || Constants.EMPTY_STRING;
          var correlationId = serverTelemetryEntity.failedRequests[2 * i + 1] || Constants.EMPTY_STRING;
          var errorCode = serverTelemetryEntity.errors[i] || Constants.EMPTY_STRING;
          dataSize += apiId.toString().length + correlationId.toString().length + errorCode.length + 3;
          if (dataSize < SERVER_TELEM_CONSTANTS.MAX_LAST_HEADER_BYTES) {
            maxErrors += 1;
          } else {
            break;
          }
        }
        return maxErrors;
      };
      ServerTelemetryManager2.prototype.getRegionDiscoveryFields = function() {
        var regionDiscoveryFields = [];
        regionDiscoveryFields.push(this.regionUsed || "");
        regionDiscoveryFields.push(this.regionSource || "");
        regionDiscoveryFields.push(this.regionOutcome || "");
        return regionDiscoveryFields.join(",");
      };
      ServerTelemetryManager2.prototype.updateRegionDiscoveryMetadata = function(regionDiscoveryMetadata) {
        this.regionUsed = regionDiscoveryMetadata.region_used;
        this.regionSource = regionDiscoveryMetadata.region_source;
        this.regionOutcome = regionDiscoveryMetadata.region_outcome;
      };
      ServerTelemetryManager2.prototype.setCacheOutcome = function(cacheOutcome) {
        this.cacheOutcome = cacheOutcome;
      };
      return ServerTelemetryManager2;
    }();
    exports.AccessTokenEntity = AccessTokenEntity;
    exports.AccountEntity = AccountEntity;
    exports.AppMetadataEntity = AppMetadataEntity;
    exports.AuthError = AuthError;
    exports.AuthErrorMessage = AuthErrorMessage;
    exports.AuthToken = AuthToken;
    exports.Authority = Authority;
    exports.AuthorityFactory = AuthorityFactory;
    exports.AuthorityMetadataEntity = AuthorityMetadataEntity;
    exports.AuthorizationCodeClient = AuthorizationCodeClient;
    exports.CacheManager = CacheManager;
    exports.ClientAuthError = ClientAuthError;
    exports.ClientAuthErrorMessage = ClientAuthErrorMessage;
    exports.ClientConfigurationError = ClientConfigurationError;
    exports.ClientConfigurationErrorMessage = ClientConfigurationErrorMessage;
    exports.ClientCredentialClient = ClientCredentialClient;
    exports.Constants = Constants;
    exports.CredentialEntity = CredentialEntity;
    exports.DEFAULT_CRYPTO_IMPLEMENTATION = DEFAULT_CRYPTO_IMPLEMENTATION;
    exports.DEFAULT_SYSTEM_OPTIONS = DEFAULT_SYSTEM_OPTIONS;
    exports.DefaultStorageClass = DefaultStorageClass;
    exports.DeviceCodeClient = DeviceCodeClient;
    exports.IdToken = AuthToken;
    exports.IdTokenEntity = IdTokenEntity;
    exports.InteractionRequiredAuthError = InteractionRequiredAuthError;
    exports.Logger = Logger;
    exports.NetworkManager = NetworkManager;
    exports.OIDC_DEFAULT_SCOPES = OIDC_DEFAULT_SCOPES;
    exports.OnBehalfOfClient = OnBehalfOfClient;
    exports.PromptValue = PromptValue;
    exports.ProtocolUtils = ProtocolUtils;
    exports.RefreshTokenClient = RefreshTokenClient;
    exports.RefreshTokenEntity = RefreshTokenEntity;
    exports.ServerError = ServerError;
    exports.ServerTelemetryEntity = ServerTelemetryEntity;
    exports.ServerTelemetryManager = ServerTelemetryManager;
    exports.SilentFlowClient = SilentFlowClient;
    exports.StringUtils = StringUtils;
    exports.StubbedNetworkModule = StubbedNetworkModule;
    exports.ThrottlingEntity = ThrottlingEntity;
    exports.ThrottlingUtils = ThrottlingUtils;
    exports.TimeUtils = TimeUtils;
    exports.TokenCacheContext = TokenCacheContext;
    exports.UrlString = UrlString;
    exports.UsernamePasswordClient = UsernamePasswordClient;
  }
});

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module2) {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module2) {
    "use strict";
    var bind = require_bind();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function transformData(data, headers, fns) {
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module2) {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/enhanceError.js
var require_enhanceError = __commonJS({
  "node_modules/axios/lib/core/enhanceError.js"(exports, module2) {
    "use strict";
    module2.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  }
});

// node_modules/axios/lib/core/createError.js
var require_createError = __commonJS({
  "node_modules/axios/lib/core/createError.js"(exports, module2) {
    "use strict";
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module2) {
    "use strict";
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module2) {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module2) {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module2) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        };
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            if (config.responseType !== "json") {
              throw e;
            }
          }
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/ms/index.js"(exports, module2) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module2.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/debug/src/common.js"(exports, module2) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module2.exports = setup;
  }
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/debug/src/browser.js"(exports, module2) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv) => {
      argv = argv || process.argv;
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const pos = argv.indexOf(prefix + flag);
      const terminatorPos = argv.indexOf("--");
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      const min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/debug/src/node.js"(exports, module2) {
    var tty = require("tty");
    var util = require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} [0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module2.exports.humanize(this.diff) + "[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug) {
      debug.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module2.exports = require_common()(exports);
    var { formatters } = module2.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/debug/src/index.js"(exports, module2) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module2.exports = require_browser();
    } else {
      module2.exports = require_node();
    }
  }
});

// node_modules/follow-redirects/debug.js
var require_debug = __commonJS({
  "node_modules/follow-redirects/debug.js"(exports, module2) {
    var debug;
    module2.exports = function() {
      if (!debug) {
        try {
          debug = require_src()("follow-redirects");
        } catch (error) {
          debug = function() {
          };
        }
      }
      debug.apply(null, arguments);
    };
  }
});

// node_modules/follow-redirects/index.js
var require_follow_redirects = __commonJS({
  "node_modules/follow-redirects/index.js"(exports, module2) {
    var url = require("url");
    var URL = url.URL;
    var http = require("http");
    var https = require("https");
    var Writable = require("stream").Writable;
    var assert = require("assert");
    var debug = require_debug();
    var eventHandlers = Object.create(null);
    ["abort", "aborted", "connect", "error", "socket", "timeout"].forEach(function(event) {
      eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
      };
    });
    var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "");
    var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
    var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
    var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
    function RedirectableRequest(options, responseCallback) {
      Writable.call(this);
      this._sanitizeOptions(options);
      this._options = options;
      this._ended = false;
      this._ending = false;
      this._redirectCount = 0;
      this._redirects = [];
      this._requestBodyLength = 0;
      this._requestBodyBuffers = [];
      if (responseCallback) {
        this.on("response", responseCallback);
      }
      var self = this;
      this._onNativeResponse = function(response) {
        self._processResponse(response);
      };
      this._performRequest();
    }
    RedirectableRequest.prototype = Object.create(Writable.prototype);
    RedirectableRequest.prototype.write = function(data, encoding, callback) {
      if (this._ending) {
        throw new WriteAfterEndError();
      }
      if (!(typeof data === "string" || typeof data === "object" && "length" in data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
      }
      if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (data.length === 0) {
        if (callback) {
          callback();
        }
        return;
      }
      if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({ data, encoding });
        this._currentRequest.write(data, encoding, callback);
      } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
      }
    };
    RedirectableRequest.prototype.end = function(data, encoding, callback) {
      if (typeof data === "function") {
        callback = data;
        data = encoding = null;
      } else if (typeof encoding === "function") {
        callback = encoding;
        encoding = null;
      }
      if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
      } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
          self._ended = true;
          currentRequest.end(null, null, callback);
        });
        this._ending = true;
      }
    };
    RedirectableRequest.prototype.setHeader = function(name, value) {
      this._options.headers[name] = value;
      this._currentRequest.setHeader(name, value);
    };
    RedirectableRequest.prototype.removeHeader = function(name) {
      delete this._options.headers[name];
      this._currentRequest.removeHeader(name);
    };
    RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
      if (callback) {
        this.once("timeout", callback);
      }
      if (this.socket) {
        startTimer(this, msecs);
      } else {
        var self = this;
        this._currentRequest.once("socket", function() {
          startTimer(self, msecs);
        });
      }
      this.once("response", clearTimer);
      this.once("error", clearTimer);
      return this;
    };
    function startTimer(request, msecs) {
      clearTimeout(request._timeout);
      request._timeout = setTimeout(function() {
        request.emit("timeout");
      }, msecs);
    }
    function clearTimer() {
      clearTimeout(this._timeout);
    }
    [
      "abort",
      "flushHeaders",
      "getHeader",
      "setNoDelay",
      "setSocketKeepAlive"
    ].forEach(function(method) {
      RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
      };
    });
    ["aborted", "connection", "socket"].forEach(function(property) {
      Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
          return this._currentRequest[property];
        }
      });
    });
    RedirectableRequest.prototype._sanitizeOptions = function(options) {
      if (!options.headers) {
        options.headers = {};
      }
      if (options.host) {
        if (!options.hostname) {
          options.hostname = options.host;
        }
        delete options.host;
      }
      if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
          options.pathname = options.path;
        } else {
          options.pathname = options.path.substring(0, searchPos);
          options.search = options.path.substring(searchPos);
        }
      }
    };
    RedirectableRequest.prototype._performRequest = function() {
      var protocol = this._options.protocol;
      var nativeProtocol = this._options.nativeProtocols[protocol];
      if (!nativeProtocol) {
        this.emit("error", new TypeError("Unsupported protocol " + protocol));
        return;
      }
      if (this._options.agents) {
        var scheme = protocol.substr(0, protocol.length - 1);
        this._options.agent = this._options.agents[scheme];
      }
      var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
      this._currentUrl = url.format(this._options);
      request._redirectable = this;
      for (var event in eventHandlers) {
        if (event) {
          request.on(event, eventHandlers[event]);
        }
      }
      if (this._isRedirect) {
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
          if (request === self._currentRequest) {
            if (error) {
              self.emit("error", error);
            } else if (i < buffers.length) {
              var buffer = buffers[i++];
              if (!request.finished) {
                request.write(buffer.data, buffer.encoding, writeNext);
              }
            } else if (self._ended) {
              request.end();
            }
          }
        })();
      }
    };
    RedirectableRequest.prototype._processResponse = function(response) {
      var statusCode = response.statusCode;
      if (this._options.trackRedirects) {
        this._redirects.push({
          url: this._currentUrl,
          headers: response.headers,
          statusCode
        });
      }
      var location = response.headers.location;
      if (location && this._options.followRedirects !== false && statusCode >= 300 && statusCode < 400) {
        this._currentRequest.removeAllListeners();
        this._currentRequest.on("error", noop);
        this._currentRequest.abort();
        response.destroy();
        if (++this._redirectCount > this._options.maxRedirects) {
          this.emit("error", new TooManyRedirectsError());
          return;
        }
        if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
          this._options.method = "GET";
          this._requestBodyBuffers = [];
          removeMatchingHeaders(/^content-/i, this._options.headers);
        }
        var previousHostName = removeMatchingHeaders(/^host$/i, this._options.headers) || url.parse(this._currentUrl).hostname;
        var redirectUrl = url.resolve(this._currentUrl, location);
        debug("redirecting to", redirectUrl);
        this._isRedirect = true;
        var redirectUrlParts = url.parse(redirectUrl);
        Object.assign(this._options, redirectUrlParts);
        if (redirectUrlParts.hostname !== previousHostName) {
          removeMatchingHeaders(/^authorization$/i, this._options.headers);
        }
        if (typeof this._options.beforeRedirect === "function") {
          var responseDetails = { headers: response.headers };
          try {
            this._options.beforeRedirect.call(null, this._options, responseDetails);
          } catch (err) {
            this.emit("error", err);
            return;
          }
          this._sanitizeOptions(this._options);
        }
        try {
          this._performRequest();
        } catch (cause) {
          var error = new RedirectionError("Redirected request failed: " + cause.message);
          error.cause = cause;
          this.emit("error", error);
        }
      } else {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        this._requestBodyBuffers = [];
      }
    };
    function wrap(protocols) {
      var exports2 = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
      };
      var nativeProtocols = {};
      Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports2[scheme] = Object.create(nativeProtocol);
        function request(input, options, callback) {
          if (typeof input === "string") {
            var urlStr = input;
            try {
              input = urlToOptions(new URL(urlStr));
            } catch (err) {
              input = url.parse(urlStr);
            }
          } else if (URL && input instanceof URL) {
            input = urlToOptions(input);
          } else {
            callback = options;
            options = input;
            input = { protocol };
          }
          if (typeof options === "function") {
            callback = options;
            options = null;
          }
          options = Object.assign({
            maxRedirects: exports2.maxRedirects,
            maxBodyLength: exports2.maxBodyLength
          }, input, options);
          options.nativeProtocols = nativeProtocols;
          assert.equal(options.protocol, protocol, "protocol mismatch");
          debug("options", options);
          return new RedirectableRequest(options, callback);
        }
        function get(input, options, callback) {
          var wrappedRequest = wrappedProtocol.request(input, options, callback);
          wrappedRequest.end();
          return wrappedRequest;
        }
        Object.defineProperties(wrappedProtocol, {
          request: { value: request, configurable: true, enumerable: true, writable: true },
          get: { value: get, configurable: true, enumerable: true, writable: true }
        });
      });
      return exports2;
    }
    function noop() {
    }
    function urlToOptions(urlObject) {
      var options = {
        protocol: urlObject.protocol,
        hostname: urlObject.hostname.startsWith("[") ? urlObject.hostname.slice(1, -1) : urlObject.hostname,
        hash: urlObject.hash,
        search: urlObject.search,
        pathname: urlObject.pathname,
        path: urlObject.pathname + urlObject.search,
        href: urlObject.href
      };
      if (urlObject.port !== "") {
        options.port = Number(urlObject.port);
      }
      return options;
    }
    function removeMatchingHeaders(regex, headers) {
      var lastValue;
      for (var header in headers) {
        if (regex.test(header)) {
          lastValue = headers[header];
          delete headers[header];
        }
      }
      return lastValue;
    }
    function createErrorType(code, defaultMessage) {
      function CustomError(message) {
        Error.captureStackTrace(this, this.constructor);
        this.message = message || defaultMessage;
      }
      CustomError.prototype = new Error();
      CustomError.prototype.constructor = CustomError;
      CustomError.prototype.name = "Error [" + code + "]";
      CustomError.prototype.code = code;
      return CustomError;
    }
    module2.exports = wrap({ http, https });
    module2.exports.wrap = wrap;
  }
});

// node_modules/axios/package.json
var require_package = __commonJS({
  "node_modules/axios/package.json"(exports, module2) {
    module2.exports = {
      name: "axios",
      version: "0.21.1",
      description: "Promise based HTTP client for the browser and node.js",
      main: "index.js",
      scripts: {
        test: "grunt test && bundlesize",
        start: "node ./sandbox/server.js",
        build: "NODE_ENV=production grunt build",
        preversion: "npm test",
        version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
        postversion: "git push && git push --tags",
        examples: "node ./examples/server.js",
        coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        fix: "eslint --fix lib/**/*.js"
      },
      repository: {
        type: "git",
        url: "https://github.com/axios/axios.git"
      },
      keywords: [
        "xhr",
        "http",
        "ajax",
        "promise",
        "node"
      ],
      author: "Matt Zabriskie",
      license: "MIT",
      bugs: {
        url: "https://github.com/axios/axios/issues"
      },
      homepage: "https://github.com/axios/axios",
      devDependencies: {
        bundlesize: "^0.17.0",
        coveralls: "^3.0.0",
        "es6-promise": "^4.2.4",
        grunt: "^1.0.2",
        "grunt-banner": "^0.6.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-clean": "^1.1.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-eslint": "^20.1.0",
        "grunt-karma": "^2.0.0",
        "grunt-mocha-test": "^0.13.3",
        "grunt-ts": "^6.0.0-beta.19",
        "grunt-webpack": "^1.0.18",
        "istanbul-instrumenter-loader": "^1.0.0",
        "jasmine-core": "^2.4.1",
        karma: "^1.3.0",
        "karma-chrome-launcher": "^2.2.0",
        "karma-coverage": "^1.1.1",
        "karma-firefox-launcher": "^1.1.0",
        "karma-jasmine": "^1.1.1",
        "karma-jasmine-ajax": "^0.1.13",
        "karma-opera-launcher": "^1.0.0",
        "karma-safari-launcher": "^1.0.0",
        "karma-sauce-launcher": "^1.2.0",
        "karma-sinon": "^1.0.5",
        "karma-sourcemap-loader": "^0.3.7",
        "karma-webpack": "^1.7.0",
        "load-grunt-tasks": "^3.5.2",
        minimist: "^1.2.0",
        mocha: "^5.2.0",
        sinon: "^4.5.0",
        typescript: "^2.8.1",
        "url-search-params": "^0.10.0",
        webpack: "^1.13.1",
        "webpack-dev-server": "^1.14.1"
      },
      browser: {
        "./lib/adapters/http.js": "./lib/adapters/xhr.js"
      },
      jsdelivr: "dist/axios.min.js",
      unpkg: "dist/axios.min.js",
      typings: "./index.d.ts",
      dependencies: {
        "follow-redirects": "^1.10.0"
      },
      bundlesize: [
        {
          path: "./dist/axios.min.js",
          threshold: "5kB"
        }
      ]
    };
  }
});

// node_modules/axios/lib/adapters/http.js
var require_http = __commonJS({
  "node_modules/axios/lib/adapters/http.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildFullPath = require_buildFullPath();
    var buildURL = require_buildURL();
    var http = require("http");
    var https = require("https");
    var httpFollow = require_follow_redirects().http;
    var httpsFollow = require_follow_redirects().https;
    var url = require("url");
    var zlib = require("zlib");
    var pkg = require_package();
    var createError = require_createError();
    var enhanceError = require_enhanceError();
    var isHttps = /https:?/;
    function setProxy(options, proxy, location) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.port = proxy.port;
      options.path = location;
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ":" + proxy.auth.password, "utf8").toString("base64");
        options.headers["Proxy-Authorization"] = "Basic " + base64;
      }
      options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
      };
    }
    module2.exports = function httpAdapter(config) {
      return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var resolve = function resolve2(value) {
          resolvePromise(value);
        };
        var reject = function reject2(value) {
          rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        if (!headers["User-Agent"] && !headers["user-agent"]) {
          headers["User-Agent"] = "axios/" + pkg.version;
        }
        if (data && !utils.isStream(data)) {
          if (Buffer.isBuffer(data)) {
          } else if (utils.isArrayBuffer(data)) {
            data = Buffer.from(new Uint8Array(data));
          } else if (utils.isString(data)) {
            data = Buffer.from(data, "utf-8");
          } else {
            return reject(createError("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", config));
          }
          headers["Content-Length"] = data.length;
        }
        var auth = void 0;
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          auth = username + ":" + password;
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || "http:";
        if (!auth && parsed.auth) {
          var urlAuth = parsed.auth.split(":");
          var urlUsername = urlAuth[0] || "";
          var urlPassword = urlAuth[1] || "";
          auth = urlUsername + ":" + urlPassword;
        }
        if (auth) {
          delete headers.Authorization;
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        var options = {
          path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ""),
          method: config.method.toUpperCase(),
          headers,
          agent,
          agents: { http: config.httpAgent, https: config.httpsAgent },
          auth
        };
        if (config.socketPath) {
          options.socketPath = config.socketPath;
        } else {
          options.hostname = parsed.hostname;
          options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
          var proxyEnv = protocol.slice(0, -1) + "_proxy";
          var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
          if (proxyUrl) {
            var parsedProxyUrl = url.parse(proxyUrl);
            var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
            var shouldProxy = true;
            if (noProxyEnv) {
              var noProxy = noProxyEnv.split(",").map(function trim(s) {
                return s.trim();
              });
              shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                if (!proxyElement) {
                  return false;
                }
                if (proxyElement === "*") {
                  return true;
                }
                if (proxyElement[0] === "." && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                  return true;
                }
                return parsed.hostname === proxyElement;
              });
            }
            if (shouldProxy) {
              proxy = {
                host: parsedProxyUrl.hostname,
                port: parsedProxyUrl.port,
                protocol: parsedProxyUrl.protocol
              };
              if (parsedProxyUrl.auth) {
                var proxyUrlAuth = parsedProxyUrl.auth.split(":");
                proxy.auth = {
                  username: proxyUrlAuth[0],
                  password: proxyUrlAuth[1]
                };
              }
            }
          }
        }
        if (proxy) {
          options.headers.host = parsed.hostname + (parsed.port ? ":" + parsed.port : "");
          setProxy(options, proxy, protocol + "//" + parsed.hostname + (parsed.port ? ":" + parsed.port : "") + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
          transport = config.transport;
        } else if (config.maxRedirects === 0) {
          transport = isHttpsProxy ? https : http;
        } else {
          if (config.maxRedirects) {
            options.maxRedirects = config.maxRedirects;
          }
          transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
          options.maxBodyLength = config.maxBodyLength;
        }
        var req = transport.request(options, function handleResponse(res) {
          if (req.aborted)
            return;
          var stream = res;
          var lastRequest = res.req || req;
          if (res.statusCode !== 204 && lastRequest.method !== "HEAD" && config.decompress !== false) {
            switch (res.headers["content-encoding"]) {
              case "gzip":
              case "compress":
              case "deflate":
                stream = stream.pipe(zlib.createUnzip());
                delete res.headers["content-encoding"];
                break;
            }
          }
          var response = {
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            config,
            request: lastRequest
          };
          if (config.responseType === "stream") {
            response.data = stream;
            settle(resolve, reject, response);
          } else {
            var responseBuffer = [];
            stream.on("data", function handleStreamData(chunk) {
              responseBuffer.push(chunk);
              if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
                stream.destroy();
                reject(createError("maxContentLength size of " + config.maxContentLength + " exceeded", config, null, lastRequest));
              }
            });
            stream.on("error", function handleStreamError(err) {
              if (req.aborted)
                return;
              reject(enhanceError(err, config, null, lastRequest));
            });
            stream.on("end", function handleStreamEnd() {
              var responseData = Buffer.concat(responseBuffer);
              if (config.responseType !== "arraybuffer") {
                responseData = responseData.toString(config.responseEncoding);
                if (!config.responseEncoding || config.responseEncoding === "utf8") {
                  responseData = utils.stripBOM(responseData);
                }
              }
              response.data = responseData;
              settle(resolve, reject, response);
            });
          }
        });
        req.on("error", function handleRequestError(err) {
          if (req.aborted && err.code !== "ERR_FR_TOO_MANY_REDIRECTS")
            return;
          reject(enhanceError(err, config, null, req));
        });
        if (config.timeout) {
          req.setTimeout(config.timeout, function handleRequestTimeout() {
            req.abort();
            reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", req));
          });
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (req.aborted)
              return;
            req.abort();
            reject(cancel);
          });
        }
        if (utils.isStream(data)) {
          data.on("error", function handleStreamError(err) {
            reject(enhanceError(err, config, null, req));
          }).pipe(req);
        } else {
          req.end(data);
        }
      });
    };
  }
});

// node_modules/axios/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_http();
      }
      return adapter;
    }
    var defaults = {
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        "Accept": "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData(config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData(response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var chain = [dispatchRequest, void 0];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/Cancel.js
var require_Cancel = __commonJS({
  "node_modules/axios/lib/cancel/Cancel.js"(exports, module2) {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module2) {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module2) {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module2) {
    "use strict";
    module2.exports = function isAxiosError(payload) {
      return typeof payload === "object" && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios = createInstance(defaults);
    axios.Axios = Axios;
    axios.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios.defaults, instanceConfig));
    };
    axios.Cancel = require_Cancel();
    axios.CancelToken = require_CancelToken();
    axios.isCancel = require_isCancel();
    axios.all = function all(promises) {
      return Promise.all(promises);
    };
    axios.spread = require_spread();
    axios.isAxiosError = require_isAxiosError();
    module2.exports = axios;
    module2.exports.default = axios;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module2) {
    module2.exports = require_axios();
  }
});

// node_modules/uuid/dist/rng.js
var require_rng = __commonJS({
  "node_modules/uuid/dist/rng.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rng;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var rnds8Pool = new Uint8Array(256);
    var poolPtr = rnds8Pool.length;
    function rng() {
      if (poolPtr > rnds8Pool.length - 16) {
        _crypto.default.randomFillSync(rnds8Pool);
        poolPtr = 0;
      }
      return rnds8Pool.slice(poolPtr, poolPtr += 16);
    }
  }
});

// node_modules/uuid/dist/regex.js
var require_regex = __commonJS({
  "node_modules/uuid/dist/regex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/validate.js
var require_validate = __commonJS({
  "node_modules/uuid/dist/validate.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _regex = _interopRequireDefault(require_regex());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function validate(uuid) {
      return typeof uuid === "string" && _regex.default.test(uuid);
    }
    var _default = validate;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/stringify.js
var require_stringify = __commonJS({
  "node_modules/uuid/dist/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var byteToHex = [];
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 256).toString(16).substr(1));
    }
    function stringify(arr, offset = 0) {
      const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Stringified UUID is invalid");
      }
      return uuid;
    }
    var _default = stringify;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v1.js
var require_v1 = __commonJS({
  "node_modules/uuid/dist/v1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var _nodeId;
    var _clockseq;
    var _lastMSecs = 0;
    var _lastNSecs = 0;
    function v1(options, buf, offset) {
      let i = buf && offset || 0;
      const b = buf || new Array(16);
      options = options || {};
      let node = options.node || _nodeId;
      let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
      if (node == null || clockseq == null) {
        const seedBytes = options.random || (options.rng || _rng.default)();
        if (node == null) {
          node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
        }
        if (clockseq == null) {
          clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
        }
      }
      let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
      let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
      const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
      if (dt < 0 && options.clockseq === void 0) {
        clockseq = clockseq + 1 & 16383;
      }
      if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
        nsecs = 0;
      }
      if (nsecs >= 1e4) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      }
      _lastMSecs = msecs;
      _lastNSecs = nsecs;
      _clockseq = clockseq;
      msecs += 122192928e5;
      const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
      b[i++] = tl >>> 24 & 255;
      b[i++] = tl >>> 16 & 255;
      b[i++] = tl >>> 8 & 255;
      b[i++] = tl & 255;
      const tmh = msecs / 4294967296 * 1e4 & 268435455;
      b[i++] = tmh >>> 8 & 255;
      b[i++] = tmh & 255;
      b[i++] = tmh >>> 24 & 15 | 16;
      b[i++] = tmh >>> 16 & 255;
      b[i++] = clockseq >>> 8 | 128;
      b[i++] = clockseq & 255;
      for (let n = 0; n < 6; ++n) {
        b[i + n] = node[n];
      }
      return buf || (0, _stringify.default)(b);
    }
    var _default = v1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/parse.js
var require_parse = __commonJS({
  "node_modules/uuid/dist/parse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function parse(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      let v;
      const arr = new Uint8Array(16);
      arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
      arr[1] = v >>> 16 & 255;
      arr[2] = v >>> 8 & 255;
      arr[3] = v & 255;
      arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
      arr[5] = v & 255;
      arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
      arr[7] = v & 255;
      arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
      arr[9] = v & 255;
      arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
      arr[11] = v / 4294967296 & 255;
      arr[12] = v >>> 24 & 255;
      arr[13] = v >>> 16 & 255;
      arr[14] = v >>> 8 & 255;
      arr[15] = v & 255;
      return arr;
    }
    var _default = parse;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v35.js
var require_v35 = __commonJS({
  "node_modules/uuid/dist/v35.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.URL = exports.DNS = void 0;
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function stringToBytes(str) {
      str = unescape(encodeURIComponent(str));
      const bytes = [];
      for (let i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
      }
      return bytes;
    }
    var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
    exports.DNS = DNS;
    var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
    exports.URL = URL;
    function _default(name, version, hashfunc) {
      function generateUUID(value, namespace, buf, offset) {
        if (typeof value === "string") {
          value = stringToBytes(value);
        }
        if (typeof namespace === "string") {
          namespace = (0, _parse.default)(namespace);
        }
        if (namespace.length !== 16) {
          throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
        }
        let bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 15 | version;
        bytes[8] = bytes[8] & 63 | 128;
        if (buf) {
          offset = offset || 0;
          for (let i = 0; i < 16; ++i) {
            buf[offset + i] = bytes[i];
          }
          return buf;
        }
        return (0, _stringify.default)(bytes);
      }
      try {
        generateUUID.name = name;
      } catch (err) {
      }
      generateUUID.DNS = DNS;
      generateUUID.URL = URL;
      return generateUUID;
    }
  }
});

// node_modules/uuid/dist/md5.js
var require_md5 = __commonJS({
  "node_modules/uuid/dist/md5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function md5(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("md5").update(bytes).digest();
    }
    var _default = md5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v3.js
var require_v3 = __commonJS({
  "node_modules/uuid/dist/v3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _md = _interopRequireDefault(require_md5());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v3 = (0, _v.default)("v3", 48, _md.default);
    var _default = v3;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v4.js
var require_v4 = __commonJS({
  "node_modules/uuid/dist/v4.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _rng = _interopRequireDefault(require_rng());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function v4(options, buf, offset) {
      options = options || {};
      const rnds = options.random || (options.rng || _rng.default)();
      rnds[6] = rnds[6] & 15 | 64;
      rnds[8] = rnds[8] & 63 | 128;
      if (buf) {
        offset = offset || 0;
        for (let i = 0; i < 16; ++i) {
          buf[offset + i] = rnds[i];
        }
        return buf;
      }
      return (0, _stringify.default)(rnds);
    }
    var _default = v4;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/sha1.js
var require_sha1 = __commonJS({
  "node_modules/uuid/dist/sha1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _crypto = _interopRequireDefault(require("crypto"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function sha1(bytes) {
      if (Array.isArray(bytes)) {
        bytes = Buffer.from(bytes);
      } else if (typeof bytes === "string") {
        bytes = Buffer.from(bytes, "utf8");
      }
      return _crypto.default.createHash("sha1").update(bytes).digest();
    }
    var _default = sha1;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/v5.js
var require_v5 = __commonJS({
  "node_modules/uuid/dist/v5.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _v = _interopRequireDefault(require_v35());
    var _sha = _interopRequireDefault(require_sha1());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var v5 = (0, _v.default)("v5", 80, _sha.default);
    var _default = v5;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/nil.js
var require_nil = __commonJS({
  "node_modules/uuid/dist/nil.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = "00000000-0000-0000-0000-000000000000";
    exports.default = _default;
  }
});

// node_modules/uuid/dist/version.js
var require_version = __commonJS({
  "node_modules/uuid/dist/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _validate = _interopRequireDefault(require_validate());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function version(uuid) {
      if (!(0, _validate.default)(uuid)) {
        throw TypeError("Invalid UUID");
      }
      return parseInt(uuid.substr(14, 1), 16);
    }
    var _default = version;
    exports.default = _default;
  }
});

// node_modules/uuid/dist/index.js
var require_dist = __commonJS({
  "node_modules/uuid/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "v1", {
      enumerable: true,
      get: function() {
        return _v.default;
      }
    });
    Object.defineProperty(exports, "v3", {
      enumerable: true,
      get: function() {
        return _v2.default;
      }
    });
    Object.defineProperty(exports, "v4", {
      enumerable: true,
      get: function() {
        return _v3.default;
      }
    });
    Object.defineProperty(exports, "v5", {
      enumerable: true,
      get: function() {
        return _v4.default;
      }
    });
    Object.defineProperty(exports, "NIL", {
      enumerable: true,
      get: function() {
        return _nil.default;
      }
    });
    Object.defineProperty(exports, "version", {
      enumerable: true,
      get: function() {
        return _version.default;
      }
    });
    Object.defineProperty(exports, "validate", {
      enumerable: true,
      get: function() {
        return _validate.default;
      }
    });
    Object.defineProperty(exports, "stringify", {
      enumerable: true,
      get: function() {
        return _stringify.default;
      }
    });
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return _parse.default;
      }
    });
    var _v = _interopRequireDefault(require_v1());
    var _v2 = _interopRequireDefault(require_v3());
    var _v3 = _interopRequireDefault(require_v4());
    var _v4 = _interopRequireDefault(require_v5());
    var _nil = _interopRequireDefault(require_nil());
    var _version = _interopRequireDefault(require_version());
    var _validate = _interopRequireDefault(require_validate());
    var _stringify = _interopRequireDefault(require_stringify());
    var _parse = _interopRequireDefault(require_parse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/jws/lib/data-stream.js"(exports, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var Stream = require("stream");
    var util = require("util");
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer2.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer2.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    util.inherits(DataStream, Stream);
    DataStream.prototype.write = function write(data) {
      this.buffer = Buffer2.concat([this.buffer, Buffer2.from(data)]);
      this.emit("data", data);
    };
    DataStream.prototype.end = function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    };
    module2.exports = DataStream;
  }
});

// node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "node_modules/buffer-equal-constant-time/index.js"(exports, module2) {
    "use strict";
    var Buffer2 = require("buffer").Buffer;
    var SlowBuffer = require("buffer").SlowBuffer;
    module2.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    bufferEq.install = function() {
      Buffer2.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
      };
    };
    var origBufEqual = Buffer2.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer2.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module2) {
    "use strict";
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    module2.exports = getParamBytesForAlg;
  }
});

// node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function signatureAsBuffer(signature) {
      if (Buffer2.isBuffer(signature)) {
        return signature;
      } else if (typeof signature === "string") {
        return Buffer2.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer2.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer2.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    module2.exports = {
      derToJose,
      joseToDer
    };
  }
});

// node_modules/jwa/index.js
var require_jwa = __commonJS({
  "node_modules/jwa/index.js"(exports, module2) {
    var bufferEqual = require_buffer_equal_constant_time();
    var Buffer2 = require_safe_buffer().Buffer;
    var crypto = require("crypto");
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util = require("util");
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    function checkIsPrivateKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    function checkIsSecretKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util.format.bind(util, template).apply(null, args);
      return new TypeError(errMsg);
    }
    function bufferOrString(obj) {
      return Buffer2.isBuffer(obj) || typeof obj === "string";
    }
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    function createHmacSigner(bits) {
      return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      };
    }
    function createHmacVerifier(bits) {
      return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return bufferEqual(Buffer2.from(signature), Buffer2.from(computedSig));
      };
    }
    function createKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      };
    }
    function createKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      };
    }
    function createPSSKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      };
    }
    function createPSSKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      };
    }
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      };
    }
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      };
    }
    function createNoneSigner() {
      return function sign() {
        return "";
      };
    }
    function createNoneVerifier() {
      return function verify(thing, signature) {
        return signature === "";
      };
    }
    module2.exports = function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/i);
      if (!match)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match[1] || match[3]).toLowerCase();
      var bits = match[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    };
  }
});

// node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "node_modules/jws/lib/tostring.js"(exports, module2) {
    var Buffer2 = require("buffer").Buffer;
    module2.exports = function toString(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer2.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    };
  }
});

// node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "node_modules/jws/lib/sign-stream.js"(exports, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require("stream");
    var toString = require_tostring();
    var util = require("util");
    function base64url(string, encoding) {
      return Buffer2.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString(header), "binary");
      var encodedPayload = base64url(toString(payload), encoding);
      return util.format("%s.%s", encodedHeader, encodedPayload);
    }
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util.format("%s.%s", securedInput, signature);
    }
    function SignStream(opts) {
      var secret = opts.secret || opts.privateKey || opts.key;
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    util.inherits(SignStream, Stream);
    SignStream.prototype.sign = function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    SignStream.sign = jwsSign;
    module2.exports = SignStream;
  }
});

// node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "node_modules/jws/lib/verify-stream.js"(exports, module2) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = require("stream");
    var toString = require_tostring();
    var util = require("util");
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    function safeJsonParse(thing) {
      if (isObject(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer2.from(encodedHeader, "base64").toString("binary"));
    }
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer2.from(payload, "base64").toString(encoding);
    }
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret || opts.publicKey || opts.key;
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    util.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module2.exports = VerifyStream;
  }
});

// node_modules/jws/index.js
var require_jws = __commonJS({
  "node_modules/jws/index.js"(exports) {
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports.ALGORITHMS = ALGORITHMS;
    exports.sign = SignStream.sign;
    exports.verify = VerifyStream.verify;
    exports.decode = VerifyStream.decode;
    exports.isValid = VerifyStream.isValid;
    exports.createSign = function createSign(opts) {
      return new SignStream(opts);
    };
    exports.createVerify = function createVerify(opts) {
      return new VerifyStream(opts);
    };
  }
});

// node_modules/jsonwebtoken/decode.js
var require_decode = __commonJS({
  "node_modules/jsonwebtoken/decode.js"(exports, module2) {
    var jws = require_jws();
    module2.exports = function(jwt, options) {
      options = options || {};
      var decoded = jws.decode(jwt, options);
      if (!decoded) {
        return null;
      }
      var payload = decoded.payload;
      if (typeof payload === "string") {
        try {
          var obj = JSON.parse(payload);
          if (obj !== null && typeof obj === "object") {
            payload = obj;
          }
        } catch (e) {
        }
      }
      if (options.complete === true) {
        return {
          header: decoded.header,
          payload,
          signature: decoded.signature
        };
      }
      return payload;
    };
  }
});

// node_modules/jsonwebtoken/lib/JsonWebTokenError.js
var require_JsonWebTokenError = __commonJS({
  "node_modules/jsonwebtoken/lib/JsonWebTokenError.js"(exports, module2) {
    var JsonWebTokenError = function(message, error) {
      Error.call(this, message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "JsonWebTokenError";
      this.message = message;
      if (error)
        this.inner = error;
    };
    JsonWebTokenError.prototype = Object.create(Error.prototype);
    JsonWebTokenError.prototype.constructor = JsonWebTokenError;
    module2.exports = JsonWebTokenError;
  }
});

// node_modules/jsonwebtoken/lib/NotBeforeError.js
var require_NotBeforeError = __commonJS({
  "node_modules/jsonwebtoken/lib/NotBeforeError.js"(exports, module2) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = function(message, date) {
      JsonWebTokenError.call(this, message);
      this.name = "NotBeforeError";
      this.date = date;
    };
    NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
    NotBeforeError.prototype.constructor = NotBeforeError;
    module2.exports = NotBeforeError;
  }
});

// node_modules/jsonwebtoken/lib/TokenExpiredError.js
var require_TokenExpiredError = __commonJS({
  "node_modules/jsonwebtoken/lib/TokenExpiredError.js"(exports, module2) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var TokenExpiredError = function(message, expiredAt) {
      JsonWebTokenError.call(this, message);
      this.name = "TokenExpiredError";
      this.expiredAt = expiredAt;
    };
    TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
    TokenExpiredError.prototype.constructor = TokenExpiredError;
    module2.exports = TokenExpiredError;
  }
});

// node_modules/jsonwebtoken/lib/timespan.js
var require_timespan = __commonJS({
  "node_modules/jsonwebtoken/lib/timespan.js"(exports, module2) {
    var ms = require_ms();
    module2.exports = function(time, iat) {
      var timestamp = iat || Math.floor(Date.now() / 1e3);
      if (typeof time === "string") {
        var milliseconds = ms(time);
        if (typeof milliseconds === "undefined") {
          return;
        }
        return Math.floor(timestamp + milliseconds / 1e3);
      } else if (typeof time === "number") {
        return timestamp + time;
      } else {
        return;
      }
    };
  }
});

// node_modules/semver/semver.js
var require_semver = __commonJS({
  "node_modules/semver/semver.js"(exports, module2) {
    exports = module2.exports = SemVer;
    var debug;
    if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
      debug = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        args.unshift("SEMVER");
        console.log.apply(console, args);
      };
    } else {
      debug = function() {
      };
    }
    exports.SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var re = exports.re = [];
    var src = exports.src = [];
    var R = 0;
    var NUMERICIDENTIFIER = R++;
    src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
    var NUMERICIDENTIFIERLOOSE = R++;
    src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
    var NONNUMERICIDENTIFIER = R++;
    src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
    var MAINVERSION = R++;
    src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
    var MAINVERSIONLOOSE = R++;
    src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
    var PRERELEASEIDENTIFIER = R++;
    src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASEIDENTIFIERLOOSE = R++;
    src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
    var PRERELEASE = R++;
    src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
    var PRERELEASELOOSE = R++;
    src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
    var BUILDIDENTIFIER = R++;
    src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
    var BUILD = R++;
    src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
    var FULL = R++;
    var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
    src[FULL] = "^" + FULLPLAIN + "$";
    var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
    var LOOSE = R++;
    src[LOOSE] = "^" + LOOSEPLAIN + "$";
    var GTLT = R++;
    src[GTLT] = "((?:<|>)?=?)";
    var XRANGEIDENTIFIERLOOSE = R++;
    src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
    var XRANGEIDENTIFIER = R++;
    src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
    var XRANGEPLAIN = R++;
    src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGEPLAINLOOSE = R++;
    src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
    var XRANGE = R++;
    src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
    var XRANGELOOSE = R++;
    src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
    var COERCE = R++;
    src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
    var LONETILDE = R++;
    src[LONETILDE] = "(?:~>?)";
    var TILDETRIM = R++;
    src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
    re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
    var tildeTrimReplace = "$1~";
    var TILDE = R++;
    src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
    var TILDELOOSE = R++;
    src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
    var LONECARET = R++;
    src[LONECARET] = "(?:\\^)";
    var CARETTRIM = R++;
    src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
    re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
    var caretTrimReplace = "$1^";
    var CARET = R++;
    src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
    var CARETLOOSE = R++;
    src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
    var COMPARATORLOOSE = R++;
    src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
    var COMPARATOR = R++;
    src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
    var COMPARATORTRIM = R++;
    src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
    re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
    var comparatorTrimReplace = "$1$2$3";
    var HYPHENRANGE = R++;
    src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
    var HYPHENRANGELOOSE = R++;
    src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
    var STAR = R++;
    src[STAR] = "(<|>)?=?\\s*\\*";
    for (var i = 0; i < R; i++) {
      debug(i, src[i]);
      if (!re[i]) {
        re[i] = new RegExp(src[i]);
      }
    }
    exports.parse = parse;
    function parse(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      if (version.length > MAX_LENGTH) {
        return null;
      }
      var r = options.loose ? re[LOOSE] : re[FULL];
      if (!r.test(version)) {
        return null;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        return null;
      }
    }
    exports.valid = valid;
    function valid(version, options) {
      var v = parse(version, options);
      return v ? v.version : null;
    }
    exports.clean = clean;
    function clean(version, options) {
      var s = parse(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    }
    exports.SemVer = SemVer;
    function SemVer(version, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (version instanceof SemVer) {
        if (version.loose === options.loose) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError("Invalid Version: " + version);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
      }
      if (!(this instanceof SemVer)) {
        return new SemVer(version, options);
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL]);
      if (!m) {
        throw new TypeError("Invalid Version: " + version);
      }
      this.raw = version;
      this.major = +m[1];
      this.minor = +m[2];
      this.patch = +m[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m[4].split(".").map(function(id) {
          if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m[5] ? m[5].split(".") : [];
      this.format();
    }
    SemVer.prototype.format = function() {
      this.version = this.major + "." + this.minor + "." + this.patch;
      if (this.prerelease.length) {
        this.version += "-" + this.prerelease.join(".");
      }
      return this.version;
    };
    SemVer.prototype.toString = function() {
      return this.version;
    };
    SemVer.prototype.compare = function(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return this.compareMain(other) || this.comparePre(other);
    };
    SemVer.prototype.compareMain = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
    };
    SemVer.prototype.comparePre = function(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      var i2 = 0;
      do {
        var a = this.prerelease[i2];
        var b = other.prerelease[i2];
        debug("prerelease compare", i2, a, b);
        if (a === void 0 && b === void 0) {
          return 0;
        } else if (b === void 0) {
          return 1;
        } else if (a === void 0) {
          return -1;
        } else if (a === b) {
          continue;
        } else {
          return compareIdentifiers(a, b);
        }
      } while (++i2);
    };
    SemVer.prototype.inc = function(release, identifier) {
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier);
          this.inc("pre", identifier);
          break;
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier);
          }
          this.inc("pre", identifier);
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        case "pre":
          if (this.prerelease.length === 0) {
            this.prerelease = [0];
          } else {
            var i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              this.prerelease.push(0);
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0];
              }
            } else {
              this.prerelease = [identifier, 0];
            }
          }
          break;
        default:
          throw new Error("invalid increment argument: " + release);
      }
      this.format();
      this.raw = this.version;
      return this;
    };
    exports.inc = inc;
    function inc(version, release, loose, identifier) {
      if (typeof loose === "string") {
        identifier = loose;
        loose = void 0;
      }
      try {
        return new SemVer(version, loose).inc(release, identifier).version;
      } catch (er) {
        return null;
      }
    }
    exports.diff = diff;
    function diff(version1, version2) {
      if (eq(version1, version2)) {
        return null;
      } else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
          prefix = "pre";
          var defaultResult = "prerelease";
        }
        for (var key in v1) {
          if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) {
              return prefix + key;
            }
          }
        }
        return defaultResult;
      }
    }
    exports.compareIdentifiers = compareIdentifiers;
    var numeric = /^[0-9]+$/;
    function compareIdentifiers(a, b) {
      var anum = numeric.test(a);
      var bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    }
    exports.rcompareIdentifiers = rcompareIdentifiers;
    function rcompareIdentifiers(a, b) {
      return compareIdentifiers(b, a);
    }
    exports.major = major;
    function major(a, loose) {
      return new SemVer(a, loose).major;
    }
    exports.minor = minor;
    function minor(a, loose) {
      return new SemVer(a, loose).minor;
    }
    exports.patch = patch;
    function patch(a, loose) {
      return new SemVer(a, loose).patch;
    }
    exports.compare = compare;
    function compare(a, b, loose) {
      return new SemVer(a, loose).compare(new SemVer(b, loose));
    }
    exports.compareLoose = compareLoose;
    function compareLoose(a, b) {
      return compare(a, b, true);
    }
    exports.rcompare = rcompare;
    function rcompare(a, b, loose) {
      return compare(b, a, loose);
    }
    exports.sort = sort;
    function sort(list, loose) {
      return list.sort(function(a, b) {
        return exports.compare(a, b, loose);
      });
    }
    exports.rsort = rsort;
    function rsort(list, loose) {
      return list.sort(function(a, b) {
        return exports.rcompare(a, b, loose);
      });
    }
    exports.gt = gt;
    function gt(a, b, loose) {
      return compare(a, b, loose) > 0;
    }
    exports.lt = lt;
    function lt(a, b, loose) {
      return compare(a, b, loose) < 0;
    }
    exports.eq = eq;
    function eq(a, b, loose) {
      return compare(a, b, loose) === 0;
    }
    exports.neq = neq;
    function neq(a, b, loose) {
      return compare(a, b, loose) !== 0;
    }
    exports.gte = gte;
    function gte(a, b, loose) {
      return compare(a, b, loose) >= 0;
    }
    exports.lte = lte;
    function lte(a, b, loose) {
      return compare(a, b, loose) <= 0;
    }
    exports.cmp = cmp;
    function cmp(a, op, b, loose) {
      switch (op) {
        case "===":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a === b;
        case "!==":
          if (typeof a === "object")
            a = a.version;
          if (typeof b === "object")
            b = b.version;
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError("Invalid operator: " + op);
      }
    }
    exports.Comparator = Comparator;
    function Comparator(comp, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) {
          return comp;
        } else {
          comp = comp.value;
        }
      }
      if (!(this instanceof Comparator)) {
        return new Comparator(comp, options);
      }
      debug("comparator", comp, options);
      this.options = options;
      this.loose = !!options.loose;
      this.parse(comp);
      if (this.semver === ANY) {
        this.value = "";
      } else {
        this.value = this.operator + this.semver.version;
      }
      debug("comp", this);
    }
    var ANY = {};
    Comparator.prototype.parse = function(comp) {
      var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var m = comp.match(r);
      if (!m) {
        throw new TypeError("Invalid comparator: " + comp);
      }
      this.operator = m[1];
      if (this.operator === "=") {
        this.operator = "";
      }
      if (!m[2]) {
        this.semver = ANY;
      } else {
        this.semver = new SemVer(m[2], this.options.loose);
      }
    };
    Comparator.prototype.toString = function() {
      return this.value;
    };
    Comparator.prototype.test = function(version) {
      debug("Comparator.test", version, this.options.loose);
      if (this.semver === ANY) {
        return true;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      return cmp(version, this.operator, this.semver, this.options);
    };
    Comparator.prototype.intersects = function(comp, options) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError("a Comparator is required");
      }
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      var rangeTmp;
      if (this.operator === "") {
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
      } else if (comp.operator === "") {
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
      }
      var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
      var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
      var sameSemVer = this.semver.version === comp.semver.version;
      var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
      var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
      var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
      return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
    };
    exports.Range = Range;
    function Range(range, options) {
      if (!options || typeof options !== "object") {
        options = {
          loose: !!options,
          includePrerelease: false
        };
      }
      if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
          return range;
        } else {
          return new Range(range.raw, options);
        }
      }
      if (range instanceof Comparator) {
        return new Range(range.value, options);
      }
      if (!(this instanceof Range)) {
        return new Range(range, options);
      }
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      this.raw = range;
      this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
        return this.parseRange(range2.trim());
      }, this).filter(function(c) {
        return c.length;
      });
      if (!this.set.length) {
        throw new TypeError("Invalid SemVer Range: " + range);
      }
      this.format();
    }
    Range.prototype.format = function() {
      this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
      }).join("||").trim();
      return this.range;
    };
    Range.prototype.toString = function() {
      return this.range;
    };
    Range.prototype.parseRange = function(range) {
      var loose = this.options.loose;
      range = range.trim();
      var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
      range = range.replace(hr, hyphenReplace);
      debug("hyphen replace", range);
      range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
      debug("comparator trim", range, re[COMPARATORTRIM]);
      range = range.replace(re[TILDETRIM], tildeTrimReplace);
      range = range.replace(re[CARETTRIM], caretTrimReplace);
      range = range.split(/\s+/).join(" ");
      var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
      var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
      }, this).join(" ").split(/\s+/);
      if (this.options.loose) {
        set = set.filter(function(comp) {
          return !!comp.match(compRe);
        });
      }
      set = set.map(function(comp) {
        return new Comparator(comp, this.options);
      }, this);
      return set;
    };
    Range.prototype.intersects = function(range, options) {
      if (!(range instanceof Range)) {
        throw new TypeError("a Range is required");
      }
      return this.set.some(function(thisComparators) {
        return thisComparators.every(function(thisComparator) {
          return range.set.some(function(rangeComparators) {
            return rangeComparators.every(function(rangeComparator) {
              return thisComparator.intersects(rangeComparator, options);
            });
          });
        });
      });
    };
    exports.toComparators = toComparators;
    function toComparators(range, options) {
      return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
          return c.value;
        }).join(" ").trim().split(" ");
      });
    }
    function parseComparator(comp, options) {
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    }
    function isX(id) {
      return !id || id.toLowerCase() === "x" || id === "*";
    }
    function replaceTildes(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceTilde(comp2, options);
      }).join(" ");
    }
    function replaceTilde(comp, options) {
      var r = options.loose ? re[TILDELOOSE] : re[TILDE];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
        debug("tilde return", ret);
        return ret;
      });
    }
    function replaceCarets(comp, options) {
      return comp.trim().split(/\s+/).map(function(comp2) {
        return replaceCaret(comp2, options);
      }).join(" ");
    }
    function replaceCaret(comp, options) {
      debug("caret", comp, options);
      var r = options.loose ? re[CARETLOOSE] : re[CARET];
      return comp.replace(r, function(_, M, m, p, pr) {
        debug("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (isX(p)) {
          if (M === "0") {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            }
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
          }
        }
        debug("caret return", ret);
        return ret;
      });
    }
    function replaceXRanges(comp, options) {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map(function(comp2) {
        return replaceXRange(comp2, options);
      }).join(" ");
    }
    function replaceXRange(comp, options) {
      comp = comp.trim();
      var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
      return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          ret = gtlt + M + "." + m + "." + p;
        } else if (xm) {
          ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        } else if (xp) {
          ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        }
        debug("xRange return", ret);
        return ret;
      });
    }
    function replaceStars(comp, options) {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[STAR], "");
    }
    function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = ">=" + fM + ".0.0";
      } else if (isX(fp)) {
        from = ">=" + fM + "." + fm + ".0";
      } else {
        from = ">=" + from;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = "<" + (+tM + 1) + ".0.0";
      } else if (isX(tp)) {
        to = "<" + tM + "." + (+tm + 1) + ".0";
      } else if (tpr) {
        to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
      } else {
        to = "<=" + to;
      }
      return (from + " " + to).trim();
    }
    Range.prototype.test = function(version) {
      if (!version) {
        return false;
      }
      if (typeof version === "string") {
        version = new SemVer(version, this.options);
      }
      for (var i2 = 0; i2 < this.set.length; i2++) {
        if (testSet(this.set[i2], version, this.options)) {
          return true;
        }
      }
      return false;
    };
    function testSet(set, version, options) {
      for (var i2 = 0; i2 < set.length; i2++) {
        if (!set[i2].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (i2 = 0; i2 < set.length; i2++) {
          debug(set[i2].semver);
          if (set[i2].semver === ANY) {
            continue;
          }
          if (set[i2].semver.prerelease.length > 0) {
            var allowed = set[i2].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    }
    exports.satisfies = satisfies;
    function satisfies(version, range, options) {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    }
    exports.maxSatisfying = maxSatisfying;
    function maxSatisfying(versions, range, options) {
      var max = null;
      var maxSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    }
    exports.minSatisfying = minSatisfying;
    function minSatisfying(versions, range, options) {
      var min = null;
      var minSV = null;
      try {
        var rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach(function(v) {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    }
    exports.minVersion = minVersion;
    function minVersion(range, loose) {
      range = new Range(range, loose);
      var minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        comparators.forEach(function(comparator) {
          var compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            case "":
            case ">=":
              if (!minver || gt(minver, compver)) {
                minver = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error("Unexpected operation: " + comparator.operator);
          }
        });
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    }
    exports.validRange = validRange;
    function validRange(range, options) {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    }
    exports.ltr = ltr;
    function ltr(version, range, options) {
      return outside(version, range, "<", options);
    }
    exports.gtr = gtr;
    function gtr(version, range, options) {
      return outside(version, range, ">", options);
    }
    exports.outside = outside;
    function outside(version, range, hilo, options) {
      version = new SemVer(version, options);
      range = new Range(range, options);
      var gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (var i2 = 0; i2 < range.set.length; ++i2) {
        var comparators = range.set[i2];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    }
    exports.prerelease = prerelease;
    function prerelease(version, options) {
      var parsed = parse(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    }
    exports.intersects = intersects;
    function intersects(r1, r2, options) {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2);
    }
    exports.coerce = coerce;
    function coerce(version) {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version !== "string") {
        return null;
      }
      var match = version.match(re[COERCE]);
      if (match == null) {
        return null;
      }
      return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
    }
  }
});

// node_modules/jsonwebtoken/lib/psSupported.js
var require_psSupported = __commonJS({
  "node_modules/jsonwebtoken/lib/psSupported.js"(exports, module2) {
    var semver = require_semver();
    module2.exports = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
  }
});

// node_modules/jsonwebtoken/verify.js
var require_verify = __commonJS({
  "node_modules/jsonwebtoken/verify.js"(exports, module2) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = require_NotBeforeError();
    var TokenExpiredError = require_TokenExpiredError();
    var decode = require_decode();
    var timespan = require_timespan();
    var PS_SUPPORTED = require_psSupported();
    var jws = require_jws();
    var PUB_KEY_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512"];
    var RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var HS_ALGS = ["HS256", "HS384", "HS512"];
    if (PS_SUPPORTED) {
      PUB_KEY_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
      RSA_KEY_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
    }
    module2.exports = function(jwtString, secretOrPublicKey, options, callback) {
      if (typeof options === "function" && !callback) {
        callback = options;
        options = {};
      }
      if (!options) {
        options = {};
      }
      options = Object.assign({}, options);
      var done;
      if (callback) {
        done = callback;
      } else {
        done = function(err, data) {
          if (err)
            throw err;
          return data;
        };
      }
      if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
        return done(new JsonWebTokenError("clockTimestamp must be a number"));
      }
      if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
        return done(new JsonWebTokenError("nonce must be a non-empty string"));
      }
      var clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
      if (!jwtString) {
        return done(new JsonWebTokenError("jwt must be provided"));
      }
      if (typeof jwtString !== "string") {
        return done(new JsonWebTokenError("jwt must be a string"));
      }
      var parts = jwtString.split(".");
      if (parts.length !== 3) {
        return done(new JsonWebTokenError("jwt malformed"));
      }
      var decodedToken;
      try {
        decodedToken = decode(jwtString, { complete: true });
      } catch (err) {
        return done(err);
      }
      if (!decodedToken) {
        return done(new JsonWebTokenError("invalid token"));
      }
      var header = decodedToken.header;
      var getSecret;
      if (typeof secretOrPublicKey === "function") {
        if (!callback) {
          return done(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
        }
        getSecret = secretOrPublicKey;
      } else {
        getSecret = function(header2, secretCallback) {
          return secretCallback(null, secretOrPublicKey);
        };
      }
      return getSecret(header, function(err, secretOrPublicKey2) {
        if (err) {
          return done(new JsonWebTokenError("error in secret or public key callback: " + err.message));
        }
        var hasSignature = parts[2].trim() !== "";
        if (!hasSignature && secretOrPublicKey2) {
          return done(new JsonWebTokenError("jwt signature is required"));
        }
        if (hasSignature && !secretOrPublicKey2) {
          return done(new JsonWebTokenError("secret or public key must be provided"));
        }
        if (!hasSignature && !options.algorithms) {
          options.algorithms = ["none"];
        }
        if (!options.algorithms) {
          options.algorithms = ~secretOrPublicKey2.toString().indexOf("BEGIN CERTIFICATE") || ~secretOrPublicKey2.toString().indexOf("BEGIN PUBLIC KEY") ? PUB_KEY_ALGS : ~secretOrPublicKey2.toString().indexOf("BEGIN RSA PUBLIC KEY") ? RSA_KEY_ALGS : HS_ALGS;
        }
        if (!~options.algorithms.indexOf(decodedToken.header.alg)) {
          return done(new JsonWebTokenError("invalid algorithm"));
        }
        var valid;
        try {
          valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
        } catch (e) {
          return done(e);
        }
        if (!valid) {
          return done(new JsonWebTokenError("invalid signature"));
        }
        var payload = decodedToken.payload;
        if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
          if (typeof payload.nbf !== "number") {
            return done(new JsonWebTokenError("invalid nbf value"));
          }
          if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
            return done(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
          }
        }
        if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
          if (typeof payload.exp !== "number") {
            return done(new JsonWebTokenError("invalid exp value"));
          }
          if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
          }
        }
        if (options.audience) {
          var audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
          var target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
          var match = target.some(function(targetAudience) {
            return audiences.some(function(audience) {
              return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
            });
          });
          if (!match) {
            return done(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
          }
        }
        if (options.issuer) {
          var invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
          if (invalid_issuer) {
            return done(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
          }
        }
        if (options.subject) {
          if (payload.sub !== options.subject) {
            return done(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
          }
        }
        if (options.jwtid) {
          if (payload.jti !== options.jwtid) {
            return done(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
          }
        }
        if (options.nonce) {
          if (payload.nonce !== options.nonce) {
            return done(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
          }
        }
        if (options.maxAge) {
          if (typeof payload.iat !== "number") {
            return done(new JsonWebTokenError("iat required when maxAge is specified"));
          }
          var maxAgeTimestamp = timespan(options.maxAge, payload.iat);
          if (typeof maxAgeTimestamp === "undefined") {
            return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
          if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
          }
        }
        if (options.complete === true) {
          var signature = decodedToken.signature;
          return done(null, {
            header,
            payload,
            signature
          });
        }
        return done(null, payload);
      });
    };
  }
});

// node_modules/lodash.includes/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.includes/index.js"(exports, module2) {
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeParseInt = parseInt;
    function arrayMap(array, iteratee) {
      var index = -1, length = array ? array.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function values(object) {
      return object ? baseValues(object, keys(object)) : [];
    }
    module2.exports = includes;
  }
});

// node_modules/lodash.isboolean/index.js
var require_lodash2 = __commonJS({
  "node_modules/lodash.isboolean/index.js"(exports, module2) {
    var boolTag = "[object Boolean]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    module2.exports = isBoolean;
  }
});

// node_modules/lodash.isinteger/index.js
var require_lodash3 = __commonJS({
  "node_modules/lodash.isinteger/index.js"(exports, module2) {
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isInteger(value) {
      return typeof value == "number" && value == toInteger(value);
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module2.exports = isInteger;
  }
});

// node_modules/lodash.isnumber/index.js
var require_lodash4 = __commonJS({
  "node_modules/lodash.isnumber/index.js"(exports, module2) {
    var numberTag = "[object Number]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && objectToString.call(value) == numberTag;
    }
    module2.exports = isNumber;
  }
});

// node_modules/lodash.isplainobject/index.js
var require_lodash5 = __commonJS({
  "node_modules/lodash.isplainobject/index.js"(exports, module2) {
    var objectTag = "[object Object]";
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    var objectToString = objectProto.toString;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module2.exports = isPlainObject;
  }
});

// node_modules/lodash.isstring/index.js
var require_lodash6 = __commonJS({
  "node_modules/lodash.isstring/index.js"(exports, module2) {
    var stringTag = "[object String]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var isArray = Array.isArray;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    module2.exports = isString;
  }
});

// node_modules/lodash.once/index.js
var require_lodash7 = __commonJS({
  "node_modules/lodash.once/index.js"(exports, module2) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function before(n, func) {
      var result;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = void 0;
        }
        return result;
      };
    }
    function once(func) {
      return before(2, func);
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module2.exports = once;
  }
});

// node_modules/jsonwebtoken/sign.js
var require_sign = __commonJS({
  "node_modules/jsonwebtoken/sign.js"(exports, module2) {
    var timespan = require_timespan();
    var PS_SUPPORTED = require_psSupported();
    var jws = require_jws();
    var includes = require_lodash();
    var isBoolean = require_lodash2();
    var isInteger = require_lodash3();
    var isNumber = require_lodash4();
    var isPlainObject = require_lodash5();
    var isString = require_lodash6();
    var once = require_lodash7();
    var SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
    if (PS_SUPPORTED) {
      SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
    }
    var sign_options_schema = {
      expiresIn: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
      notBefore: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
      audience: { isValid: function(value) {
        return isString(value) || Array.isArray(value);
      }, message: '"audience" must be a string or array' },
      algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
      header: { isValid: isPlainObject, message: '"header" must be an object' },
      encoding: { isValid: isString, message: '"encoding" must be a string' },
      issuer: { isValid: isString, message: '"issuer" must be a string' },
      subject: { isValid: isString, message: '"subject" must be a string' },
      jwtid: { isValid: isString, message: '"jwtid" must be a string' },
      noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
      keyid: { isValid: isString, message: '"keyid" must be a string' },
      mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' }
    };
    var registered_claims_schema = {
      iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
      exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
      nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
    };
    function validate(schema, allowUnknown, object, parameterName) {
      if (!isPlainObject(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
      }
      Object.keys(object).forEach(function(key) {
        var validator = schema[key];
        if (!validator) {
          if (!allowUnknown) {
            throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
          }
          return;
        }
        if (!validator.isValid(object[key])) {
          throw new Error(validator.message);
        }
      });
    }
    function validateOptions(options) {
      return validate(sign_options_schema, false, options, "options");
    }
    function validatePayload(payload) {
      return validate(registered_claims_schema, true, payload, "payload");
    }
    var options_to_payload = {
      "audience": "aud",
      "issuer": "iss",
      "subject": "sub",
      "jwtid": "jti"
    };
    var options_for_objects = [
      "expiresIn",
      "notBefore",
      "noTimestamp",
      "audience",
      "issuer",
      "subject",
      "jwtid"
    ];
    module2.exports = function(payload, secretOrPrivateKey, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
      var isObjectPayload = typeof payload === "object" && !Buffer.isBuffer(payload);
      var header = Object.assign({
        alg: options.algorithm || "HS256",
        typ: isObjectPayload ? "JWT" : void 0,
        kid: options.keyid
      }, options.header);
      function failure(err) {
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      if (!secretOrPrivateKey && options.algorithm !== "none") {
        return failure(new Error("secretOrPrivateKey must have a value"));
      }
      if (typeof payload === "undefined") {
        return failure(new Error("payload is required"));
      } else if (isObjectPayload) {
        try {
          validatePayload(payload);
        } catch (error) {
          return failure(error);
        }
        if (!options.mutatePayload) {
          payload = Object.assign({}, payload);
        }
      } else {
        var invalid_options = options_for_objects.filter(function(opt) {
          return typeof options[opt] !== "undefined";
        });
        if (invalid_options.length > 0) {
          return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
        }
      }
      if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
      }
      if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
      }
      try {
        validateOptions(options);
      } catch (error) {
        return failure(error);
      }
      var timestamp = payload.iat || Math.floor(Date.now() / 1e3);
      if (options.noTimestamp) {
        delete payload.iat;
      } else if (isObjectPayload) {
        payload.iat = timestamp;
      }
      if (typeof options.notBefore !== "undefined") {
        try {
          payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.nbf === "undefined") {
          return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
        try {
          payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.exp === "undefined") {
          return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      Object.keys(options_to_payload).forEach(function(key) {
        var claim = options_to_payload[key];
        if (typeof options[key] !== "undefined") {
          if (typeof payload[claim] !== "undefined") {
            return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
          }
          payload[claim] = options[key];
        }
      });
      var encoding = options.encoding || "utf8";
      if (typeof callback === "function") {
        callback = callback && once(callback);
        jws.createSign({
          header,
          privateKey: secretOrPrivateKey,
          payload,
          encoding
        }).once("error", callback).once("done", function(signature) {
          callback(null, signature);
        });
      } else {
        return jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
      }
    };
  }
});

// node_modules/jsonwebtoken/index.js
var require_jsonwebtoken = __commonJS({
  "node_modules/jsonwebtoken/index.js"(exports, module2) {
    module2.exports = {
      decode: require_decode(),
      verify: require_verify(),
      sign: require_sign(),
      JsonWebTokenError: require_JsonWebTokenError(),
      NotBeforeError: require_NotBeforeError(),
      TokenExpiredError: require_TokenExpiredError()
    };
  }
});

// node_modules/@azure/msal-node/dist/msal-node.cjs.production.min.js
var require_msal_node_cjs_production_min = __commonJS({
  "node_modules/@azure/msal-node/dist/msal-node.cjs.production.min.js"(exports) {
    "use strict";
    function e(e2) {
      return e2 && typeof e2 == "object" && "default" in e2 ? e2.default : e2;
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    var t;
    var i = require_index_cjs();
    var r = e(require_axios2());
    var n = require_dist();
    var a = e(require("crypto"));
    var s = require_jsonwebtoken();
    !function(e2) {
      e2.GET = "get", e2.POST = "post";
    }(t || (t = {}));
    var o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    var c;
    !function(e2) {
      e2[e2.acquireTokenSilent = 62] = "acquireTokenSilent", e2[e2.acquireTokenByUsernamePassword = 371] = "acquireTokenByUsernamePassword", e2[e2.acquireTokenByDeviceCode = 671] = "acquireTokenByDeviceCode", e2[e2.acquireTokenByClientCredential = 771] = "acquireTokenByClientCredential", e2[e2.acquireTokenByCode = 871] = "acquireTokenByCode", e2[e2.acquireTokenByRefreshToken = 872] = "acquireTokenByRefreshToken";
    }(c || (c = {}));
    var l = class {
      async sendGetRequestAsync(e2, i2) {
        const n2 = { method: t.GET, url: e2, headers: i2 && i2.headers, validateStatus: () => true }, a2 = await r(n2);
        return { headers: a2.headers, body: a2.data, status: a2.status };
      }
      async sendPostRequestAsync(e2, i2, n2) {
        const a2 = { method: t.POST, url: e2, data: i2 && i2.body || "", timeout: n2, headers: i2 && i2.headers, validateStatus: () => true }, s2 = await r(a2);
        return { headers: s2.headers, body: s2.data, status: s2.status };
      }
    };
    var h = { clientId: "", authority: i.Constants.DEFAULT_AUTHORITY, clientSecret: "", clientAssertion: "", clientCertificate: { thumbprint: "", privateKey: "", x5c: "" }, knownAuthorities: [], cloudDiscoveryMetadata: "", authorityMetadata: "", clientCapabilities: [], protocolMode: i.ProtocolMode.AAD };
    var u = {};
    var d = { loggerOptions: { loggerCallback: () => {
    }, piiLoggingEnabled: false, logLevel: i.LogLevel.Info }, networkClient: class {
      static getNetworkClient() {
        return new l();
      }
    }.getNetworkClient() };
    function g({ auth: e2, cache: t2, system: i2 }) {
      return { auth: __spreadValues(__spreadValues({}, h), e2), cache: __spreadValues(__spreadValues({}, u), t2), system: __spreadValues(__spreadValues({}, d), i2) };
    }
    var p = class {
      static base64Encode(e2, t2) {
        return Buffer.from(e2, t2).toString("base64");
      }
      static base64EncodeUrl(e2, t2) {
        return p.base64Encode(e2, t2).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      static base64Decode(e2) {
        return Buffer.from(e2, "base64").toString("utf8");
      }
      static base64DecodeUrl(e2) {
        let t2 = e2.replace(/-/g, "+").replace(/_/g, "/");
        for (; t2.length % 4; )
          t2 += "=";
        return p.base64Decode(t2);
      }
    };
    var y = class {
      async generatePkceCodes() {
        const e2 = this.generateCodeVerifier();
        return { verifier: e2, challenge: this.generateCodeChallengeFromVerifier(e2) };
      }
      generateCodeVerifier() {
        const e2 = a.randomBytes(32), t2 = this.bufferToCVString(e2);
        return p.base64EncodeUrl(t2);
      }
      generateCodeChallengeFromVerifier(e2) {
        return p.base64EncodeUrl(this.sha256(e2).toString("base64"), "base64");
      }
      sha256(e2) {
        return a.createHash("sha256").update(e2).digest();
      }
      bufferToCVString(e2) {
        const t2 = [];
        for (let i2 = 0; i2 < e2.byteLength; i2 += 1)
          t2.push(o[e2[i2] % o.length]);
        return t2.join("");
      }
    };
    var m = class {
      constructor() {
        this.pkceGenerator = new y();
      }
      createNewGuid() {
        return class {
          static generateGuid() {
            return n.v4();
          }
          static isGuid(e2) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(e2);
          }
        }.generateGuid();
      }
      base64Encode(e2) {
        return p.base64Encode(e2);
      }
      base64Decode(e2) {
        return p.base64Decode(e2);
      }
      generatePkceCodes() {
        return this.pkceGenerator.generatePkceCodes();
      }
      getPublicKeyThumbprint() {
        throw new Error("Method not implemented.");
      }
      signJwt() {
        throw new Error("Method not implemented.");
      }
    };
    var f = class {
      static deserializeJSONBlob(e2) {
        return i.StringUtils.isEmpty(e2) ? {} : JSON.parse(e2);
      }
      static deserializeAccounts(e2) {
        const t2 = {};
        return e2 && Object.keys(e2).map(function(r2) {
          const n2 = e2[r2], a2 = { homeAccountId: n2.home_account_id, environment: n2.environment, realm: n2.realm, localAccountId: n2.local_account_id, username: n2.username, authorityType: n2.authority_type, name: n2.name, clientInfo: n2.client_info, lastModificationTime: n2.last_modification_time, lastModificationApp: n2.last_modification_app }, s2 = new i.AccountEntity();
          i.CacheManager.toObject(s2, a2), t2[r2] = s2;
        }), t2;
      }
      static deserializeIdTokens(e2) {
        const t2 = {};
        return e2 && Object.keys(e2).map(function(r2) {
          const n2 = e2[r2], a2 = { homeAccountId: n2.home_account_id, environment: n2.environment, credentialType: n2.credential_type, clientId: n2.client_id, secret: n2.secret, realm: n2.realm }, s2 = new i.IdTokenEntity();
          i.CacheManager.toObject(s2, a2), t2[r2] = s2;
        }), t2;
      }
      static deserializeAccessTokens(e2) {
        const t2 = {};
        return e2 && Object.keys(e2).map(function(r2) {
          const n2 = e2[r2], a2 = { homeAccountId: n2.home_account_id, environment: n2.environment, credentialType: n2.credential_type, clientId: n2.client_id, secret: n2.secret, realm: n2.realm, target: n2.target, cachedAt: n2.cached_at, expiresOn: n2.expires_on, extendedExpiresOn: n2.extended_expires_on, refreshOn: n2.refresh_on, keyId: n2.key_id, tokenType: n2.token_type }, s2 = new i.AccessTokenEntity();
          i.CacheManager.toObject(s2, a2), t2[r2] = s2;
        }), t2;
      }
      static deserializeRefreshTokens(e2) {
        const t2 = {};
        return e2 && Object.keys(e2).map(function(r2) {
          const n2 = e2[r2], a2 = { homeAccountId: n2.home_account_id, environment: n2.environment, credentialType: n2.credential_type, clientId: n2.client_id, secret: n2.secret, familyId: n2.family_id, target: n2.target, realm: n2.realm }, s2 = new i.RefreshTokenEntity();
          i.CacheManager.toObject(s2, a2), t2[r2] = s2;
        }), t2;
      }
      static deserializeAppMetadata(e2) {
        const t2 = {};
        return e2 && Object.keys(e2).map(function(r2) {
          const n2 = e2[r2], a2 = { clientId: n2.client_id, environment: n2.environment, familyId: n2.family_id }, s2 = new i.AppMetadataEntity();
          i.CacheManager.toObject(s2, a2), t2[r2] = s2;
        }), t2;
      }
      static deserializeAllCache(e2) {
        return { accounts: e2.Account ? this.deserializeAccounts(e2.Account) : {}, idTokens: e2.IdToken ? this.deserializeIdTokens(e2.IdToken) : {}, accessTokens: e2.AccessToken ? this.deserializeAccessTokens(e2.AccessToken) : {}, refreshTokens: e2.RefreshToken ? this.deserializeRefreshTokens(e2.RefreshToken) : {}, appMetadata: e2.AppMetadata ? this.deserializeAppMetadata(e2.AppMetadata) : {} };
      }
    };
    var C = class {
      static serializeJSONBlob(e2) {
        return JSON.stringify(e2);
      }
      static serializeAccounts(e2) {
        const t2 = {};
        return Object.keys(e2).map(function(i2) {
          const r2 = e2[i2];
          t2[i2] = { home_account_id: r2.homeAccountId, environment: r2.environment, realm: r2.realm, local_account_id: r2.localAccountId, username: r2.username, authority_type: r2.authorityType, name: r2.name, client_info: r2.clientInfo, last_modification_time: r2.lastModificationTime, last_modification_app: r2.lastModificationApp };
        }), t2;
      }
      static serializeIdTokens(e2) {
        const t2 = {};
        return Object.keys(e2).map(function(i2) {
          const r2 = e2[i2];
          t2[i2] = { home_account_id: r2.homeAccountId, environment: r2.environment, credential_type: r2.credentialType, client_id: r2.clientId, secret: r2.secret, realm: r2.realm };
        }), t2;
      }
      static serializeAccessTokens(e2) {
        const t2 = {};
        return Object.keys(e2).map(function(i2) {
          const r2 = e2[i2];
          t2[i2] = { home_account_id: r2.homeAccountId, environment: r2.environment, credential_type: r2.credentialType, client_id: r2.clientId, secret: r2.secret, realm: r2.realm, target: r2.target, cached_at: r2.cachedAt, expires_on: r2.expiresOn, extended_expires_on: r2.extendedExpiresOn, refresh_on: r2.refreshOn, key_id: r2.keyId, token_type: r2.tokenType };
        }), t2;
      }
      static serializeRefreshTokens(e2) {
        const t2 = {};
        return Object.keys(e2).map(function(i2) {
          const r2 = e2[i2];
          t2[i2] = { home_account_id: r2.homeAccountId, environment: r2.environment, credential_type: r2.credentialType, client_id: r2.clientId, secret: r2.secret, family_id: r2.familyId, target: r2.target, realm: r2.realm };
        }), t2;
      }
      static serializeAppMetadata(e2) {
        const t2 = {};
        return Object.keys(e2).map(function(i2) {
          const r2 = e2[i2];
          t2[i2] = { client_id: r2.clientId, environment: r2.environment, family_id: r2.familyId };
        }), t2;
      }
      static serializeAllCache(e2) {
        return { Account: this.serializeAccounts(e2.accounts), IdToken: this.serializeIdTokens(e2.idTokens), AccessToken: this.serializeAccessTokens(e2.accessTokens), RefreshToken: this.serializeRefreshTokens(e2.refreshTokens), AppMetadata: this.serializeAppMetadata(e2.appMetadata) };
      }
    };
    var A = class extends i.CacheManager {
      constructor(e2, t2, i2) {
        super(t2, i2), this.cache = {}, this.changeEmitters = [], this.logger = e2;
      }
      registerChangeEmitter(e2) {
        this.changeEmitters.push(e2);
      }
      emitChange() {
        this.changeEmitters.forEach((e2) => e2.call(null));
      }
      cacheToInMemoryCache(e2) {
        const t2 = { accounts: {}, idTokens: {}, accessTokens: {}, refreshTokens: {}, appMetadata: {} };
        for (const r2 in e2)
          if (e2[r2] instanceof i.AccountEntity)
            t2.accounts[r2] = e2[r2];
          else if (e2[r2] instanceof i.IdTokenEntity)
            t2.idTokens[r2] = e2[r2];
          else if (e2[r2] instanceof i.AccessTokenEntity)
            t2.accessTokens[r2] = e2[r2];
          else if (e2[r2] instanceof i.RefreshTokenEntity)
            t2.refreshTokens[r2] = e2[r2];
          else {
            if (!(e2[r2] instanceof i.AppMetadataEntity))
              continue;
            t2.appMetadata[r2] = e2[r2];
          }
        return t2;
      }
      inMemoryCacheToCache(e2) {
        let t2 = this.getCache();
        return t2 = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, e2.accounts), e2.idTokens), e2.accessTokens), e2.refreshTokens), e2.appMetadata), t2;
      }
      getInMemoryCache() {
        return this.logger.trace("Getting in-memory cache"), this.cacheToInMemoryCache(this.getCache());
      }
      setInMemoryCache(e2) {
        this.logger.trace("Setting in-memory cache");
        const t2 = this.inMemoryCacheToCache(e2);
        this.setCache(t2), this.emitChange();
      }
      getCache() {
        return this.logger.trace("Getting cache key-value store"), this.cache;
      }
      setCache(e2) {
        this.logger.trace("Setting cache key value store"), this.cache = e2, this.emitChange();
      }
      getItem(e2) {
        return this.logger.tracePii("Item key: " + e2), this.getCache()[e2];
      }
      setItem(e2, t2) {
        this.logger.tracePii("Item key: " + e2);
        const i2 = this.getCache();
        i2[e2] = t2, this.setCache(i2);
      }
      getAccount(e2) {
        const t2 = this.getItem(e2);
        return i.AccountEntity.isAccountEntity(t2) ? t2 : null;
      }
      setAccount(e2) {
        const t2 = e2.generateAccountKey();
        this.setItem(t2, e2);
      }
      getIdTokenCredential(e2) {
        const t2 = this.getItem(e2);
        return i.IdTokenEntity.isIdTokenEntity(t2) ? t2 : null;
      }
      setIdTokenCredential(e2) {
        const t2 = e2.generateCredentialKey();
        this.setItem(t2, e2);
      }
      getAccessTokenCredential(e2) {
        const t2 = this.getItem(e2);
        return i.AccessTokenEntity.isAccessTokenEntity(t2) ? t2 : null;
      }
      setAccessTokenCredential(e2) {
        const t2 = e2.generateCredentialKey();
        this.setItem(t2, e2);
      }
      getRefreshTokenCredential(e2) {
        const t2 = this.getItem(e2);
        return i.RefreshTokenEntity.isRefreshTokenEntity(t2) ? t2 : null;
      }
      setRefreshTokenCredential(e2) {
        const t2 = e2.generateCredentialKey();
        this.setItem(t2, e2);
      }
      getAppMetadata(e2) {
        const t2 = this.getItem(e2);
        return i.AppMetadataEntity.isAppMetadataEntity(e2, t2) ? t2 : null;
      }
      setAppMetadata(e2) {
        const t2 = e2.generateAppMetadataKey();
        this.setItem(t2, e2);
      }
      getServerTelemetry(e2) {
        const t2 = this.getItem(e2);
        return t2 && i.ServerTelemetryEntity.isServerTelemetryEntity(e2, t2) ? t2 : null;
      }
      setServerTelemetry(e2, t2) {
        this.setItem(e2, t2);
      }
      getAuthorityMetadata(e2) {
        const t2 = this.getItem(e2);
        return t2 && i.AuthorityMetadataEntity.isAuthorityMetadataEntity(e2, t2) ? t2 : null;
      }
      getAuthorityMetadataKeys() {
        return this.getKeys().filter((e2) => this.isAuthorityMetadata(e2));
      }
      setAuthorityMetadata(e2, t2) {
        this.setItem(e2, t2);
      }
      getThrottlingCache(e2) {
        const t2 = this.getItem(e2);
        return t2 && i.ThrottlingEntity.isThrottlingEntity(e2, t2) ? t2 : null;
      }
      setThrottlingCache(e2, t2) {
        this.setItem(e2, t2);
      }
      removeItem(e2) {
        this.logger.tracePii("Item key: " + e2);
        let t2 = false;
        const i2 = this.getCache();
        return i2[e2] && (delete i2[e2], t2 = true), t2 && (this.setCache(i2), this.emitChange()), t2;
      }
      containsKey(e2) {
        return this.getKeys().includes(e2);
      }
      getKeys() {
        this.logger.trace("Retrieving all cache keys");
        const e2 = this.getCache();
        return [...Object.keys(e2)];
      }
      clear() {
        this.logger.trace("Clearing cache entries created by MSAL"), this.getKeys().forEach((e2) => {
          this.removeItem(e2);
        }), this.emitChange();
      }
      static generateInMemoryCache(e2) {
        return f.deserializeAllCache(f.deserializeJSONBlob(e2));
      }
      static generateJsonCache(e2) {
        return C.serializeAllCache(e2);
      }
    };
    var k = {};
    var T = {};
    var I = {};
    var b = {};
    var v = {};
    var E = class {
      constructor(e2, t2, i2) {
        this.cacheHasChanged = false, this.storage = e2, this.storage.registerChangeEmitter(this.handleChangeEvent.bind(this)), i2 && (this.persistence = i2), this.logger = t2;
      }
      hasChanged() {
        return this.cacheHasChanged;
      }
      serialize() {
        this.logger.trace("Serializing in-memory cache");
        let e2 = C.serializeAllCache(this.storage.getInMemoryCache());
        return i.StringUtils.isEmpty(this.cacheSnapshot) ? this.logger.trace("No cache snapshot to merge") : (this.logger.trace("Reading cache snapshot from disk"), e2 = this.mergeState(JSON.parse(this.cacheSnapshot), e2)), this.cacheHasChanged = false, JSON.stringify(e2);
      }
      deserialize(e2) {
        if (this.logger.trace("Deserializing JSON to in-memory cache"), this.cacheSnapshot = e2, i.StringUtils.isEmpty(this.cacheSnapshot))
          this.logger.trace("No cache snapshot to deserialize");
        else {
          this.logger.trace("Reading cache snapshot from disk");
          const e3 = f.deserializeAllCache(this.overlayDefaults(JSON.parse(this.cacheSnapshot)));
          this.storage.setInMemoryCache(e3);
        }
      }
      getKVStore() {
        return this.storage.getCache();
      }
      async getAllAccounts() {
        let e2;
        this.logger.trace("getAllAccounts called");
        try {
          return this.persistence && (e2 = new i.TokenCacheContext(this, false), await this.persistence.beforeCacheAccess(e2)), this.storage.getAllAccounts();
        } finally {
          this.persistence && e2 && await this.persistence.afterCacheAccess(e2);
        }
      }
      async getAccountByHomeId(e2) {
        const t2 = await this.getAllAccounts();
        return !i.StringUtils.isEmpty(e2) && t2 && t2.length && t2.filter((t3) => t3.homeAccountId === e2)[0] || null;
      }
      async getAccountByLocalId(e2) {
        const t2 = await this.getAllAccounts();
        return !i.StringUtils.isEmpty(e2) && t2 && t2.length && t2.filter((t3) => t3.localAccountId === e2)[0] || null;
      }
      async removeAccount(e2) {
        let t2;
        this.logger.trace("removeAccount called");
        try {
          this.persistence && (t2 = new i.TokenCacheContext(this, true), await this.persistence.beforeCacheAccess(t2)), this.storage.removeAccount(i.AccountEntity.generateAccountCacheKey(e2));
        } finally {
          this.persistence && t2 && await this.persistence.afterCacheAccess(t2);
        }
      }
      handleChangeEvent() {
        this.cacheHasChanged = true;
      }
      mergeState(e2, t2) {
        this.logger.trace("Merging in-memory cache with cache snapshot");
        const i2 = this.mergeRemovals(e2, t2);
        return this.mergeUpdates(i2, t2);
      }
      mergeUpdates(e2, t2) {
        return Object.keys(t2).forEach((i2) => {
          const r2 = t2[i2];
          if (e2.hasOwnProperty(i2)) {
            const t3 = r2 !== null, n2 = typeof r2 == "object", a2 = !Array.isArray(r2), s2 = e2[i2] != null;
            t3 && n2 && a2 && s2 ? this.mergeUpdates(e2[i2], r2) : e2[i2] = r2;
          } else
            r2 !== null && (e2[i2] = r2);
        }), e2;
      }
      mergeRemovals(e2, t2) {
        this.logger.trace("Remove updated entries in cache");
        const i2 = e2.Account ? this.mergeRemovalsDict(e2.Account, t2.Account) : e2.Account, r2 = e2.AccessToken ? this.mergeRemovalsDict(e2.AccessToken, t2.AccessToken) : e2.AccessToken, n2 = e2.RefreshToken ? this.mergeRemovalsDict(e2.RefreshToken, t2.RefreshToken) : e2.RefreshToken, a2 = e2.IdToken ? this.mergeRemovalsDict(e2.IdToken, t2.IdToken) : e2.IdToken, s2 = e2.AppMetadata ? this.mergeRemovalsDict(e2.AppMetadata, t2.AppMetadata) : e2.AppMetadata;
        return __spreadProps(__spreadValues({}, e2), { Account: i2, AccessToken: r2, RefreshToken: n2, IdToken: a2, AppMetadata: s2 });
      }
      mergeRemovalsDict(e2, t2) {
        const i2 = __spreadValues({}, e2);
        return Object.keys(e2).forEach((e3) => {
          t2 && t2.hasOwnProperty(e3) || delete i2[e3];
        }), i2;
      }
      overlayDefaults(e2) {
        return this.logger.trace("Overlaying input cache with the default cache"), { Account: __spreadValues(__spreadValues({}, k), e2.Account), IdToken: __spreadValues(__spreadValues({}, T), e2.IdToken), AccessToken: __spreadValues(__spreadValues({}, I), e2.AccessToken), RefreshToken: __spreadValues(__spreadValues({}, b), e2.RefreshToken), AppMetadata: __spreadValues(__spreadValues({}, v), e2.AppMetadata) };
      }
    };
    var w = class {
      constructor(e2) {
        this.config = g(e2), this.cryptoProvider = new m(), this.logger = new i.Logger(this.config.system.loggerOptions, "@azure/msal-node", "1.3.0"), this.storage = new A(this.logger, this.config.auth.clientId, this.cryptoProvider), this.tokenCache = new E(this.storage, this.logger, this.config.cache.cachePlugin);
      }
      async getAuthCodeUrl(e2) {
        this.logger.info("getAuthCodeUrl called", e2.correlationId);
        const t2 = __spreadProps(__spreadValues(__spreadValues({}, e2), this.initializeBaseRequest(e2)), { responseMode: e2.responseMode || i.ResponseMode.QUERY, authenticationScheme: i.AuthenticationScheme.BEARER }), r2 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId), n2 = new i.AuthorizationCodeClient(r2);
        return this.logger.verbose("Auth code client created", t2.correlationId), n2.getAuthCodeUrl(t2);
      }
      async acquireTokenByCode(e2) {
        this.logger.info("acquireTokenByCode called", e2.correlationId);
        const t2 = __spreadProps(__spreadValues(__spreadValues({}, e2), this.initializeBaseRequest(e2)), { authenticationScheme: i.AuthenticationScheme.BEARER }), r2 = this.initializeServerTelemetryManager(c.acquireTokenByCode, t2.correlationId);
        try {
          const e3 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId, r2), n2 = new i.AuthorizationCodeClient(e3);
          return this.logger.verbose("Auth code client created", t2.correlationId), n2.acquireToken(t2);
        } catch (e3) {
          throw r2.cacheFailedRequest(e3), e3;
        }
      }
      async acquireTokenByRefreshToken(e2) {
        this.logger.info("acquireTokenByRefreshToken called", e2.correlationId);
        const t2 = __spreadProps(__spreadValues(__spreadValues({}, e2), this.initializeBaseRequest(e2)), { authenticationScheme: i.AuthenticationScheme.BEARER }), r2 = this.initializeServerTelemetryManager(c.acquireTokenByRefreshToken, t2.correlationId);
        try {
          const e3 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId, r2), n2 = new i.RefreshTokenClient(e3);
          return this.logger.verbose("Refresh token client created", t2.correlationId), n2.acquireToken(t2);
        } catch (e3) {
          throw r2.cacheFailedRequest(e3), e3;
        }
      }
      async acquireTokenSilent(e2) {
        const t2 = __spreadProps(__spreadValues(__spreadValues({}, e2), this.initializeBaseRequest(e2)), { forceRefresh: e2.forceRefresh || false }), r2 = this.initializeServerTelemetryManager(c.acquireTokenSilent, t2.correlationId, t2.forceRefresh);
        try {
          const e3 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId, r2), n2 = new i.SilentFlowClient(e3);
          return this.logger.verbose("Silent flow client created", t2.correlationId), n2.acquireToken(t2);
        } catch (e3) {
          throw r2.cacheFailedRequest(e3), e3;
        }
      }
      async acquireTokenByUsernamePassword(e2) {
        this.logger.info("acquireTokenByUsernamePassword called", e2.correlationId);
        const t2 = __spreadValues(__spreadValues({}, e2), this.initializeBaseRequest(e2)), r2 = this.initializeServerTelemetryManager(c.acquireTokenByUsernamePassword, t2.correlationId);
        try {
          const e3 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId, r2), n2 = new i.UsernamePasswordClient(e3);
          return this.logger.verbose("Username password client created", t2.correlationId), n2.acquireToken(t2);
        } catch (e3) {
          throw r2.cacheFailedRequest(e3), e3;
        }
      }
      getTokenCache() {
        return this.logger.info("getTokenCache called"), this.tokenCache;
      }
      getLogger() {
        return this.logger;
      }
      setLogger(e2) {
        this.logger = e2;
      }
      async buildOauthClientConfiguration(e2, t2, i2, r2) {
        this.logger.verbose("buildOauthClientConfiguration called", t2), this.logger.verbose("building oauth client configuration with the authority: " + e2, t2);
        const n2 = await this.createAuthority(e2, r2, t2);
        return i2 == null || i2.updateRegionDiscoveryMetadata(n2.regionDiscoveryMetadata), { authOptions: { clientId: this.config.auth.clientId, authority: n2, clientCapabilities: this.config.auth.clientCapabilities }, loggerOptions: { logLevel: this.config.system.loggerOptions.logLevel, loggerCallback: this.config.system.loggerOptions.loggerCallback, piiLoggingEnabled: this.config.system.loggerOptions.piiLoggingEnabled, correlationId: t2 }, cryptoInterface: this.cryptoProvider, networkInterface: this.config.system.networkClient, storageInterface: this.storage, serverTelemetryManager: i2, clientCredentials: { clientSecret: this.clientSecret, clientAssertion: this.clientAssertion ? this.getClientAssertion(n2) : void 0 }, libraryInfo: { sku: "msal.js.node", version: "1.3.0", cpu: process.arch || "", os: process.platform || "" }, persistencePlugin: this.config.cache.cachePlugin, serializableCache: this.tokenCache };
      }
      getClientAssertion(e2) {
        return { assertion: this.clientAssertion.getJwt(this.cryptoProvider, this.config.auth.clientId, e2.tokenEndpoint), assertionType: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" };
      }
      initializeBaseRequest(e2) {
        return this.logger.verbose("initializeRequestScopes called", e2.correlationId), e2.authenticationScheme && e2.authenticationScheme === i.AuthenticationScheme.POP && this.logger.verbose("Authentication Scheme 'pop' is not supported yet, setting Authentication Scheme to 'Bearer' for request", e2.correlationId), e2.authenticationScheme = i.AuthenticationScheme.BEARER, __spreadProps(__spreadValues({}, e2), { scopes: [...e2 && e2.scopes || [], ...i.OIDC_DEFAULT_SCOPES], correlationId: e2 && e2.correlationId || this.cryptoProvider.createNewGuid(), authority: e2.authority || this.config.auth.authority });
      }
      initializeServerTelemetryManager(e2, t2, r2) {
        return new i.ServerTelemetryManager({ clientId: this.config.auth.clientId, correlationId: t2, apiId: e2, forceRefresh: r2 || false }, this.storage);
      }
      async createAuthority(e2, t2, r2) {
        this.logger.verbose("createAuthority called", r2);
        const n2 = { protocolMode: this.config.auth.protocolMode, knownAuthorities: this.config.auth.knownAuthorities, cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata, authorityMetadata: this.config.auth.authorityMetadata, azureRegionConfiguration: t2 };
        return await i.AuthorityFactory.createDiscoveredInstance(e2, this.config.system.networkClient, this.storage, n2);
      }
    };
    var M = class {
      static fromAssertion(e2) {
        const t2 = new M();
        return t2.jwt = e2, t2;
      }
      static fromCertificate(e2, t2, i2) {
        const r2 = new M();
        return r2.privateKey = t2, r2.thumbprint = e2, i2 && (r2.publicCertificate = this.parseCertificate(i2)), r2;
      }
      getJwt(e2, t2, r2) {
        if (this.privateKey && this.thumbprint)
          return this.jwt && !this.isExpired() && t2 === this.issuer && r2 === this.jwtAudience ? this.jwt : this.createJwt(e2, t2, r2);
        if (this.jwt)
          return this.jwt;
        throw i.ClientAuthError.createInvalidAssertionError();
      }
      createJwt(e2, t2, r2) {
        this.issuer = t2, this.jwtAudience = r2;
        const n2 = i.TimeUtils.nowSeconds();
        this.expirationTime = n2 + 600;
        const a2 = { alg: "RS256", x5t: p.base64EncodeUrl(this.thumbprint, "hex") };
        this.publicCertificate && Object.assign(a2, { x5c: this.publicCertificate });
        const o2 = { aud: this.jwtAudience, exp: this.expirationTime, iss: this.issuer, sub: this.issuer, nbf: n2, jti: e2.createNewGuid() };
        return this.jwt = s.sign(o2, this.privateKey, { header: a2 }), this.jwt;
      }
      isExpired() {
        return this.expirationTime < i.TimeUtils.nowSeconds();
      }
      static parseCertificate(e2) {
        const t2 = /-----BEGIN CERTIFICATE-----\n(.+?)\n-----END CERTIFICATE-----/gs, i2 = [];
        let r2;
        for (; (r2 = t2.exec(e2)) !== null; )
          i2.push(r2[1].replace(/\n/, ""));
        return i2;
      }
    };
    Object.defineProperty(exports, "AuthError", { enumerable: true, get: function() {
      return i.AuthError;
    } }), Object.defineProperty(exports, "AuthErrorMessage", { enumerable: true, get: function() {
      return i.AuthErrorMessage;
    } }), Object.defineProperty(exports, "ClientAuthError", { enumerable: true, get: function() {
      return i.ClientAuthError;
    } }), Object.defineProperty(exports, "ClientAuthErrorMessage", { enumerable: true, get: function() {
      return i.ClientAuthErrorMessage;
    } }), Object.defineProperty(exports, "ClientConfigurationError", { enumerable: true, get: function() {
      return i.ClientConfigurationError;
    } }), Object.defineProperty(exports, "ClientConfigurationErrorMessage", { enumerable: true, get: function() {
      return i.ClientConfigurationErrorMessage;
    } }), Object.defineProperty(exports, "InteractionRequiredAuthError", { enumerable: true, get: function() {
      return i.InteractionRequiredAuthError;
    } }), Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function() {
      return i.LogLevel;
    } }), Object.defineProperty(exports, "Logger", { enumerable: true, get: function() {
      return i.Logger;
    } }), Object.defineProperty(exports, "PromptValue", { enumerable: true, get: function() {
      return i.PromptValue;
    } }), Object.defineProperty(exports, "ProtocolMode", { enumerable: true, get: function() {
      return i.ProtocolMode;
    } }), Object.defineProperty(exports, "ResponseMode", { enumerable: true, get: function() {
      return i.ResponseMode;
    } }), Object.defineProperty(exports, "ServerError", { enumerable: true, get: function() {
      return i.ServerError;
    } }), Object.defineProperty(exports, "TokenCacheContext", { enumerable: true, get: function() {
      return i.TokenCacheContext;
    } }), exports.ClientApplication = w, exports.ClientAssertion = M, exports.ConfidentialClientApplication = class extends w {
      constructor(e2) {
        super(e2), this.setClientCredential(this.config);
      }
      async acquireTokenByClientCredential(e2) {
        this.logger.info("acquireTokenByClientCredential called", e2.correlationId);
        const t2 = __spreadValues(__spreadValues({}, e2), this.initializeBaseRequest(e2)), r2 = { azureRegion: t2.azureRegion, environmentRegion: process.env.REGION_NAME }, n2 = this.initializeServerTelemetryManager(c.acquireTokenByClientCredential, t2.correlationId, t2.skipCache);
        try {
          const e3 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId, n2, r2), a2 = new i.ClientCredentialClient(e3);
          return this.logger.verbose("Client credential client created", t2.correlationId), a2.acquireToken(t2);
        } catch (e3) {
          throw n2.cacheFailedRequest(e3), e3;
        }
      }
      async acquireTokenOnBehalfOf(e2) {
        this.logger.info("acquireTokenOnBehalfOf called", e2.correlationId);
        const t2 = __spreadValues(__spreadValues({}, e2), this.initializeBaseRequest(e2)), r2 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId), n2 = new i.OnBehalfOfClient(r2);
        return this.logger.verbose("On behalf of client created", t2.correlationId), n2.acquireToken(t2);
      }
      setClientCredential(e2) {
        const t2 = !i.StringUtils.isEmpty(e2.auth.clientSecret), r2 = !i.StringUtils.isEmpty(e2.auth.clientAssertion), n2 = e2.auth.clientCertificate, a2 = !i.StringUtils.isEmpty(n2.thumbprint) || !i.StringUtils.isEmpty(n2.privateKey);
        if (t2 && r2 || r2 && a2 || t2 && a2)
          throw i.ClientAuthError.createInvalidCredentialError();
        if (t2)
          this.clientSecret = e2.auth.clientSecret;
        else if (r2)
          this.clientAssertion = M.fromAssertion(e2.auth.clientAssertion);
        else {
          if (!a2)
            throw i.ClientAuthError.createInvalidCredentialError();
          var s2;
          this.clientAssertion = M.fromCertificate(n2.thumbprint, n2.privateKey, (s2 = e2.auth.clientCertificate) == null ? void 0 : s2.x5c);
        }
      }
    }, exports.CryptoProvider = m, exports.NodeStorage = A, exports.PublicClientApplication = class extends w {
      constructor(e2) {
        super(e2);
      }
      async acquireTokenByDeviceCode(e2) {
        this.logger.info("acquireTokenByDeviceCode called", e2.correlationId);
        const t2 = Object.assign(e2, this.initializeBaseRequest(e2)), r2 = this.initializeServerTelemetryManager(c.acquireTokenByDeviceCode, t2.correlationId);
        try {
          const e3 = await this.buildOauthClientConfiguration(t2.authority, t2.correlationId, r2), n2 = new i.DeviceCodeClient(e3);
          return this.logger.verbose("Device code client created", t2.correlationId), n2.acquireToken(t2);
        } catch (e3) {
          throw r2.cacheFailedRequest(e3), e3;
        }
      }
    }, exports.TokenCache = E, exports.buildAppConfiguration = g;
  }
});

// node_modules/@azure/msal-node/dist/msal-node.cjs.development.js
var require_msal_node_cjs_development = __commonJS({
  "node_modules/@azure/msal-node/dist/msal-node.cjs.development.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    var msalCommon = require_index_cjs();
    var axios = _interopDefault(require_axios2());
    var uuid = require_dist();
    var crypto = _interopDefault(require("crypto"));
    var jsonwebtoken = require_jsonwebtoken();
    var HttpMethod;
    (function(HttpMethod2) {
      HttpMethod2["GET"] = "get";
      HttpMethod2["POST"] = "post";
    })(HttpMethod || (HttpMethod = {}));
    var REGION_ENVIRONMENT_VARIABLE = "REGION_NAME";
    var RANDOM_OCTET_SIZE = 32;
    var Hash = {
      SHA256: "sha256"
    };
    var CharSet = {
      CV_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
    };
    var Constants = {
      MSAL_SKU: "msal.js.node",
      JWT_BEARER_ASSERTION_TYPE: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
    };
    var ApiId;
    (function(ApiId2) {
      ApiId2[ApiId2["acquireTokenSilent"] = 62] = "acquireTokenSilent";
      ApiId2[ApiId2["acquireTokenByUsernamePassword"] = 371] = "acquireTokenByUsernamePassword";
      ApiId2[ApiId2["acquireTokenByDeviceCode"] = 671] = "acquireTokenByDeviceCode";
      ApiId2[ApiId2["acquireTokenByClientCredential"] = 771] = "acquireTokenByClientCredential";
      ApiId2[ApiId2["acquireTokenByCode"] = 871] = "acquireTokenByCode";
      ApiId2[ApiId2["acquireTokenByRefreshToken"] = 872] = "acquireTokenByRefreshToken";
    })(ApiId || (ApiId = {}));
    var JwtConstants = {
      ALGORITHM: "alg",
      RSA_256: "RS256",
      X5T: "x5t",
      X5C: "x5c",
      AUDIENCE: "aud",
      EXPIRATION_TIME: "exp",
      ISSUER: "iss",
      SUBJECT: "sub",
      NOT_BEFORE: "nbf",
      JWT_ID: "jti"
    };
    var HttpClient = class {
      async sendGetRequestAsync(url, options) {
        const request = {
          method: HttpMethod.GET,
          url,
          headers: options && options.headers,
          validateStatus: () => true
        };
        const response = await axios(request);
        return {
          headers: response.headers,
          body: response.data,
          status: response.status
        };
      }
      async sendPostRequestAsync(url, options, cancellationToken) {
        const request = {
          method: HttpMethod.POST,
          url,
          data: options && options.body || "",
          timeout: cancellationToken,
          headers: options && options.headers,
          validateStatus: () => true
        };
        const response = await axios(request);
        return {
          headers: response.headers,
          body: response.data,
          status: response.status
        };
      }
    };
    var NetworkUtils = class {
      static getNetworkClient() {
        return new HttpClient();
      }
    };
    var DEFAULT_AUTH_OPTIONS = {
      clientId: "",
      authority: msalCommon.Constants.DEFAULT_AUTHORITY,
      clientSecret: "",
      clientAssertion: "",
      clientCertificate: {
        thumbprint: "",
        privateKey: "",
        x5c: ""
      },
      knownAuthorities: [],
      cloudDiscoveryMetadata: "",
      authorityMetadata: "",
      clientCapabilities: [],
      protocolMode: msalCommon.ProtocolMode.AAD
    };
    var DEFAULT_CACHE_OPTIONS = {};
    var DEFAULT_LOGGER_OPTIONS = {
      loggerCallback: () => {
      },
      piiLoggingEnabled: false,
      logLevel: msalCommon.LogLevel.Info
    };
    var DEFAULT_SYSTEM_OPTIONS = {
      loggerOptions: DEFAULT_LOGGER_OPTIONS,
      networkClient: /* @__PURE__ */ NetworkUtils.getNetworkClient()
    };
    function buildAppConfiguration({
      auth,
      cache,
      system
    }) {
      return {
        auth: __spreadValues(__spreadValues({}, DEFAULT_AUTH_OPTIONS), auth),
        cache: __spreadValues(__spreadValues({}, DEFAULT_CACHE_OPTIONS), cache),
        system: __spreadValues(__spreadValues({}, DEFAULT_SYSTEM_OPTIONS), system)
      };
    }
    var GuidGenerator = class {
      static generateGuid() {
        return uuid.v4();
      }
      static isGuid(guid) {
        const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return regexGuid.test(guid);
      }
    };
    var EncodingUtils = class {
      static base64Encode(str, encoding) {
        return Buffer.from(str, encoding).toString("base64");
      }
      static base64EncodeUrl(str, encoding) {
        return EncodingUtils.base64Encode(str, encoding).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
      }
      static base64Decode(base64Str) {
        return Buffer.from(base64Str, "base64").toString("utf8");
      }
      static base64DecodeUrl(base64Str) {
        let str = base64Str.replace(/-/g, "+").replace(/_/g, "/");
        while (str.length % 4) {
          str += "=";
        }
        return EncodingUtils.base64Decode(str);
      }
    };
    var PkceGenerator = class {
      async generatePkceCodes() {
        const verifier = this.generateCodeVerifier();
        const challenge = this.generateCodeChallengeFromVerifier(verifier);
        return {
          verifier,
          challenge
        };
      }
      generateCodeVerifier() {
        const buffer = crypto.randomBytes(RANDOM_OCTET_SIZE);
        const verifier = this.bufferToCVString(buffer);
        return EncodingUtils.base64EncodeUrl(verifier);
      }
      generateCodeChallengeFromVerifier(codeVerifier) {
        return EncodingUtils.base64EncodeUrl(this.sha256(codeVerifier).toString("base64"), "base64");
      }
      sha256(buffer) {
        return crypto.createHash(Hash.SHA256).update(buffer).digest();
      }
      bufferToCVString(buffer) {
        const charArr = [];
        for (let i = 0; i < buffer.byteLength; i += 1) {
          const index = buffer[i] % CharSet.CV_CHARSET.length;
          charArr.push(CharSet.CV_CHARSET[index]);
        }
        return charArr.join("");
      }
    };
    var CryptoProvider = class {
      constructor() {
        this.pkceGenerator = new PkceGenerator();
      }
      createNewGuid() {
        return GuidGenerator.generateGuid();
      }
      base64Encode(input) {
        return EncodingUtils.base64Encode(input);
      }
      base64Decode(input) {
        return EncodingUtils.base64Decode(input);
      }
      generatePkceCodes() {
        return this.pkceGenerator.generatePkceCodes();
      }
      getPublicKeyThumbprint() {
        throw new Error("Method not implemented.");
      }
      signJwt() {
        throw new Error("Method not implemented.");
      }
    };
    var Deserializer = class {
      static deserializeJSONBlob(jsonFile) {
        const deserializedCache = msalCommon.StringUtils.isEmpty(jsonFile) ? {} : JSON.parse(jsonFile);
        return deserializedCache;
      }
      static deserializeAccounts(accounts) {
        const accountObjects = {};
        if (accounts) {
          Object.keys(accounts).map(function(key) {
            const serializedAcc = accounts[key];
            const mappedAcc = {
              homeAccountId: serializedAcc.home_account_id,
              environment: serializedAcc.environment,
              realm: serializedAcc.realm,
              localAccountId: serializedAcc.local_account_id,
              username: serializedAcc.username,
              authorityType: serializedAcc.authority_type,
              name: serializedAcc.name,
              clientInfo: serializedAcc.client_info,
              lastModificationTime: serializedAcc.last_modification_time,
              lastModificationApp: serializedAcc.last_modification_app
            };
            const account = new msalCommon.AccountEntity();
            msalCommon.CacheManager.toObject(account, mappedAcc);
            accountObjects[key] = account;
          });
        }
        return accountObjects;
      }
      static deserializeIdTokens(idTokens) {
        const idObjects = {};
        if (idTokens) {
          Object.keys(idTokens).map(function(key) {
            const serializedIdT = idTokens[key];
            const mappedIdT = {
              homeAccountId: serializedIdT.home_account_id,
              environment: serializedIdT.environment,
              credentialType: serializedIdT.credential_type,
              clientId: serializedIdT.client_id,
              secret: serializedIdT.secret,
              realm: serializedIdT.realm
            };
            const idToken = new msalCommon.IdTokenEntity();
            msalCommon.CacheManager.toObject(idToken, mappedIdT);
            idObjects[key] = idToken;
          });
        }
        return idObjects;
      }
      static deserializeAccessTokens(accessTokens) {
        const atObjects = {};
        if (accessTokens) {
          Object.keys(accessTokens).map(function(key) {
            const serializedAT = accessTokens[key];
            const mappedAT = {
              homeAccountId: serializedAT.home_account_id,
              environment: serializedAT.environment,
              credentialType: serializedAT.credential_type,
              clientId: serializedAT.client_id,
              secret: serializedAT.secret,
              realm: serializedAT.realm,
              target: serializedAT.target,
              cachedAt: serializedAT.cached_at,
              expiresOn: serializedAT.expires_on,
              extendedExpiresOn: serializedAT.extended_expires_on,
              refreshOn: serializedAT.refresh_on,
              keyId: serializedAT.key_id,
              tokenType: serializedAT.token_type
            };
            const accessToken = new msalCommon.AccessTokenEntity();
            msalCommon.CacheManager.toObject(accessToken, mappedAT);
            atObjects[key] = accessToken;
          });
        }
        return atObjects;
      }
      static deserializeRefreshTokens(refreshTokens) {
        const rtObjects = {};
        if (refreshTokens) {
          Object.keys(refreshTokens).map(function(key) {
            const serializedRT = refreshTokens[key];
            const mappedRT = {
              homeAccountId: serializedRT.home_account_id,
              environment: serializedRT.environment,
              credentialType: serializedRT.credential_type,
              clientId: serializedRT.client_id,
              secret: serializedRT.secret,
              familyId: serializedRT.family_id,
              target: serializedRT.target,
              realm: serializedRT.realm
            };
            const refreshToken = new msalCommon.RefreshTokenEntity();
            msalCommon.CacheManager.toObject(refreshToken, mappedRT);
            rtObjects[key] = refreshToken;
          });
        }
        return rtObjects;
      }
      static deserializeAppMetadata(appMetadata) {
        const appMetadataObjects = {};
        if (appMetadata) {
          Object.keys(appMetadata).map(function(key) {
            const serializedAmdt = appMetadata[key];
            const mappedAmd = {
              clientId: serializedAmdt.client_id,
              environment: serializedAmdt.environment,
              familyId: serializedAmdt.family_id
            };
            const amd = new msalCommon.AppMetadataEntity();
            msalCommon.CacheManager.toObject(amd, mappedAmd);
            appMetadataObjects[key] = amd;
          });
        }
        return appMetadataObjects;
      }
      static deserializeAllCache(jsonCache) {
        return {
          accounts: jsonCache.Account ? this.deserializeAccounts(jsonCache.Account) : {},
          idTokens: jsonCache.IdToken ? this.deserializeIdTokens(jsonCache.IdToken) : {},
          accessTokens: jsonCache.AccessToken ? this.deserializeAccessTokens(jsonCache.AccessToken) : {},
          refreshTokens: jsonCache.RefreshToken ? this.deserializeRefreshTokens(jsonCache.RefreshToken) : {},
          appMetadata: jsonCache.AppMetadata ? this.deserializeAppMetadata(jsonCache.AppMetadata) : {}
        };
      }
    };
    var Serializer = class {
      static serializeJSONBlob(data) {
        return JSON.stringify(data);
      }
      static serializeAccounts(accCache) {
        const accounts = {};
        Object.keys(accCache).map(function(key) {
          const accountEntity = accCache[key];
          accounts[key] = {
            home_account_id: accountEntity.homeAccountId,
            environment: accountEntity.environment,
            realm: accountEntity.realm,
            local_account_id: accountEntity.localAccountId,
            username: accountEntity.username,
            authority_type: accountEntity.authorityType,
            name: accountEntity.name,
            client_info: accountEntity.clientInfo,
            last_modification_time: accountEntity.lastModificationTime,
            last_modification_app: accountEntity.lastModificationApp
          };
        });
        return accounts;
      }
      static serializeIdTokens(idTCache) {
        const idTokens = {};
        Object.keys(idTCache).map(function(key) {
          const idTEntity = idTCache[key];
          idTokens[key] = {
            home_account_id: idTEntity.homeAccountId,
            environment: idTEntity.environment,
            credential_type: idTEntity.credentialType,
            client_id: idTEntity.clientId,
            secret: idTEntity.secret,
            realm: idTEntity.realm
          };
        });
        return idTokens;
      }
      static serializeAccessTokens(atCache) {
        const accessTokens = {};
        Object.keys(atCache).map(function(key) {
          const atEntity = atCache[key];
          accessTokens[key] = {
            home_account_id: atEntity.homeAccountId,
            environment: atEntity.environment,
            credential_type: atEntity.credentialType,
            client_id: atEntity.clientId,
            secret: atEntity.secret,
            realm: atEntity.realm,
            target: atEntity.target,
            cached_at: atEntity.cachedAt,
            expires_on: atEntity.expiresOn,
            extended_expires_on: atEntity.extendedExpiresOn,
            refresh_on: atEntity.refreshOn,
            key_id: atEntity.keyId,
            token_type: atEntity.tokenType
          };
        });
        return accessTokens;
      }
      static serializeRefreshTokens(rtCache) {
        const refreshTokens = {};
        Object.keys(rtCache).map(function(key) {
          const rtEntity = rtCache[key];
          refreshTokens[key] = {
            home_account_id: rtEntity.homeAccountId,
            environment: rtEntity.environment,
            credential_type: rtEntity.credentialType,
            client_id: rtEntity.clientId,
            secret: rtEntity.secret,
            family_id: rtEntity.familyId,
            target: rtEntity.target,
            realm: rtEntity.realm
          };
        });
        return refreshTokens;
      }
      static serializeAppMetadata(amdtCache) {
        const appMetadata = {};
        Object.keys(amdtCache).map(function(key) {
          const amdtEntity = amdtCache[key];
          appMetadata[key] = {
            client_id: amdtEntity.clientId,
            environment: amdtEntity.environment,
            family_id: amdtEntity.familyId
          };
        });
        return appMetadata;
      }
      static serializeAllCache(inMemCache) {
        return {
          Account: this.serializeAccounts(inMemCache.accounts),
          IdToken: this.serializeIdTokens(inMemCache.idTokens),
          AccessToken: this.serializeAccessTokens(inMemCache.accessTokens),
          RefreshToken: this.serializeRefreshTokens(inMemCache.refreshTokens),
          AppMetadata: this.serializeAppMetadata(inMemCache.appMetadata)
        };
      }
    };
    var NodeStorage = class extends msalCommon.CacheManager {
      constructor(logger, clientId, cryptoImpl) {
        super(clientId, cryptoImpl);
        this.cache = {};
        this.changeEmitters = [];
        this.logger = logger;
      }
      registerChangeEmitter(func) {
        this.changeEmitters.push(func);
      }
      emitChange() {
        this.changeEmitters.forEach((func) => func.call(null));
      }
      cacheToInMemoryCache(cache) {
        const inMemoryCache = {
          accounts: {},
          idTokens: {},
          accessTokens: {},
          refreshTokens: {},
          appMetadata: {}
        };
        for (const key in cache) {
          if (cache[key] instanceof msalCommon.AccountEntity) {
            inMemoryCache.accounts[key] = cache[key];
          } else if (cache[key] instanceof msalCommon.IdTokenEntity) {
            inMemoryCache.idTokens[key] = cache[key];
          } else if (cache[key] instanceof msalCommon.AccessTokenEntity) {
            inMemoryCache.accessTokens[key] = cache[key];
          } else if (cache[key] instanceof msalCommon.RefreshTokenEntity) {
            inMemoryCache.refreshTokens[key] = cache[key];
          } else if (cache[key] instanceof msalCommon.AppMetadataEntity) {
            inMemoryCache.appMetadata[key] = cache[key];
          } else {
            continue;
          }
        }
        return inMemoryCache;
      }
      inMemoryCacheToCache(inMemoryCache) {
        let cache = this.getCache();
        cache = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, inMemoryCache.accounts), inMemoryCache.idTokens), inMemoryCache.accessTokens), inMemoryCache.refreshTokens), inMemoryCache.appMetadata);
        return cache;
      }
      getInMemoryCache() {
        this.logger.trace("Getting in-memory cache");
        const inMemoryCache = this.cacheToInMemoryCache(this.getCache());
        return inMemoryCache;
      }
      setInMemoryCache(inMemoryCache) {
        this.logger.trace("Setting in-memory cache");
        const cache = this.inMemoryCacheToCache(inMemoryCache);
        this.setCache(cache);
        this.emitChange();
      }
      getCache() {
        this.logger.trace("Getting cache key-value store");
        return this.cache;
      }
      setCache(cache) {
        this.logger.trace("Setting cache key value store");
        this.cache = cache;
        this.emitChange();
      }
      getItem(key) {
        this.logger.tracePii(`Item key: ${key}`);
        const cache = this.getCache();
        return cache[key];
      }
      setItem(key, value) {
        this.logger.tracePii(`Item key: ${key}`);
        const cache = this.getCache();
        cache[key] = value;
        this.setCache(cache);
      }
      getAccount(accountKey) {
        const account = this.getItem(accountKey);
        if (msalCommon.AccountEntity.isAccountEntity(account)) {
          return account;
        }
        return null;
      }
      setAccount(account) {
        const accountKey = account.generateAccountKey();
        this.setItem(accountKey, account);
      }
      getIdTokenCredential(idTokenKey) {
        const idToken = this.getItem(idTokenKey);
        if (msalCommon.IdTokenEntity.isIdTokenEntity(idToken)) {
          return idToken;
        }
        return null;
      }
      setIdTokenCredential(idToken) {
        const idTokenKey = idToken.generateCredentialKey();
        this.setItem(idTokenKey, idToken);
      }
      getAccessTokenCredential(accessTokenKey) {
        const accessToken = this.getItem(accessTokenKey);
        if (msalCommon.AccessTokenEntity.isAccessTokenEntity(accessToken)) {
          return accessToken;
        }
        return null;
      }
      setAccessTokenCredential(accessToken) {
        const accessTokenKey = accessToken.generateCredentialKey();
        this.setItem(accessTokenKey, accessToken);
      }
      getRefreshTokenCredential(refreshTokenKey) {
        const refreshToken = this.getItem(refreshTokenKey);
        if (msalCommon.RefreshTokenEntity.isRefreshTokenEntity(refreshToken)) {
          return refreshToken;
        }
        return null;
      }
      setRefreshTokenCredential(refreshToken) {
        const refreshTokenKey = refreshToken.generateCredentialKey();
        this.setItem(refreshTokenKey, refreshToken);
      }
      getAppMetadata(appMetadataKey) {
        const appMetadata = this.getItem(appMetadataKey);
        if (msalCommon.AppMetadataEntity.isAppMetadataEntity(appMetadataKey, appMetadata)) {
          return appMetadata;
        }
        return null;
      }
      setAppMetadata(appMetadata) {
        const appMetadataKey = appMetadata.generateAppMetadataKey();
        this.setItem(appMetadataKey, appMetadata);
      }
      getServerTelemetry(serverTelemetrykey) {
        const serverTelemetryEntity = this.getItem(serverTelemetrykey);
        if (serverTelemetryEntity && msalCommon.ServerTelemetryEntity.isServerTelemetryEntity(serverTelemetrykey, serverTelemetryEntity)) {
          return serverTelemetryEntity;
        }
        return null;
      }
      setServerTelemetry(serverTelemetryKey, serverTelemetry) {
        this.setItem(serverTelemetryKey, serverTelemetry);
      }
      getAuthorityMetadata(key) {
        const authorityMetadataEntity = this.getItem(key);
        if (authorityMetadataEntity && msalCommon.AuthorityMetadataEntity.isAuthorityMetadataEntity(key, authorityMetadataEntity)) {
          return authorityMetadataEntity;
        }
        return null;
      }
      getAuthorityMetadataKeys() {
        return this.getKeys().filter((key) => {
          return this.isAuthorityMetadata(key);
        });
      }
      setAuthorityMetadata(key, metadata) {
        this.setItem(key, metadata);
      }
      getThrottlingCache(throttlingCacheKey) {
        const throttlingCache = this.getItem(throttlingCacheKey);
        if (throttlingCache && msalCommon.ThrottlingEntity.isThrottlingEntity(throttlingCacheKey, throttlingCache)) {
          return throttlingCache;
        }
        return null;
      }
      setThrottlingCache(throttlingCacheKey, throttlingCache) {
        this.setItem(throttlingCacheKey, throttlingCache);
      }
      removeItem(key) {
        this.logger.tracePii(`Item key: ${key}`);
        let result = false;
        const cache = this.getCache();
        if (!!cache[key]) {
          delete cache[key];
          result = true;
        }
        if (result) {
          this.setCache(cache);
          this.emitChange();
        }
        return result;
      }
      containsKey(key) {
        return this.getKeys().includes(key);
      }
      getKeys() {
        this.logger.trace("Retrieving all cache keys");
        const cache = this.getCache();
        return [...Object.keys(cache)];
      }
      clear() {
        this.logger.trace("Clearing cache entries created by MSAL");
        const cacheKeys = this.getKeys();
        cacheKeys.forEach((key) => {
          this.removeItem(key);
        });
        this.emitChange();
      }
      static generateInMemoryCache(cache) {
        return Deserializer.deserializeAllCache(Deserializer.deserializeJSONBlob(cache));
      }
      static generateJsonCache(inMemoryCache) {
        return Serializer.serializeAllCache(inMemoryCache);
      }
    };
    var defaultSerializedCache = {
      Account: {},
      IdToken: {},
      AccessToken: {},
      RefreshToken: {},
      AppMetadata: {}
    };
    var TokenCache = class {
      constructor(storage, logger, cachePlugin) {
        this.cacheHasChanged = false;
        this.storage = storage;
        this.storage.registerChangeEmitter(this.handleChangeEvent.bind(this));
        if (cachePlugin) {
          this.persistence = cachePlugin;
        }
        this.logger = logger;
      }
      hasChanged() {
        return this.cacheHasChanged;
      }
      serialize() {
        this.logger.trace("Serializing in-memory cache");
        let finalState = Serializer.serializeAllCache(this.storage.getInMemoryCache());
        if (!msalCommon.StringUtils.isEmpty(this.cacheSnapshot)) {
          this.logger.trace("Reading cache snapshot from disk");
          finalState = this.mergeState(JSON.parse(this.cacheSnapshot), finalState);
        } else {
          this.logger.trace("No cache snapshot to merge");
        }
        this.cacheHasChanged = false;
        return JSON.stringify(finalState);
      }
      deserialize(cache) {
        this.logger.trace("Deserializing JSON to in-memory cache");
        this.cacheSnapshot = cache;
        if (!msalCommon.StringUtils.isEmpty(this.cacheSnapshot)) {
          this.logger.trace("Reading cache snapshot from disk");
          const deserializedCache = Deserializer.deserializeAllCache(this.overlayDefaults(JSON.parse(this.cacheSnapshot)));
          this.storage.setInMemoryCache(deserializedCache);
        } else {
          this.logger.trace("No cache snapshot to deserialize");
        }
      }
      getKVStore() {
        return this.storage.getCache();
      }
      async getAllAccounts() {
        this.logger.trace("getAllAccounts called");
        let cacheContext;
        try {
          if (this.persistence) {
            cacheContext = new msalCommon.TokenCacheContext(this, false);
            await this.persistence.beforeCacheAccess(cacheContext);
          }
          return this.storage.getAllAccounts();
        } finally {
          if (this.persistence && cacheContext) {
            await this.persistence.afterCacheAccess(cacheContext);
          }
        }
      }
      async getAccountByHomeId(homeAccountId) {
        const allAccounts = await this.getAllAccounts();
        if (!msalCommon.StringUtils.isEmpty(homeAccountId) && allAccounts && allAccounts.length) {
          return allAccounts.filter((accountObj) => accountObj.homeAccountId === homeAccountId)[0] || null;
        } else {
          return null;
        }
      }
      async getAccountByLocalId(localAccountId) {
        const allAccounts = await this.getAllAccounts();
        if (!msalCommon.StringUtils.isEmpty(localAccountId) && allAccounts && allAccounts.length) {
          return allAccounts.filter((accountObj) => accountObj.localAccountId === localAccountId)[0] || null;
        } else {
          return null;
        }
      }
      async removeAccount(account) {
        this.logger.trace("removeAccount called");
        let cacheContext;
        try {
          if (this.persistence) {
            cacheContext = new msalCommon.TokenCacheContext(this, true);
            await this.persistence.beforeCacheAccess(cacheContext);
          }
          this.storage.removeAccount(msalCommon.AccountEntity.generateAccountCacheKey(account));
        } finally {
          if (this.persistence && cacheContext) {
            await this.persistence.afterCacheAccess(cacheContext);
          }
        }
      }
      handleChangeEvent() {
        this.cacheHasChanged = true;
      }
      mergeState(oldState, currentState) {
        this.logger.trace("Merging in-memory cache with cache snapshot");
        const stateAfterRemoval = this.mergeRemovals(oldState, currentState);
        return this.mergeUpdates(stateAfterRemoval, currentState);
      }
      mergeUpdates(oldState, newState) {
        Object.keys(newState).forEach((newKey) => {
          const newValue = newState[newKey];
          if (!oldState.hasOwnProperty(newKey)) {
            if (newValue !== null) {
              oldState[newKey] = newValue;
            }
          } else {
            const newValueNotNull = newValue !== null;
            const newValueIsObject = typeof newValue === "object";
            const newValueIsNotArray = !Array.isArray(newValue);
            const oldStateNotUndefinedOrNull = typeof oldState[newKey] !== "undefined" && oldState[newKey] !== null;
            if (newValueNotNull && newValueIsObject && newValueIsNotArray && oldStateNotUndefinedOrNull) {
              this.mergeUpdates(oldState[newKey], newValue);
            } else {
              oldState[newKey] = newValue;
            }
          }
        });
        return oldState;
      }
      mergeRemovals(oldState, newState) {
        this.logger.trace("Remove updated entries in cache");
        const accounts = oldState.Account ? this.mergeRemovalsDict(oldState.Account, newState.Account) : oldState.Account;
        const accessTokens = oldState.AccessToken ? this.mergeRemovalsDict(oldState.AccessToken, newState.AccessToken) : oldState.AccessToken;
        const refreshTokens = oldState.RefreshToken ? this.mergeRemovalsDict(oldState.RefreshToken, newState.RefreshToken) : oldState.RefreshToken;
        const idTokens = oldState.IdToken ? this.mergeRemovalsDict(oldState.IdToken, newState.IdToken) : oldState.IdToken;
        const appMetadata = oldState.AppMetadata ? this.mergeRemovalsDict(oldState.AppMetadata, newState.AppMetadata) : oldState.AppMetadata;
        return __spreadProps(__spreadValues({}, oldState), {
          Account: accounts,
          AccessToken: accessTokens,
          RefreshToken: refreshTokens,
          IdToken: idTokens,
          AppMetadata: appMetadata
        });
      }
      mergeRemovalsDict(oldState, newState) {
        const finalState = __spreadValues({}, oldState);
        Object.keys(oldState).forEach((oldKey) => {
          if (!newState || !newState.hasOwnProperty(oldKey)) {
            delete finalState[oldKey];
          }
        });
        return finalState;
      }
      overlayDefaults(passedInCache) {
        this.logger.trace("Overlaying input cache with the default cache");
        return {
          Account: __spreadValues(__spreadValues({}, defaultSerializedCache.Account), passedInCache.Account),
          IdToken: __spreadValues(__spreadValues({}, defaultSerializedCache.IdToken), passedInCache.IdToken),
          AccessToken: __spreadValues(__spreadValues({}, defaultSerializedCache.AccessToken), passedInCache.AccessToken),
          RefreshToken: __spreadValues(__spreadValues({}, defaultSerializedCache.RefreshToken), passedInCache.RefreshToken),
          AppMetadata: __spreadValues(__spreadValues({}, defaultSerializedCache.AppMetadata), passedInCache.AppMetadata)
        };
      }
    };
    var name = "@azure/msal-node";
    var version = "1.3.0";
    var ClientApplication = class {
      constructor(configuration) {
        this.config = buildAppConfiguration(configuration);
        this.cryptoProvider = new CryptoProvider();
        this.logger = new msalCommon.Logger(this.config.system.loggerOptions, name, version);
        this.storage = new NodeStorage(this.logger, this.config.auth.clientId, this.cryptoProvider);
        this.tokenCache = new TokenCache(this.storage, this.logger, this.config.cache.cachePlugin);
      }
      async getAuthCodeUrl(request) {
        this.logger.info("getAuthCodeUrl called", request.correlationId);
        const validRequest = __spreadProps(__spreadValues(__spreadValues({}, request), this.initializeBaseRequest(request)), {
          responseMode: request.responseMode || msalCommon.ResponseMode.QUERY,
          authenticationScheme: msalCommon.AuthenticationScheme.BEARER
        });
        const authClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId);
        const authorizationCodeClient = new msalCommon.AuthorizationCodeClient(authClientConfig);
        this.logger.verbose("Auth code client created", validRequest.correlationId);
        return authorizationCodeClient.getAuthCodeUrl(validRequest);
      }
      async acquireTokenByCode(request) {
        this.logger.info("acquireTokenByCode called", request.correlationId);
        const validRequest = __spreadProps(__spreadValues(__spreadValues({}, request), this.initializeBaseRequest(request)), {
          authenticationScheme: msalCommon.AuthenticationScheme.BEARER
        });
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByCode, validRequest.correlationId);
        try {
          const authClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, serverTelemetryManager);
          const authorizationCodeClient = new msalCommon.AuthorizationCodeClient(authClientConfig);
          this.logger.verbose("Auth code client created", validRequest.correlationId);
          return authorizationCodeClient.acquireToken(validRequest);
        } catch (e) {
          serverTelemetryManager.cacheFailedRequest(e);
          throw e;
        }
      }
      async acquireTokenByRefreshToken(request) {
        this.logger.info("acquireTokenByRefreshToken called", request.correlationId);
        const validRequest = __spreadProps(__spreadValues(__spreadValues({}, request), this.initializeBaseRequest(request)), {
          authenticationScheme: msalCommon.AuthenticationScheme.BEARER
        });
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByRefreshToken, validRequest.correlationId);
        try {
          const refreshTokenClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, serverTelemetryManager);
          const refreshTokenClient = new msalCommon.RefreshTokenClient(refreshTokenClientConfig);
          this.logger.verbose("Refresh token client created", validRequest.correlationId);
          return refreshTokenClient.acquireToken(validRequest);
        } catch (e) {
          serverTelemetryManager.cacheFailedRequest(e);
          throw e;
        }
      }
      async acquireTokenSilent(request) {
        const validRequest = __spreadProps(__spreadValues(__spreadValues({}, request), this.initializeBaseRequest(request)), {
          forceRefresh: request.forceRefresh || false
        });
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenSilent, validRequest.correlationId, validRequest.forceRefresh);
        try {
          const silentFlowClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, serverTelemetryManager);
          const silentFlowClient = new msalCommon.SilentFlowClient(silentFlowClientConfig);
          this.logger.verbose("Silent flow client created", validRequest.correlationId);
          return silentFlowClient.acquireToken(validRequest);
        } catch (e) {
          serverTelemetryManager.cacheFailedRequest(e);
          throw e;
        }
      }
      async acquireTokenByUsernamePassword(request) {
        this.logger.info("acquireTokenByUsernamePassword called", request.correlationId);
        const validRequest = __spreadValues(__spreadValues({}, request), this.initializeBaseRequest(request));
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByUsernamePassword, validRequest.correlationId);
        try {
          const usernamePasswordClientConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, serverTelemetryManager);
          const usernamePasswordClient = new msalCommon.UsernamePasswordClient(usernamePasswordClientConfig);
          this.logger.verbose("Username password client created", validRequest.correlationId);
          return usernamePasswordClient.acquireToken(validRequest);
        } catch (e) {
          serverTelemetryManager.cacheFailedRequest(e);
          throw e;
        }
      }
      getTokenCache() {
        this.logger.info("getTokenCache called");
        return this.tokenCache;
      }
      getLogger() {
        return this.logger;
      }
      setLogger(logger) {
        this.logger = logger;
      }
      async buildOauthClientConfiguration(authority, requestCorrelationId, serverTelemetryManager, azureRegionConfiguration) {
        this.logger.verbose("buildOauthClientConfiguration called", requestCorrelationId);
        this.logger.verbose(`building oauth client configuration with the authority: ${authority}`, requestCorrelationId);
        const discoveredAuthority = await this.createAuthority(authority, azureRegionConfiguration, requestCorrelationId);
        serverTelemetryManager == null ? void 0 : serverTelemetryManager.updateRegionDiscoveryMetadata(discoveredAuthority.regionDiscoveryMetadata);
        return {
          authOptions: {
            clientId: this.config.auth.clientId,
            authority: discoveredAuthority,
            clientCapabilities: this.config.auth.clientCapabilities
          },
          loggerOptions: {
            logLevel: this.config.system.loggerOptions.logLevel,
            loggerCallback: this.config.system.loggerOptions.loggerCallback,
            piiLoggingEnabled: this.config.system.loggerOptions.piiLoggingEnabled,
            correlationId: requestCorrelationId
          },
          cryptoInterface: this.cryptoProvider,
          networkInterface: this.config.system.networkClient,
          storageInterface: this.storage,
          serverTelemetryManager,
          clientCredentials: {
            clientSecret: this.clientSecret,
            clientAssertion: this.clientAssertion ? this.getClientAssertion(discoveredAuthority) : void 0
          },
          libraryInfo: {
            sku: Constants.MSAL_SKU,
            version,
            cpu: process.arch || "",
            os: process.platform || ""
          },
          persistencePlugin: this.config.cache.cachePlugin,
          serializableCache: this.tokenCache
        };
      }
      getClientAssertion(authority) {
        return {
          assertion: this.clientAssertion.getJwt(this.cryptoProvider, this.config.auth.clientId, authority.tokenEndpoint),
          assertionType: Constants.JWT_BEARER_ASSERTION_TYPE
        };
      }
      initializeBaseRequest(authRequest) {
        this.logger.verbose("initializeRequestScopes called", authRequest.correlationId);
        if (authRequest.authenticationScheme && authRequest.authenticationScheme === msalCommon.AuthenticationScheme.POP) {
          this.logger.verbose("Authentication Scheme 'pop' is not supported yet, setting Authentication Scheme to 'Bearer' for request", authRequest.correlationId);
        }
        authRequest.authenticationScheme = msalCommon.AuthenticationScheme.BEARER;
        return __spreadProps(__spreadValues({}, authRequest), {
          scopes: [...authRequest && authRequest.scopes || [], ...msalCommon.OIDC_DEFAULT_SCOPES],
          correlationId: authRequest && authRequest.correlationId || this.cryptoProvider.createNewGuid(),
          authority: authRequest.authority || this.config.auth.authority
        });
      }
      initializeServerTelemetryManager(apiId, correlationId, forceRefresh) {
        const telemetryPayload = {
          clientId: this.config.auth.clientId,
          correlationId,
          apiId,
          forceRefresh: forceRefresh || false
        };
        return new msalCommon.ServerTelemetryManager(telemetryPayload, this.storage);
      }
      async createAuthority(authorityString, azureRegionConfiguration, requestCorrelationId) {
        this.logger.verbose("createAuthority called", requestCorrelationId);
        const authorityOptions = {
          protocolMode: this.config.auth.protocolMode,
          knownAuthorities: this.config.auth.knownAuthorities,
          cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
          authorityMetadata: this.config.auth.authorityMetadata,
          azureRegionConfiguration
        };
        return await msalCommon.AuthorityFactory.createDiscoveredInstance(authorityString, this.config.system.networkClient, this.storage, authorityOptions);
      }
    };
    var PublicClientApplication = class extends ClientApplication {
      constructor(configuration) {
        super(configuration);
      }
      async acquireTokenByDeviceCode(request) {
        this.logger.info("acquireTokenByDeviceCode called", request.correlationId);
        const validRequest = Object.assign(request, this.initializeBaseRequest(request));
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByDeviceCode, validRequest.correlationId);
        try {
          const deviceCodeConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, serverTelemetryManager);
          const deviceCodeClient = new msalCommon.DeviceCodeClient(deviceCodeConfig);
          this.logger.verbose("Device code client created", validRequest.correlationId);
          return deviceCodeClient.acquireToken(validRequest);
        } catch (e) {
          serverTelemetryManager.cacheFailedRequest(e);
          throw e;
        }
      }
    };
    var ClientAssertion = class {
      static fromAssertion(assertion) {
        const clientAssertion = new ClientAssertion();
        clientAssertion.jwt = assertion;
        return clientAssertion;
      }
      static fromCertificate(thumbprint, privateKey, publicCertificate) {
        const clientAssertion = new ClientAssertion();
        clientAssertion.privateKey = privateKey;
        clientAssertion.thumbprint = thumbprint;
        if (publicCertificate) {
          clientAssertion.publicCertificate = this.parseCertificate(publicCertificate);
        }
        return clientAssertion;
      }
      getJwt(cryptoProvider, issuer, jwtAudience) {
        if (this.privateKey && this.thumbprint) {
          if (this.jwt && !this.isExpired() && issuer === this.issuer && jwtAudience === this.jwtAudience) {
            return this.jwt;
          }
          return this.createJwt(cryptoProvider, issuer, jwtAudience);
        }
        if (this.jwt) {
          return this.jwt;
        }
        throw msalCommon.ClientAuthError.createInvalidAssertionError();
      }
      createJwt(cryptoProvider, issuer, jwtAudience) {
        this.issuer = issuer;
        this.jwtAudience = jwtAudience;
        const issuedAt = msalCommon.TimeUtils.nowSeconds();
        this.expirationTime = issuedAt + 600;
        const header = {
          [JwtConstants.ALGORITHM]: JwtConstants.RSA_256,
          [JwtConstants.X5T]: EncodingUtils.base64EncodeUrl(this.thumbprint, "hex")
        };
        if (this.publicCertificate) {
          Object.assign(header, {
            [JwtConstants.X5C]: this.publicCertificate
          });
        }
        const payload = {
          [JwtConstants.AUDIENCE]: this.jwtAudience,
          [JwtConstants.EXPIRATION_TIME]: this.expirationTime,
          [JwtConstants.ISSUER]: this.issuer,
          [JwtConstants.SUBJECT]: this.issuer,
          [JwtConstants.NOT_BEFORE]: issuedAt,
          [JwtConstants.JWT_ID]: cryptoProvider.createNewGuid()
        };
        this.jwt = jsonwebtoken.sign(payload, this.privateKey, {
          header
        });
        return this.jwt;
      }
      isExpired() {
        return this.expirationTime < msalCommon.TimeUtils.nowSeconds();
      }
      static parseCertificate(publicCertificate) {
        const regexToFindCerts = /-----BEGIN CERTIFICATE-----\n(.+?)\n-----END CERTIFICATE-----/gs;
        const certs = [];
        let matches;
        while ((matches = regexToFindCerts.exec(publicCertificate)) !== null) {
          certs.push(matches[1].replace(/\n/, ""));
        }
        return certs;
      }
    };
    var ConfidentialClientApplication = class extends ClientApplication {
      constructor(configuration) {
        super(configuration);
        this.setClientCredential(this.config);
      }
      async acquireTokenByClientCredential(request) {
        this.logger.info("acquireTokenByClientCredential called", request.correlationId);
        const validRequest = __spreadValues(__spreadValues({}, request), this.initializeBaseRequest(request));
        const azureRegionConfiguration = {
          azureRegion: validRequest.azureRegion,
          environmentRegion: process.env[REGION_ENVIRONMENT_VARIABLE]
        };
        const serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByClientCredential, validRequest.correlationId, validRequest.skipCache);
        try {
          const clientCredentialConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId, serverTelemetryManager, azureRegionConfiguration);
          const clientCredentialClient = new msalCommon.ClientCredentialClient(clientCredentialConfig);
          this.logger.verbose("Client credential client created", validRequest.correlationId);
          return clientCredentialClient.acquireToken(validRequest);
        } catch (e) {
          serverTelemetryManager.cacheFailedRequest(e);
          throw e;
        }
      }
      async acquireTokenOnBehalfOf(request) {
        this.logger.info("acquireTokenOnBehalfOf called", request.correlationId);
        const validRequest = __spreadValues(__spreadValues({}, request), this.initializeBaseRequest(request));
        const clientCredentialConfig = await this.buildOauthClientConfiguration(validRequest.authority, validRequest.correlationId);
        const oboClient = new msalCommon.OnBehalfOfClient(clientCredentialConfig);
        this.logger.verbose("On behalf of client created", validRequest.correlationId);
        return oboClient.acquireToken(validRequest);
      }
      setClientCredential(configuration) {
        const clientSecretNotEmpty = !msalCommon.StringUtils.isEmpty(configuration.auth.clientSecret);
        const clientAssertionNotEmpty = !msalCommon.StringUtils.isEmpty(configuration.auth.clientAssertion);
        const certificate = configuration.auth.clientCertificate;
        const certificateNotEmpty = !msalCommon.StringUtils.isEmpty(certificate.thumbprint) || !msalCommon.StringUtils.isEmpty(certificate.privateKey);
        if (clientSecretNotEmpty && clientAssertionNotEmpty || clientAssertionNotEmpty && certificateNotEmpty || clientSecretNotEmpty && certificateNotEmpty) {
          throw msalCommon.ClientAuthError.createInvalidCredentialError();
        }
        if (clientSecretNotEmpty) {
          this.clientSecret = configuration.auth.clientSecret;
          return;
        }
        if (clientAssertionNotEmpty) {
          this.clientAssertion = ClientAssertion.fromAssertion(configuration.auth.clientAssertion);
          return;
        }
        if (!certificateNotEmpty) {
          throw msalCommon.ClientAuthError.createInvalidCredentialError();
        } else {
          var _configuration$auth$c;
          this.clientAssertion = ClientAssertion.fromCertificate(certificate.thumbprint, certificate.privateKey, (_configuration$auth$c = configuration.auth.clientCertificate) == null ? void 0 : _configuration$auth$c.x5c);
        }
      }
    };
    Object.defineProperty(exports, "AuthError", {
      enumerable: true,
      get: function() {
        return msalCommon.AuthError;
      }
    });
    Object.defineProperty(exports, "AuthErrorMessage", {
      enumerable: true,
      get: function() {
        return msalCommon.AuthErrorMessage;
      }
    });
    Object.defineProperty(exports, "ClientAuthError", {
      enumerable: true,
      get: function() {
        return msalCommon.ClientAuthError;
      }
    });
    Object.defineProperty(exports, "ClientAuthErrorMessage", {
      enumerable: true,
      get: function() {
        return msalCommon.ClientAuthErrorMessage;
      }
    });
    Object.defineProperty(exports, "ClientConfigurationError", {
      enumerable: true,
      get: function() {
        return msalCommon.ClientConfigurationError;
      }
    });
    Object.defineProperty(exports, "ClientConfigurationErrorMessage", {
      enumerable: true,
      get: function() {
        return msalCommon.ClientConfigurationErrorMessage;
      }
    });
    Object.defineProperty(exports, "InteractionRequiredAuthError", {
      enumerable: true,
      get: function() {
        return msalCommon.InteractionRequiredAuthError;
      }
    });
    Object.defineProperty(exports, "LogLevel", {
      enumerable: true,
      get: function() {
        return msalCommon.LogLevel;
      }
    });
    Object.defineProperty(exports, "Logger", {
      enumerable: true,
      get: function() {
        return msalCommon.Logger;
      }
    });
    Object.defineProperty(exports, "PromptValue", {
      enumerable: true,
      get: function() {
        return msalCommon.PromptValue;
      }
    });
    Object.defineProperty(exports, "ProtocolMode", {
      enumerable: true,
      get: function() {
        return msalCommon.ProtocolMode;
      }
    });
    Object.defineProperty(exports, "ResponseMode", {
      enumerable: true,
      get: function() {
        return msalCommon.ResponseMode;
      }
    });
    Object.defineProperty(exports, "ServerError", {
      enumerable: true,
      get: function() {
        return msalCommon.ServerError;
      }
    });
    Object.defineProperty(exports, "TokenCacheContext", {
      enumerable: true,
      get: function() {
        return msalCommon.TokenCacheContext;
      }
    });
    exports.ClientApplication = ClientApplication;
    exports.ClientAssertion = ClientAssertion;
    exports.ConfidentialClientApplication = ConfidentialClientApplication;
    exports.CryptoProvider = CryptoProvider;
    exports.NodeStorage = NodeStorage;
    exports.PublicClientApplication = PublicClientApplication;
    exports.TokenCache = TokenCache;
    exports.buildAppConfiguration = buildAppConfiguration;
  }
});

// node_modules/@azure/msal-node/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/@azure/msal-node/dist/index.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_msal_node_cjs_production_min();
    } else {
      module2.exports = require_msal_node_cjs_development();
    }
  }
});

// netlify/functions/calenderEvents.ts
__export(exports, {
  handler: () => handler
});
var import_node_fetch = __toModule(require_lib());

// src/utils/functionUtils.ts
var import_msal_node = __toModule(require_dist2());
var msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AAD_ENDPOINT + process.env.TENANT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }
};
var tokenRequest = {
  scopes: [process.env.GRAPH_ENDPOINT + ".default"]
};
var apiConfig = {
  uri: process.env.GRAPH_ENDPOINT + "v1.0/users/" + process.env.CALENDAR_USER + "/calendars",
  uriCal: process.env.GRAPH_ENDPOINT + "v1.0/users/" + process.env.CALENDAR_USER + "/calendars/" + process.env.CALENDAR_ID + "/events?" + process.env.CALENDAR_OPTIONS
};
var cca = new import_msal_node.default.ConfidentialClientApplication(msalConfig);
async function getToken(tokenRequest2) {
  return await cca.acquireTokenByClientCredential(tokenRequest2);
}

// netlify/functions/calenderEvents.ts
var callApi = (uri, accessToken) => {
  return (0, import_node_fetch.default)(uri, { headers: { Authorization: `Bearer ${accessToken}` } });
};
var handler = async (event, context) => {
  try {
    const authResponse = await getToken(tokenRequest);
    const apiResponse = await callApi(apiConfig.uriCal, authResponse.accessToken);
    const jsonData = await apiResponse.json();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: jsonData })
    };
  } catch (error) {
    console.log("Graph Error: ", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/*! @azure/msal-common v4.5.0 2021-07-22 */
//# sourceMappingURL=calenderEvents.js.map
