'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AppsSchema = new Schema({
  name: String,
  description: String,
  active: Boolean,
  uuid: String,
  uri: String,
  raxTenant: String
});

module.exports = mongoose.model('Apps', AppsSchema);