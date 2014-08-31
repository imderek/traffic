module.exports = (grunt) ->
  grunt.initConfig {
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'build/javascripts/<%= pkg.name %>.js': ['src/javascripts/*.coffee']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/javascripts/<%= pkg.name %>.js',
        dest: 'build/javascripts/<%= pkg.name %>.min.js'
      }
    }
  }

  # plugins
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  # default tasks
  grunt.registerTask('default', ['coffee', 'uglify'])