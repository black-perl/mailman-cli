Exploiting js prototypes & accessors
-----------------------------------
Suppose `MC` is the analogous class to mailman.client's `Client` class ( https://github.com/black-perl/mailman-cli/blob/master/cli.js#L32 ). Then we can use JavaScript protoypes to have something like this:

        > client.lists()
        
by registering things to the `MC` prototype like:

        MC.prototype.lists = function( options ) {
        	options = options || {};
        	options = extend( options, this._options );
        	return new ListsRequest( options );
        };
        
This illustrates the comparison between http://bazaar.launchpad.net/~mailman-coders/mailman.client/trunk/view/head:/src/mailmanclient/_client.py#L155 and https://github.com/black-perl/mailman-cli/blob/master/cli.js#L76.

Now if it is required to be a property, we can easily achieve this by writting a **getter** or a **setter** as our requirement:

        MC.prototype = {
            get lists(options) {
                options = options || {};
            	options = extend( options, this._options );
            	return new ListsRequest( options );
            	}
            };

