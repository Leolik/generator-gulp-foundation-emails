'use strict';

var mkdirp = require('mkdirp');
var generators = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');

module.exports = class extends generators {
  constructor(args, opts) {
    super(args, opts);
  }
  initializing() {
    this.pkg = require('../package.json');
    this.version = this.pkg.version;
  }
  prompting() {
    this.log(chalk.yellow(require('yosay')('Welcome to Gulp Foundation Emails generator. Good luck!')));
    
    return this.prompt([{
      type: 'input',
      name: 'name',
      message: 'What\'s name of this email template?',
      default: this.appname
    }, {
      type: 'list',
      name: 'emailTemplate',
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
        name: 'Password Reset',
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
      name: 'htmlFramework',
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
      }, {
        name: 'HEML',
        value: 'heml'
      }],
      default: 0
    }, {
      when: function(answers) {
        return answers.htmlFramework !== 'heml'
      },
      type: 'confirm',
      name: 'sass',
      message: 'Would you like to use SCSS for css precompilation?',
      default: true
    }]).then((answers) => {
      this.answers = { 
        ...answers,
        sass: answers.sass || false,
        kebabName: _.kebabCase(answers.name)
      }
    });
  }

  configuring() {
    config: () => {
      this.config.save();
    }
  }

  writing() {
    // readme.md
    this.fs.copyTpl(
      this.templatePath('_readme.md'),
      this.destinationPath('readme.md'),
      {
        ...this.answers,
        version: this.version
      }
    );

    // images folder
    mkdirp('app/images');

    // package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {...this.answers}
    );

    // gulpfile.js
    if (this.answers.htmlFramework !== 'heml') {
      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {...this.answers}
      );
    }

    // templates
    switch (this.answers.htmlFramework) {
      case 'pug':
        this.fs.copy(
          this.templatePath('email_templates/pug/layouts'),
          this.destinationPath('app/template/layouts')
        );
        this.fs.copy(
          this.templatePath('email_templates/pug/components'),
          this.destinationPath('app/template/components')
        );
        this.fs.copy(
          this.templatePath('email_templates/pug/' + this.answers.emailTemplate + '.pug'),
          this.destinationPath('app/template/index.pug')
        );
        break;
      case 'inky':
        this.fs.copy(
          this.templatePath('email_templates/inky/layouts'),
          this.destinationPath('app/template/layouts')
        );
        this.fs.copy(
          this.templatePath('email_templates/inky/' + this.answers.emailTemplate + '.html'),
          this.destinationPath('app/template/index.html')
        );
        break;
      case 'heml':
        this.fs.copy(
          this.templatePath('email_templates/heml/' + this.answers.emailTemplate + '.heml'),
          this.destinationPath('app/index.heml')
        );
        break;
      default:
        this.fs.copy(
          this.templatePath('email_templates/' + this.answers.emailTemplate + '.html'),
          this.destinationPath('app/index.html')
        );
    }

    // styles
    if (this.answers.htmlFramework !== 'heml') {
      if (this.answers.sass) {
        this.fs.copy(
          this.templatePath('scss'),
          this.destinationPath('app/styles/scss')
        );
      } else {
        this.fs.copy(
          this.templatePath('css/foundation.css'),
          this.destinationPath('app/styles/css/foundation.css')
        );
        this.fs.copy(
          this.templatePath('css/main.css'),
          this.destinationPath('app/styles/css/main.css')
        );
      }
    }

    // extras
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};