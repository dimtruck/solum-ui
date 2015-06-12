'use strict';

describe('Service: App', function () {

  // load the service's module
  beforeEach(module('solumApp'));

  // instantiate service
  var App;
  beforeEach(inject(function (_App_) {
    App = _App_;
  }));

  it('should do something', function () {
    expect(!!App).toBe(true);
  });

});
