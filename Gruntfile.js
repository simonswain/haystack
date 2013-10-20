"use strict";

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: '<json:package.json>',
    jshint: {
      files: ['Gruntfile.js',
              'public/js/**/*.js'
             ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['lint']);


};
