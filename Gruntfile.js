module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
          // insert
        ],
        //insert
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: [
          // insert
        ]
      }
    },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '': [
            // insert
          ]
        }
      }
    },

    jshint: {
      files: [
        // insert
      ],
      options: {
        force: false,
        jshintrc: '.jshintrc',
        ignores: [
          // insert
        ]
      }
    },

    cssmin: {
      dist: {
        files: {
          //insert
        }
      }
    },

    watch: {
      scripts: {
        files: [
          // insert
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: '', // insert
        tasks: ['cssmin']
      }
    },
    
    // drops jupiter database
    'mongo-drop': {
      options: {
        dbname: 'jupitr',
        host: 'localhost'
      }
    },

    shell: {
      // seeds database with 300 records
      seeddb: {
        command: 'node db/seed-data.js 50'
      },
      
      // rebases from upstream staging
      rebase: {
        command: 'git pull --rebase upstream staging'
      },
      
      // pushes to remote origin branch
      push: {
        command: 'git push origin'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mongo-drop-task');  
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('server-prod', [
    'shell'
  ]);
  
  // seeds database with 300 records
  grunt.registerTask('seeddb', [
    'shell:seeddb'
  ]);
  
  // drops jupiter database
  grunt.registerTask('dropdb', [
    'mongo-drop'
  ]);
  
  // rebases from upstream staging
  grunt.registerTask('rebase', [
    'shell:rebase'
  ]);
  
  // pushes to remote origin branch
  grunt.registerTask('push', [
    'shell:push'
  ]);
  
  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);
  
  grunt.registerTask('run', [
    'nodemon'
  ]);

  grunt.registerTask('local', function(){
    grunt.task.run([ 'test', 'build', 'run' ]);
  });

};
