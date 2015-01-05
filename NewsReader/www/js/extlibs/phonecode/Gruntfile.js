module.exports = function(grunt) {

  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      main: {
        options: {
          style: "compact"
        },
        files: {
          'build/css/intlTelInput.css': [
            'src/css/intlTelInput.scss',
            'src/css/flags16.scss'
          ]
        }
      },
      demo: {
        files: {
          'build/css/demo.css': 'src/css/demo.scss'
        }
      }
    },

    jshint: {
      all: "src/js/**/*.js",
      options: {
        // this is for data.js which sometimes has commas on the following line
        laxcomma: true
      }
    },

    uglify: {
      options: {
        banner: '/*\n'+
          '<%= pkg.name %> \n'+
          'version: <%= pkg.version %>\n'+
          'description: <%= pkg.description %>\n'+
          'repository: <%= pkg.repository.url %>\n'+
          'license: <%= pkg.license %>\n'+
          'author: <%= pkg.author %>\n'+
          '*/\n'
      },
      dev: {
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: true
        },
        files: {
          'build/js/intlTelInput.js': ['src/js/intlTelInput.js', 'src/js/data.js']
        }
      },
      prod: {
        files: {
          'build/js/intlTelInput.min.js': ['src/js/intlTelInput.js', 'src/js/data.js']
        }
      }
    },

    watch: {
      js: {
        files: "src/js/**/*.js",
        tasks: ["jshint", "uglify:dev"]
      },
      pluginCss: {
        files: ["src/css/flags16.scss", "src/css/intlTelInput.scss"],
        tasks: "sass:main"
      },
      demoCss: {
        files: "src/css/demo.scss",
        tasks: "sass:demo"
      }
    }
  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // tasks
  grunt.registerTask('default', ['jshint']);
  // default is to build everything ready for a commit
  grunt.registerTask('all', ['jshint', 'sass:main', 'sass:demo', 'uglify:dev', 'uglify:prod']);
  // prepare everything for the demo.html
  grunt.registerTask('demo', ['jshint', 'sass:main', 'sass:demo', 'uglify:dev']);

};
