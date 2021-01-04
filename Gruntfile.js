module.exports = function(grunt) {

    // 1. All configuration goes here


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
          dist: {
        src: [
            'js/jquery-3.2.1.min.js', 'js/main.js', 'js/lazysizes.min.js' // All JS in the js folder
        ],
        dest: 'js/build/production.js',
    }
  },
  uglify: {
      build: {
          src: 'js/build/production.js',
          dest: 'js/build/production.min.js'
      }
  },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat','uglify']);

};
