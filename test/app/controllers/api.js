'use strict';

var expect = require('chai').expect;

var api = require('../../../app/controllers/api');

describe('api routes', function() {
  it('should load', function() {
    expect(api).to.be.a('function');
  });
});
