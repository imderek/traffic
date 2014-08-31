module.exports = (grunt) ->
  grunt.initConfig {
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'build/<%= pkg.name %>.js': ['src/*.coffee']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  }

  # plugins
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-uglify')

  # default tasks
  grunt.registerTask('default', ['coffee', 'uglify'])