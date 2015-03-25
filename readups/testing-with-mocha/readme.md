I wrote a few tests for the `/lib/lists.js`. These can be found here : https://github.com/black-perl/mailman-cli/blob/master/test/lists.tests.js.

Running tests:


	$ npm test


Output:

	> mailman-cli@0.0.1 test /home/ank/Desktop/mailman-cli
	> mocha -R spec



	  mailman.lists
	    constructor
	      ✓ should create a ListsRequest instance 
	      ✓ should set any passed-in options 
	      ✓ should default _options to {} 
	      ✓ should intitialize instance properties 
	      ✓ should inherit ListsRequest from CollectionRequest 
	      ✓ should inherit prototype methods from both ancestors 
	    _pathValidators
	      ✓ defines validators for id and action 
	    query methods
	      ✓ provides a method to set the ID 
	      ✓ should update the supported methods when setting ID 
	      ✓ provides a method to get the owner information for a list 
	      ✓ should update the supported methods when querying for owner 
	      ✓ provides a method to get the members information for a list 
	      ✓ should update the supported methods when querying for members 
	      ✓ provides a method to get the owner information for a post 
	      ✓ should update the supported methods when querying for moderators 


	  15 passing (10ms)


