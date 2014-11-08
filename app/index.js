var generator = require('yeoman-generator'),
    log = console.log;

var MyBase = generator.Base.extend({
  helper: function() {
    log('this is also a helper method');
  }
});

//module.exports = MyBase.extend({
  //exec: function() {
    //this.helper();
  //}
//});

module.exports = generator.Base.extend({

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
      log('initializing: method1');
    },
    method2: function() {
      log('initializing: method2');
    }
  },

  prompting: {
    /*
     *where you call this.prompt()
     */
    method1: function() {
      log('called from prompting');
    }
  },

  configuring: {
    /*
     *saving configurations and configure the project
     */
  },

  default: {
    method1: function() {
      log('hello yo');
    }
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
  },

  end: {
    //called last
  }

});
