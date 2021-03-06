/*
 * grunt-credentials
 * 
 *
 * Copyright (c) 2014 Jack Davis
 * Licensed under the MIT license.
 */

'use strict';
var credentialManager = require("../lib/credentialManager.js")

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('credentials', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      expand:false
    });

    var manager = new credentialManager();
    var mapRecord = [];

    Object.keys(options.providers).forEach(function(key){
      var provider = options.providers[key];
      provider.name = key;

      grunt.verbose.writeln("Found credential provider : "+provider.name);

      //Check provider has credentials object
      if(provider.credentials){
        //Add provider to grunt
        manager.addProvider(provider.name,provider.credentials,provider.map);
      }else{
        grunt.log.error("Provider '"+provider.name+"' did not have any credentials");
      }

      //Push all possible maps to array
      Object.keys(provider.map).forEach(function(mapKey){
        //Add to map record if it isn't already in there
        if(mapRecord.indexOf(key) === -1){
          mapRecord.push(mapKey);
          grunt.verbose.writeln("Found map key : "+mapKey);
        }
      });
    });

    var config = options.config;
    var credential = options.credential;


    if(options.expand){
      mapRecord.forEach(function(mapKey){
      grunt.config.set(config+"."+mapKey,manager.getCredential(mapKey));
      grunt.verbose.writeln("Setting '" + config + "'.'" + mapKey + "'");
      });
    }else{
      grunt.config.set(config,manager.getCredential(credential));
      grunt.verbose.writeln("Setting '" + config + "' to '" + credential + "'");
    }

    grunt.log.oklns("Set credentials to '"+config+"'");
  });
};
