module.exports = function(grunt) {

  'use strict';

  if (!grunt.option('filename')) {
    grunt.option('filename', 'ordering.client.js');
  }
  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: [
          'src/3rdparty/hmac-md5.js',
          'src/intro.js',
          'src/Config.js',
          'src/HttpClient.js',
          'src/Product.js',
          'src/ProductPrice.js',
          'src/Order.js',
          'src/ShoppingCart.js',
          'src/outro.js'
        ],
        dest: 'build/<%= grunt.option("filename") %>'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['build/<%= grunt.option("filename") %>'],
        dest: 'build/<%= grunt.option("filename").replace(".js", ".min.js") %>'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      core: {
        src: 'src/<%= grunt.option("filename") %>.js'
      },
      test: {
        src: 'test/*.js'
      },
      grunt: {
        src: 'Gruntfile.js'
      }
    },
    qunit: {
      files: [
      ]
    },
    jasmine: {
      src: 'test/behavior/*.js',
      options: {
        specs: ['test/test.js'],
        outfile: 'test/behavior/SpecRunner.html',
        keepRunner: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']); // [ 'concat', 'qunit', 'jasmine']

};