'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },
  initializing: function () {
    this.pkg = require('../package.json');
    this.version = this.pkg.version;
    this.currentYear = (new Date()).getFullYear();
  },
  
  prompting: function () {
    if (!this.options['skip-welcome-message']) {
      this.log(chalk.yellow(require('yosay')('Welcome to Gulp Foundation Emails generator. Good luck!')));
    }
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What\'s name of this email template?',
        default: this.appname
      }, {
        type: 'list',
        name: 'template',
        message: 'Please, choose your template (http://foundation.zurb.com/emails/email-templates.html)',
        choices: [{
          name: 'Boilerplate',
          value: 'boilerplate'
        }, {
          name: 'Basic',
          value: 'basic'
        }, {
          name: 'Drip',
          value: 'drip'
        }, {
          name: 'Hero',
          value: 'hero'
        }, {
          name: 'Marketing',
          value: 'marketing'
        }, {
          name: 'Newsletter',
          value: 'newsletter'
        }, {
          name: 'Newsletter 2',
          value: 'newsletter2'
        }, {
          name: 'Order',
          value: 'order'
        }, {
          name: 'Password',
          value: 'password'
        }, {
          name: 'Sidebar',
          value: 'sidebar'
        }, {
          name: 'Sidebar Hero',
          value: 'sidebar-hero'
        }, {
          name: 'Welcome',
          value: 'welcome'
        }],
        default: 0
      }, {
        type: 'list',
        name: 'framework',
        message: 'Please, choose your HTML templating language?',
        choices: [{
          name: 'Plain HTML',
          value: 'html'
        }, {
          name: 'Pug (Jade)',
          value: 'pug'
        }, {
          name: 'Inky + Panini',
          value: 'inky'
        }],
        default: 0
      }, {
        type: 'confirm',
        name: 'sass',
        message: 'Would you like to use SCSS for css precompilation?',
        default: true
      }
    ]).then(function (answers) {
        this.name = answers.name;
        this.kebabName = _.kebabCase(this.name);
        this.emailTemplate = answers.template;
        this.htmlFramework = answers.framework;
        this.sass = answers.sass;
    }.bind(this));
  },

  configuring: {
    config: function () {
      this.config.save();
    }
  },

  writing: {
    readme: function() {
      this.template('_readme.md', 'readme.md');
    },
    
    app: function() {
      mkdirp('app/images');
    },
    
    package: function() {
      this.template('_package.json', 'package.json');
    },
    
    gulpfile: function() {
      this.template('_gulpfile.js', 'gulpfile.js');
    },
    
    mailTemplates: function() {
      switch (this.htmlFramework) {
        case "pug":
          this.directory('email_templates/pug/layouts', 'app/template/layouts');
          this.directory('email_templates/pug/components', 'app/template/components');
          this.copy('email_templates/pug/' + this.emailTemplate + '.pug', 'app/template/index.pug');
          break;
        case "inky":
          this.directory('email_templates/inky/layouts', 'app/template/layouts');
          this.copy('email_templates/inky/' + this.emailTemplate + '.html', 'app/template/index.html');
          break;
        default:
          this.copy('email_templates/' + this.emailTemplate + '.html', 'app/index.html');
      }
      // if (this.htmlFramework === "pug") {
      //   this.directory('email_templates/pug/layout', 'app/template/layout');
      //   this.directory('email_templates/pug/components', 'app/template/components');
      //   this.copy('email_templates/pug/' + this.emailTemplate + '.pug', 'app/template/index.pug');
      // } else {
      //   this.copy('email_templates/' + this.emailTemplate + '.html', 'app/index.html');
      // }
    },
    
    styles: function() {
      if (this.sass) {
        this.directory('scss', 'app/styles/scss');
      } else {
        this.copy('css/foundation.css', 'app/styles/css/foundation.css');
        this.copy('css/main.css', 'app/styles/css/main.css');
      }
    },
    
    extras: function() {
      this.copy('gitignore', '.gitignore');
      this.copy('editorconfig', '.editorconfig');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'],
      bower: false
    });
  }
});