'use strict';

var uuid = require('uuid');

module.exports = function (options) {
  options.headerKey   = options.headerKey || 'id';
  options.headerName  = options.headerName || 'X-Request-Id';
  options.uuidVersion = options.uuidVersion || 'v4';

  return function (req, res, next) {
    req[options.headerKey] = req.headers[options.headerName.toLowerCase()] || uuid[options.uuidVersion](options, options.buffer, options.offset);
    res.setHeader(options.headerName, req[options.headerKey]);
    next();
  };
};
