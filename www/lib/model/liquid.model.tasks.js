
/**
 * A Sample Model for Tasks. 
 * 
 * 
 * This file requires the following to be included:
 * 
 * @requires cordova.js (Phonegap library)
 * @requires jquery.js (jquery library)
 * @requires gapi-client.min.js (google API JS Client)
 * @requires liquid.js (The Base library)
 * @requires liquid.helper.oauth.js (the oauth helper method)
 * 
 *  
 * Google APIs Explorer (for the class/json names of google api)
 * https://developers.google.com/apis-explorer/
 * 
 * @author Abdullah Rubiyath
 * @author Hossain Khan
 *  
 * @copyright Liquid Labs Inc.
 * 
 */

/**
 * Adds a Model called Tasks (for Google Tasks)
 * to the model attribute/property of liquid
 * 
 * @param model The Model of liquid to be extended from.
 */
(function(model) {
	
   model.tasks = {
   
	   isGapiLoaded : false,
	   tasklistId: '@default', // All users has default list 
	   gapiConfig: liquid.config.gapi,
		   
	   
	   /**
	    * Loads the Google API and then invokes the callback. It checks if the
	    * library is already loaded or not. If its already loaded, it simply 
	    * invokes the callback, else, loads Google API and invokes the callback
	    * 
	    * @param {Function} callback The callback function to be invoked after
	    *                            loading of Google API is complete.
	    */
	   loadGapi : function(callback) {
		   var $this = model.tasks;
			alert('hello  world 7');

		   if ($this.isGapiLoaded) {
				alert('hello  world 8');
   callback();		   
		   }
		   else {
				alert('hello world 9');
   /* load the google api and then invoke callback */
			   gapi.client.load('tasks', 'v1', function() {
					alert('hello  world a');
   		$this.isGapiLoaded = true;
				   		if (callback) {
				   			callback();
				   		}
			   		}
			   );
		   }
	   },
	   
	   
	   /**
	    * Gets the list of Tasks associated with a TaskList
	    * Reference: 
	    * https://developers.google.com/google-apps/tasks/v1/reference/tasks/list
	    * 
	    * Uses Google API to Connect to Google's Server
	    * 
	    * @param callback A callback function which is invoked when data is received
	    *                 from Google's Server.
	    * 
	    */
	   getList: function(callback) {
		   var $this = model.tasks;
			alert('hello  world 5');

		   liquid.helper.oauth.getAccessToken(function(tokenObj) {
				alert('hello world 6');
   
			   console.log('Access Token >> ' + tokenObj.access_token);
				alert('hello world 6a '+tokenObj.access_token);
 /* at first set the access Token */
				gapi.auth.setToken({
					access_token: tokenObj.access_token
				});
				alert('hello world 6b');

				$this.loadGapi(function() {
					var request = gapi.client.tasks.tasks.list({
					  	tasklist: $this.tasklistId, // tasklist id
					});
					
					request.execute(callback);			
	  			});
		   });
		   
	   },
	   
	   	   
	} // end of liquid.model.tasks

})(window.liquid.model);
