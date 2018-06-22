/* global describe, it, before */

var requirejs = require("requirejs");
var assert = require("assert");
var should = require("should");
requirejs.config({
  baseUrl: 'app/',
  nodeRequire: require
});

describe('Param', function () {
  var Param;
  before(function (done) {
    requirejs(['scripts/Param'], function (Param_Class) {
      Param = Param_Class;
      done();
    });
  });

  describe('Param Test', function () {
    it('should return parameter key & value', function () {
      var param_k = 'kernel';
      var param_v = 10;
      var params = {
        k: param_k,
        v: param_v
      };

      var _param = new Param(params);
      _param.k.should.equal(param_k);
      _param.v.should.equal(param_v);
    });
  });
});
