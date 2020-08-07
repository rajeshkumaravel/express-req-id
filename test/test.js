'use strict';

const chai        = require('chai');
const chaiHttp    = require('chai-http');
const uuid        = require('uuid');
const cuid        = require('cuid');
const expect      = chai.expect;
chai.use(chaiHttp);

describe('express-req-id library', function () {

  it('should throw error for not passing options', function () {
    try {
      const reqId = require('..');
      const app   = require('express')();
      app.use(reqId());
    } catch (error) {
      expect(error.message).to.eql('Invalid identifier type. Allowed types [uuid, cuid]');
    }
  });

  it('should set uuid as request id', function (done) {
    const reqId = require('..')({
      type: 'uuid'
    });
    const app   = require('express')();
    app.use(reqId);
    app.get('/', function (req, res, next) {
      expect(req).to.be.an('object');
      expect(req).to.haveOwnProperty('id');
      expect(uuid.validate(req.id)).to.be.true;
      next();
    });
    chai.request(app).get('/').end(done);
  });

  it('should set uuid as request id for custom key', function (done) {
    const customHeaderKey = 'uniqueId';
    const reqId = require('..')({
      type: 'uuid',
      headerKey: customHeaderKey
    });
    const app   = require('express')();
    app.use(reqId);
    app.get('/', function (req, res, next) {
      expect(req).to.be.an('object');
      expect(req).to.haveOwnProperty(customHeaderKey);
      expect(uuid.validate(req[customHeaderKey])).to.be.true;
      next();
    });
    chai.request(app).get('/').end(done);
  });

  it('should use existing X-Request-Id value', function (done) {
    const customHeaderKey = 'uniqueId';
    const _uuidValue = uuid.v4();
    const reqId = require('..')({
      type: 'uuid',
      headerKey: customHeaderKey
    });
    const app   = require('express')();
    app.use(reqId);
    app.get('/', function (req, res, next) {
      expect(req).to.be.an('object');
      expect(req).to.haveOwnProperty(customHeaderKey);
      expect(req[customHeaderKey]).to.eq(_uuidValue);
      expect(uuid.validate(req[customHeaderKey])).to.be.true;
      next();
    });
    chai.request(app)
      .get('/')
      .set('X-Request-Id', _uuidValue)
      .end(done);
  });

  it('should set cuid as request id', function (done) {
    const reqId = require('..')({
      type: 'cuid'
    });
    const app   = require('express')();
    app.use(reqId);
    app.get('/', function (req, res, next) {
      expect(req).to.be.an('object');
      expect(req).to.haveOwnProperty('id');
      expect(cuid.isCuid(req.id)).to.be.true;
      next();
    });
    chai.request(app).get('/').end(done);
  });

  it('should set cuid as request id for custom key', function (done) {
    const customHeaderKey = 'uniqueId';
    const reqId = require('..')({
      type: 'cuid',
      headerKey: customHeaderKey
    });
    const app   = require('express')();
    app.use(reqId);
    app.get('/', function (req, res, next) {
      expect(req).to.be.an('object');
      expect(req).to.haveOwnProperty(customHeaderKey);
      expect(cuid.isCuid(req[customHeaderKey])).to.be.true;
      next();
    });
    chai.request(app).get('/').end(done);
  });

  it('should use existing X-Request-Id value', function (done) {
    const customHeaderKey = 'uniqueId';
    const _uuidValue = cuid();
    const reqId = require('..')({
      type: 'cuid',
      headerKey: customHeaderKey
    });
    const app   = require('express')();
    app.use(reqId);
    app.get('/', function (req, res, next) {
      expect(req).to.be.an('object');
      expect(req).to.haveOwnProperty(customHeaderKey);
      expect(req[customHeaderKey]).to.eq(_uuidValue);
      expect(cuid.isCuid(req[customHeaderKey])).to.be.true;
      next();
    });
    chai.request(app)
      .get('/')
      .set('X-Request-Id', _uuidValue)
      .end(done);
  });

});
