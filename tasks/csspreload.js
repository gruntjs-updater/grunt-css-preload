/*
 * grunt-css-preload
 * https://github.com/arcanis/grunt-css-preload
 *
 * Copyright (c) 2015 Maël Nison
 * Licensed under the MIT license.
 */

'use strict';

function findUrls( obj ) {

    if ( obj[ 0 ] === 'uri' ) {

        var url = obj[ 1 ][ 1 ];

        if ( obj[ 1 ][ 0 ] === 'string' )
            url = url.substr( 1, url.length - 2 );

        return url;

    } else {

        var urls = [ ];

        for ( var t = 1; t < obj.length; ++ t )
            urls = urls.concat( findUrls( obj[ t ] ) );

        return urls;

    }

};

module.exports = function ( grunt ) {

    grunt.registerMultiTask( 'csspreload', 'Automatically add an image preload rule to your stylesheets.', function ( ) {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options( {
            extraUrls : [ ],
            extensions : [ '.png', '.jpg', '.jpeg', '.bmp', '.gif' ],
            selector : 'body:after',
            extendSource : true
        } );

        var checkExtension = function ( url ) {
            var extension = require( 'path' ).extname( require( 'url' ).parse( url ).pathname );
            return options.extensions.indexOf( extension.toLowerCase( ) ) !== -1;
        };

        // Iterate over all specified file groups.
        this.files.forEach( function ( f ) {

            // Concat specified files.
            var src = f.src.filter( function ( filepath ) {

                if ( grunt.file.exists( filepath ) )
                    return true;

                // Warn on and remove invalid source files (if nonull was set).
                grunt.log.warn( 'Source file "' + filepath + '" not found.' );
                return false;

            } ).map( function ( filepath ) {

                // Read file source.
                return grunt.file.read( filepath );

            } ).join( grunt.util.linefeed );

            // Parse the resulting stylesheet
            var ast = require( 'gonzales-pe' ).cssToAST( src );

            // Find the urls from the document
            var urls = findUrls( ast );

            // Exclude the urls that have weird extensions
            urls = urls.filter( checkExtension );

            // Adds manually-defined urls
            urls = urls.concat( options.extraUrls );

            // Generate the rule
            var content = urls.map( function ( url ) { return '    url(' + url + ')'; } ).join( '\n' );
            var rule = urls.length > 0 ? options.selector + ' {\n  content:\n' + content + ';\n  display: none;\n}\n' : '';

            // Write the destination file.
            var output = options.extendSource ? src + '\n' + rule : rule;
            grunt.file.write( f.dest, output );

            // Print a success message.
            grunt.log.writeln( 'File "' + f.dest + '" created.' );

        } );

    } );

};
