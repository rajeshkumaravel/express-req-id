# express-req-id
[![NPM version][npm-image]][npm-url] ![express-req-id](https://github.com/rajeshkumaravel/express-req-id/workflows/express-req-id/badge.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/rajeshkumaravel/express-req-id/badge.svg?branch=master)](https://coveralls.io/github/rajeshkumaravel/express-req-id?branch=master)

- Generate CUID / UUID for express request and add it to `X-Request-Id` header.
- In case request contains `X-Request-Id` header, uses its value instead.
- By default identifer value is added to response header

# Quickstart

**1. Install**

```
$ npm install --save express-req-id
```

**2. Example**

```js
var express       = require('express');
var app           = express();
var expressreqid  = require('express-req-id')({
  type: 'cuid'  // `uuid` or `cuid`
});

app.use(expressreqid);

app.listen(3001, () => {
  console.log('Server running on port 3001');
});


app.get('/test', (req, res, next) => {
  res.send(req.id).status(200);
});

// UUID v4
// curl localhost:3001/test
// 5257f2f6-d826-4e57-8bcd-bcec01dac732

// CUID
// curl localhost:3001/test
// ckdjyjj9200008se21jd9dy4z
```

# API

### express-req-id([options])

Returns either `uuid` or `cuid` middleware and appends to request object

#### Options

|  |  |  |
| --- | --- | --- |
| type | Specifies type of identifier `uuid` or `cuid` | **required**
| headerKey | Custom key to be used in request | default `id` |
| headerName | Existing reference of key in request body to be used | default `X-Request-Id` |
| uuidVersion | RFC version to be used by uuid | default `v4` |

# License

The express-req-id is licensed under the MIT License. See LICENSE for more information.

[npm-url]: https://npmjs.org/package/express-req-id
[npm-image]: http://img.shields.io/npm/v/express-req-id.svg
