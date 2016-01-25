module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		clean : {
			build : ["build", "dist", "bower_components"]
		},

		 concat : {
			js : {
			   files : 
			   	{
			   		'staging/base.min.js' : [ 'bower_components/jquery/dist/jquery.min.js', 'bower_components/angular/angular.min.js', 'bower_components/bootstrap/dist/bootstrap.min.js'],
			   		'staging/dependencies.min.js' : ['bower_components/**/*.min.js', '!bower_components/jquery/**/*.js', '!bower_components/angular/**/*.js', '!bower_components/bootstrap/**/*.js'],
					'staging/<%= pkg.name %>.js' : ['src/**/*.js']
				}
			},
			all_js : {
				files : {
					'dist/js/<%= pkg.name %>.js' : ['stagins/base.min.js', 'staging/dependencies.min.js', 'staging/<%= pkg.name%>.js']
				}
			},
			css : {
				files :
				{
					'staging/base.min.css' : ['bower_components/bootstrap/dist/css/*.min.css']
				}
			},
			all_css : {
				files : {
					'dist/css/<%= pkg.name %>.css' : ['staging/base.min.css', 'src/**/*.css']
				}
			}
		},

		cssmin : {
			target : {
				files : [{
					expand : true,
					cwd : 'dist/css/',
					src : '*.css',
					dest : 'dist/css',
					ext : '.min.css'
				}]
			}
			
		},

		uglify: {
			options: {
                compress: true,
                mangle: true,
                sourceMap: true
            },
			target: {
				src : 'dist/js/<%= pkg.name %>.js',
				dest : 'dist/js/<%= pkg.name %>.min.js'
			 }
		},

		copy : {
			target : { 
				expand: true,
				cwd : 'src/',
				src: ['**/*', '!**/*.js', '!**/*.css'], 
			  	dest : 'dist/', 
			},
			fonts : {
				src : 'bower_components/bootstrap/dist/fonts/*',
				dest : 'dist/fonts'
			}
		},

		rsync : {
			options : {
				args : ["--verbose"],
				recursive: true
			},
			dist : {
				options : {
					src: "dist/",
					dest: "/var/www/html",
					delete: true
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-bower');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-concat');
	grunt.loadNpmTasks('grunt-rsync');

	grunt.registerTask('default', ['bower', 'concat', 'cssmin', 'uglify', 'copy']);
	grunt.registerTask('build', ['default']);
	grunt.registerTask('deploy', ['rsync']);
};
