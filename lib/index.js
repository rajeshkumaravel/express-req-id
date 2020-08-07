'use strict';

const uuid = require('./_uuid');
const cuid = require('./_cuid');

const libs = {
  uuid: uuid,
  cuid: cuid
};

module.exports = function (params) {
  if (params && params.type && libs.hasOwnProperty(params.type)) {
    return libs[params.type](params);
  } else {
    throw new Error('Invalid identifier type. Allowed types [uuid, cuid]');
  }
};
