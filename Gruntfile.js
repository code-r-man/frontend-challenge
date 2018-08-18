module.exports = function(grunt) {
	
	
	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			styles: {
				files: ['production/scss/**/*.{scss,sass}'],
				tasks: ['sass:dist', 'postcss']
			},
			js: {
				files: ['production/js/**.js'],
				tasks: ['babel']
			},
			images: {
				files: ['production/**/*.{jpg,png,gif,svg,jpeg}'],
				tasks: ['imagemin']
			},
			copy: {
				files: ['production/fonts/**/*'],
				tasks: ['copy']
			},
			includes: {
				files:['production/**/*.html'],
				tasks:['includereplace']
			},
		},

		sass: {
			options: {
				sourceMap: true,
				// outputStyle: 'compressed'
			},
			dist: {
				files: {
					'dist/css/styles.css': 'production/scss/styles.scss',
				}
			}
		},

		// Autoprefixer
		postcss: {
		    options: {
				map: false, // inline sourcemaps

				processors: [
					require('autoprefixer')({browsers: 'last 10 versions'}), // add vendor prefixes
					require('cssnano')() // minify the result
				]
		    },
		    dist: {
		      src: 'dist/css/*.css'
		    }
		},

		// HTML include-replace
	  	includereplace: {
	    	dist: {
	      		files: [
	      		    {
	      		        expand: true,     // Enable dynamic expansion.
	      		        cwd: 'production/',      // Src matches are relative to this path.
	      		        src: ['*.html'], // Actual pattern(s) to match.
	      		        dest: 'dist/',   // Destination path prefix.
	      		    },
	      		],
	       	}
	  	},

  	  	// Babel
  	  	babel: {
  	  	 	options: {
  	  			sourceMap: false,
  	  			minified: true,
  	  			compact: true,
  	  			presets: ['env']
  	  		},
  	  	  	dist: {
  	  	    	files: [{
  					expand: true,
  					cwd: 'production/js',
  					src: '**/*.js',
  					dest: 'dist/js'
  				}]
  	  	  	}
  	  	},

		// Minify the JS
		uglify: {
		    my_target: {
				files: [{
				   expand: true,
				   cwd: 'dist/js',
				   src: '**/*.js',
				   dest: 'dist/js'
				}]
		    }
		},

		// Optimize images
		imagemin: {
		    dynamic: {
		        options: {
		            optimizationLevel: 3,
		            svgoPlugins: [{removeViewBox: false}],
		            // use: [mozjpeg()] // Example plugin usage
		        },
		        files: [{
		            expand: true,
		            cwd: 'production/',
		            src: ['**/*.{png,jpg,gif,svg}'],
		            dest: 'dist/'
		        }]
		    }
		},

		// Copy files {font}
		copy: {
		  main: {
		    files: [
		      // includes files within path
		      {expand: true, flatten: true, src: ['production/fonts/*'], dest: 'dist/fonts'},

		      /*// includes files within path and its sub-directories
		      {expand: true, src: ['path/**'], dest: 'dest/'},

		      // makes all src relative to cwd
		      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

		      // flattens results to a single level
		      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},*/
		    ],
		  },
		  prod: {
		    files: [
		      {expand: true, flatten: true, src: ['production/fonts/*'], dest: 'dist/fonts'},
		      {expand: true, cwd: 'production/img', src: ['**'], dest: 'dist/img'},
		    ],
		  },
		},

		// Reload pages
		browserSync: {
	        dev: {
	            bsFiles: {
	                src : [
	                    'dist/css/*.css',
	                    'dist/*.html',
	                    'dist/*.img',
	                    'dist/*.js'
	                ]
	            },
	            options: {
	                watchTask: true,
	                server: 'dist',
	                directory:true
	            }
	        }
	    }

		

	});
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-include-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
  	grunt.loadNpmTasks('grunt-babel');
  	grunt.loadNpmTasks('grunt-browser-sync');

  	// >>> Complete, v1.0
	grunt.registerTask('default',[
		'sass:dist',
		'postcss',
		'includereplace',
		// 'uglify',
		'imagemin',
		'copy',
		'browserSync',
		'watch'
	]);
  	// <<< Complete

};