module.exports = function(grunt) {

grunt.initConfig({
    jasmine_nodejs: {
        // task specific (default) options
        options: {
            specNameSuffix: "spec.js", // also accepts an array
            useHelpers: false,
            // configure one or more built-in reporters
            reporters: {
                console: {
                    colors: true,
                    cleanStack: true,
                    verbose: true
                },
                junit: {
                    savePath: "./reports",
                    filePrefix: "junit-report",
                    consolidate: true,
                    useDotNotation: true
                },
                nunit: {
                    savePath: "./reports",
                    filename: "nunit-report.xml",
                    reportName: "Test Results"
                },
                teamcity: false,
                tap: false
            },
            // add custom Jasmine reporter(s)
            customReporters: []
        },
        your_target: {
            // target specific options
            options: {
                useHelpers: true
            },
            // spec files
            specs: [
                "spec/**"
            ]
        }
    }
});
grunt.loadNpmTasks('grunt-jasmine-nodejs');

  grunt.registerTask('default', ['jasmine_nodejs']);
};

