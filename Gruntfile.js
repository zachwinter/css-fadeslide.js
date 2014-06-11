module.exports = function (grunt) {
	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/* <%= pkg.name %>\n Last Updated: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>-v<%= pkg.version %>.min.js'
			}
		},
		jshint: {
			options: {
				jshintrc: true,
			},
			files: ['src/<%= pkg.name %>.js']
		}
	});
	
	// Load Tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	// Register the Default task to run
	grunt.registerTask('default', ['jshint', 'uglify']);
};