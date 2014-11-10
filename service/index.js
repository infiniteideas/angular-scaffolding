'use strict';

var yeoman = require('yeoman-generator'),
    util = require('util'),
    path = require('path'),
    chalk = require('chalk');

var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }
  this.appname = this._.slugify(this._.humanize(this.appname));
  this.log(this.appname);
  this.log(this.name);

  this.sourceRoot(path.join(__dirname,'../templates'));

};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.hello = function hello() {
  this.log('hello');
};
Generator.prototype.createController = function hello() {
  this.template('scripts/javascript/services/service.js', 'app/feature/featureService.js');
};
