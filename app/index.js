var yeoman = require('yeoman-generator'),
    util = require('util'),
    path = require('path'),
    chalk = require('chalk');

var Generator = module.exports = function Generator() {
  yeoman.generators.Base.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }
  this.appname = this._.slugify(this._.humanize(this.appname));
  this.log(this.appname);

  this.sourceRoot(path.join(__dirname,'../templates'));

};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askForBower = function askForBower() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'bowercomponents',
      message: 'where do you want to save your bower files',
      default: 'bower_components'
    }, function(answers) {
      this.bowercomponents = answers.bowercomponents;
      done();
    }.bind(this));
}

Generator.prototype.packageFiles = function packageFiles() {
    this.src.copy('common/root/_editorconfig', '.editorconfig');
    this.src.copy('common/root/_gitignore', '.gitignore');
    this.template('common/root/_bowerrc', '.bowerrc');
};



yeoman.generators.NamedBase.extend({


  constructor: function(args, options) {
    yeoman.generators.NamedBase.apply(this, arguments);
    this.argument()['name'];
    console.log(this['name']);
  },
   /*
    *each method directly attached to a generator prototype is considered to be an action
    *each action is run in sequence by yeoman envrioment run loop
    *in other words, each method returned by Object.getPrototypeOf(Generator) will be automatically run
    */
   promptTask2: function() {
     var done = this.async();
     this.prompt({
       type: 'input',
       name: 'name',
       message: 'Your project name',
       default: this.appname
     }, function(answers) {
       this.log(answers.name);
       done();
     }.bind(this));
   },

  /*
   *private methods

   prefix method name by _ is considered to be a private methods
   */
  _helpMethod: function() {
    log('this is a help method');
  },

  /*
   *lifecycle
   */
  initializing: {
    method1: function() {
      this.log('initializing: method1');
    },
    method2: function() {
      this.log('initializing: method2');
    }
  },

  prompting: {
    /*
     *where you call this.prompt()
     */
    method1: function() {
      this.log('called from prompting');
    }
  },

  configuring: {
    /*
     *saving configurations and configure the project
     */
  },


  writing: {
    /*
     *where you writing the generator files
     */
  },

  install: {
    /*
     *where installation are run (npm, bower)
     */
    method3: function(){
      this.log('install dependences now...');
    }
  },

  default: {
    method1: function() {
      this.sourceRoot(path.join(__dirname,'../templates'));
      this.copy('root/_editorconfig', '.editorconfig');
    }
  },

  end: {
    //called last
    installingLodash: function() {
      var done = this.async();
      this.log('install lodash');
      this.npmInstall(['lodash'], {'saveDev': true}, done);
      //this.bowerInstall();
      //this.installDependencies()
      // make sure spawnmethod method inside the end queue, users don't want to wait for an installation command to complete
      //this.spawnCommand('composer', ['install']);
    }
  }

});
