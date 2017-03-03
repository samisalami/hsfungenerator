module.exports = function (grunt) {

  // Project configuration
  // For now no uglify, might be added later (or not implemented with Grunt)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      mainTemplate: {
        files: [{
          src: [
            'app/app.html'
          ],
          dest:'public/index.html'
        }]
      },
      images: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'app/images',
          src: [
            '**'
          ],
          dest:'public/images'
        }]
      },
      libraries: {
        files: [{
          flatten: false,
          expand: true,
          cwd: 'libraries',
          src: [
            '**'
          ],
          dest:'public/libraries'
        }]
      }
    },
    sass: {
      css: {
        options: {
          defaultEncoding: "utf-8",
          compass: true,
          style: 'nested',
          sourcemap: 'none'
        },
        files: {
          'public/css/main.css': 'app/main.scss'
        }
      }
    },
    uglify: {
      js: {
        options: {
          sourceMap: true
        },
        files: {
          'public/js/main.min.js' : ['app/**/*.js']
        }
      }
    },
    ngtemplates: {
      app: {
        cwd: 'app/',
        src: [
          '**/*.html'
        ],
        dest: 'public/js/templates.js'
      }
    }
  });

  // Load plugins
  //grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');

  // Default task(s).
  grunt.registerTask('uglify-fe', ['uglify:js']);
  grunt.registerTask('uglify-fe', ['uglify:js']);
  grunt.registerTask('sass-fe', ['sass:css']);
  grunt.registerTask('all-fe', ['sass:css', 'uglify:js', 'ngtemplates:app']);
  grunt.registerTask('build', ['sass:css', 'uglify:js','copy:mainTemplate','ngtemplates:app','copy:images','copy:libraries']);

  //watch can usually not start two tasks parallel - it works with a function and defining the config explicit for watch
  grunt.registerTask('watch-fe', function(){
    var config = {
      options: {
        interrupt: true
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['ngtemplates:app']
      },
      mainTemplate: {
        files: ['app/app.html'],
        tasks: ['copy:mainTemplate']
      },
      libraries: {
        files: ['libraries/**'],
        tasks: ['copy:libraries']
      },
      images: {
        files: ['app/images/**'],
        tasks: ['copy:images']
      },
      css: {
        files: ['app/**/*.scss'],
        tasks: ['sass:css'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['app/**/*.js'],
        tasks: ['uglify:js']
      }
    };
    grunt.config('watch', config);
    grunt.task.run('watch');
  });
};