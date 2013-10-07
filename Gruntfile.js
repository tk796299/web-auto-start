var path      = require('path'),
    lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function(connect, point) {
  return connect.static(path.resolve(point));
};

var os = require("os");
var local_ip = (function(){
                  var arr = os.networkInterfaces();
                  for(item in arr){
                    if(arr[item][1]['family']=='IPv4' && arr[item][1]['address']!='127.0.0.1'){
                      var ip = (arr[item][1]['address']);
                    }
                  }
                  return ip; 
                })(),
    port     = '9000';


module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      debug: {
        options: {
          "pretty":true,
          data: {
            debug: true,
            timestamp: "<%= new Date().getTime() %>"
          }
        },
        files: {
          "index.html": "index.jade"
        }
      }
    },
    sass: {
      dist: {
        options:{
          "debugInfo":true
        },
        files: {
          'css/main.css': 'css/main.sass',
        }
      }
    },
    watch:{
        scripts:{
            files:['./{,*/,*/*/}*.js'],
            tasks:['concat:js']
        },
        css:{
            files:['./{,*/,*/}*.{scss,sass}'],
            tasks:['sass']
        },
        html:{
          files:['*.jade'],
          tasks:['jade']
        },
        livereload: {
          files: ['*.html','css/{,*/,*/*/}*.css','js/{,*/,*/*/}*.js'],
          tasks:['livereload']
        }
    },
    connect: {
      options:{
        port: port,
        hostname: local_ip,
      },
      livereload: {
        options: {
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)];
          }
        }
      }
    },
    open: {
        server:{
            path: 'http://'+local_ip+':'+port
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('default', [
    'jade',
    'sass',
    'livereload-start',
    'connect',
    'open',
    'watch',
  ]);


};






