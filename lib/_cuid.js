'use strict';

var cuid = require('cuid');

module.exports = function (options) {
  options = options || {};
  options.headerKey   = options.headerKey || 'id';
  options.headerName  = options.headerName || 'X-Request-Id';

  return function (req, res, next) {
    req[options.headerKey] = req.headers[options.headerName.toLowerCase()] || cuid();
    res.setHeader(options.headerName, req[options.headerKey]);
    next();
  };
};
