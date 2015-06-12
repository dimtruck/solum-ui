'use strict';

var _ = require('lodash');
var request = require('request');
var yaml = require("js-yaml");
var Apps = require('./apps.model');

// Get list of apps
exports.index = function (req, res) {
  console.log('get user', req.user);

  console.log('get list of apps from solum');
  var options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/plans',
    method: 'GET',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };
  request(options, function (error, response, body) {
    if (response !== undefined && error === null) {
      switch (response.statusCode) {
        case 200:
          var data = yaml.load(body);
          console.log(data);
          var apps = [];
          return res.json(200, apps);
        case 401:
          //log out
          return handleUnauthErr(res, 'Invalid credentials');
        case 500:
          return handleError(res, 'App list retrieval failed');
        default:
          return handleError(res, 'App list retrieval failed');
      }
    } else {
      return handleError(res, 'App list retrieval failed');
    }
  });
  Apps.find({ raxTenant: req.user.raxTenant }, function (err, apps) {
    console.log('inside the thing', apps, err);
    if (err) { return handleError(res, err); }
    return res.json(200, apps);
  });
};

// Get a single app
exports.show = function (req, res) {
  Apps.findById(req.params.id, function (err, apps) {
    if (err) { return handleError(res, err); }
    if (!apps) { return res.send(404); }
    return res.json(apps);
  });
};

// Creates a new apps in the DB.
exports.create = function (req, res) {
  Apps.create(req.body, function (err, apps) {
    if (err) { return handleError(res, err); }
    return res.json(201, apps);
  });
};

// Updates an existing apps in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Apps.findById(req.params.id, function (err, apps) {
    if (err) { return handleError(res, err); }
    if (!apps) { return res.send(404); }
    var updated = _.merge(apps, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, apps);
    });
  });
};

// Deletes a apps from the DB.
exports.destroy = function (req, res) {
  Apps.findById(req.params.id, function (err, apps) {
    if (err) { return handleError(res, err); }
    if (!apps) { return res.send(404); }
    apps.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function handleUnauthErr(res, err) {
  return res.send(401, err);
}