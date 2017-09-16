'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: false,
      desc: 'LeetCode project name'
    });
  }

  initializing() {
    this.props = {
      name: this.options.name || this.appname
    };
  }

  _askForProjectName() {
    return askName({
      type: 'input',
      name: 'name',
      message: 'LeetCode project Name',
      filter: _.kebabCase,
      validate(str) {
        return str.length > 0;
      }
    }, this).then(answer => {
      this.props.name = answer.name || this.props.name;
    });
  }

  _askFor() {
    const prompts = [{
      type: 'input',
      name: 'description',
      message: 'Description of LeetCode project.',
      when: !this.props.description
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Author\'s name.',
      when: !this.props.authorName,
      store: true
    }, {
      type: 'list',
      name: 'langType',
      message: 'Choose the language for your project.',
      choices: ['cpp', 'dotnet', 'js'],
      default: 'cpp',
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    })
  }
  
  prompting() {
    return this._askForProjectName()
      .then(this._askFor.bind(this));
  }

  configuring() {
  }

  default() {
    switch(this.props.langType) {
      case 'cpp':
      this.composeWith(require.resolve('../cpp'), {
        name: this.props.name,
        description: this.props.description,
        license: this.props.license,
        authorName: this.props.authorName
      });
      break;

      case 'dotnet':
      throw '.net is not supported yet.'

      case 'js':
      throw 'javascript is not supported yet.'

      default:
      throw 'Invalid language type.';
    }
  }

  writing() {
  }

  conflicts() {
  }

  install() {
  }

  end() {
    this.log('Thanks for using generator for LeetCode.');
  }
};
