'use strict';

var expect = require('chai').expect;

var diagram = require('../../../app/models/diagram');

describe('diagram', function() {
  it('should load', function() {
    expect(diagram).to.be.a('function');
  });
});
