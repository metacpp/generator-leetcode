'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('name', {
      type: String,
      required: true,
      desc: 'LeetCode project name in C++ for LeetCode.'
    });

    this.option('description', {
      type: String,
      required: false,
      desc: 'Description of LeetCode project in C++.'
    });

    this.option('authorName', {
      type: String,
      required: false,
      desc: 'Author\'s name.'
    });
  }

  initializing() {
    this.props = {
      name: _.kebabCase(this.options.name),
      description: this.options.description,
      version: '0.0.0',
      authorName: this.options.authorName
    };
  }

  prompting() {
    const prompts = [];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  configuring() {}

  default () {
    this.composeWith(require.resolve('generator-license/app'), {
      name: this.props.authorName
    });

    this.composeWith(require.resolve('../shared'));
  }

  writing() {
    this._generateDynamicFiles();
    this._generateStaticFiles();
  }

  conflicts() {}

  install() {}

  end() {
  }

  _generateStaticFiles() {
    this.fs.copy(
      this.templatePath('third_party/CMakeLists.txt'),
      this.destinationPath('third_party/CMakeLists.txt')
    );
  }

  _generateDynamicFiles() {
    // run_alltests.cc
    this.fs.copyTpl(
      this.templatePath('src/run_alltests.cc'),
      this.destinationPath('src/run_alltests.cc'), {
        authorName: this.props.authorName
      }
    );

    // CMakeLists.txt
    this.fs.copyTpl(
      this.templatePath('CMakeLists.txt'),
      this.destinationPath('CMakeLists.txt'), {
        projectName: this.props.name
      }
    );

    // README.md
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        projectName: this.props.name
      }
    );
  }
};
