'use strict';
/**
 * @module MC
 * @submodule CollectionRequest
 * 
 */
var MCRequest = require( './mailman-request' );
var _ = require( 'lodash' );
var extend = require( 'node.extend' );
var inherit = require( 'util' ).inherits;
var qs = require( 'qs' );

/**
 * CollectionRequest extends MCRequest with properties & methods for filtering collections
 * via query parameters. It is the base constructor for most top-level MC instance methods.
 *
 * @class CollectionRequest
 * @constructor
 * @extends MCRequest
 * @extensionfor ListsRequest
 * @extensionfor DomainsRequest
 * @param {Object} options A hash of options for the CollectionRequest instance
 * @param {String} options.endpoint The endpoint URI for the invoking MC instance
 * @param {String} [options.username] A username for authenticating API requests
 * @param {String} [options.password] A password for authenticating API requests
 */
function CollectionRequest( options ) {
	/**
	 * Configuration options for the request such as the endpoint for the invoking MC instance
	 * @property _options
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._options = options || {};

	/**
	 * A hash of filter values to parse into the final request URI
	 * @property _filters
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._filters = {};


	/**
	 * A hash of non-filter query parameters
	 * TODO: discussed earlier
	 *
	 * @property _params
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._params = {};

	/**
	 * A hash of values to assemble into the API request path
	 *
	 * @property _path
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._path = {};

	/**
	 * The URL template that will be used to assemble endpoint paths
	 *
	 * @property _template
	 * @type String
	 * @private
	 * @default ''
	 */
	this._template = '';

	/**
	 * An array of supported methods; to be overridden by descendent constructors
	 * @property _supportedMethods
	 * @type Array
	 * @private
	 * @default [ 'head', 'get', 'put', 'post', 'delete' ]
	 */
	this._supportedMethods = [ 'head', 'get', 'put', 'post', 'delete' ];
}

inherit( CollectionRequest, MCRequest );

// Private helper methods
// ======================

/**
 * Utility function for sorting arrays of numbers or strings.
 *
 * @param {String|Number} a The first comparator operand
 * @param {String|Number} a The second comparator operand
 * @return -1 if the values are backwards, 1 if they're ordered, and 0 if they're the same
 */
function alphaNumericSort( a, b ) {
	if ( a > b ) {
		return 1;
	}
	if ( a < b ) {
		return -1;
	}
	return 0;
}

// Prototype Methods
// =================

/**
 * Process the endpoint query's filter objects into a valid query string.
 * Nested objects and Array properties are rendered with indexed array syntax.
 *
 * @example
 *     _renderQuery({ p1: 'val1', p2: 'val2' });  // ?p1=val1&p2=val2
 *     _renderQuery({ obj: { prop: 'val' } });    // ?obj[prop]=val
 *     _renderQuery({ arr: [ 'val1', 'val2' ] }); // ?arr[0]=val1&arr[1]=val2
 *
 * @private
 *
 * @method _renderQuery
 * @return {String} A query string representing the specified filter parameters
 */
CollectionRequest.prototype._renderQuery = function() {
	// Build the full query parameters object
	var queryParams = extend( {}, this._params );

	queryParams.filter = extend( {}, this._filters);

	// Parse query parameters object into a query string, sorting the object
	// properties by alphabetical order (consistent property ordering can make
	// for easier caching of request URIs)
	var queryString = qs.stringify( queryParams )
		.split( '&' )
		.sort()
		.join( '&' );

	// Prepend a "?" if a query is present, and return
	return ( queryString === '' ) ? '' : '?' + queryString;
};

/**
 * Set a parameter to render into the final query URI.
 *
 * @method param
 * @chainable
 * @param {String|Object} props The name of the parameter to set, or an object containing
 *                              parameter keys and their corresponding values
 * @param {String|Number|Array} [value] The value of the parameter being set
 * @param {Boolean} [merge] Whether to merge the value (true) or replace it (false, default)
 * @return {CollectionRequest} The CollectionRequest instance (for chaining)
 */
CollectionRequest.prototype.param = function( props, value, merge ) {
	merge = merge || false;

	// We can use the same iterator function below to handle explicit key-value pairs if we
	// convert them into to an object we can iterate over:
	if ( _.isString( props ) && value ) {
		props = _.object([[ props, value ]]);
	}

	// Iterate through the properties
	_.each( props, function( value, key ) {
		var currentVal = this._params[ key ];

		// Simple case: setting for the first time, or not merging
		if ( ! currentVal || ! merge ) {

			// Arrays should be de-duped and sorted
			if ( _.isArray( value ) ) {
				value = _.unique( value ).sort( alphaNumericSort );
			}

			// Set the value
			this._params[ key ] = value;

			// Continue
			return;
		}

		// value and currentVal must both be arrays in order to merge
		if ( ! _.isArray( currentVal ) ) {
			currentVal = [ currentVal ];
		}

		if ( ! _.isArray( value ) ) {
			value = [ value ];
		}

		// Concat the new values onto the old (and sort)
		this._params[ key ] = _.union( currentVal, value ).sort( alphaNumericSort );
	}.bind( this ));

	return this;
};


/**
 * Specify key-value pairs by which to filter the API results 
 *
 * @method filter
 * @chainable
 * @param {String|Object} props A filter property name string, or object of name/value pairs
 * @param {String|Number|Array} [value] The value(s) corresponding to the provided filter property
 * @return {CollectionRequest} The CollectionRequest instance (for chaining)
 */
CollectionRequest.prototype.filter = function( props, value ) {
	// convert the property name string `props` and value `value` into an object
	if ( _.isString( props ) && value ) {
		props = _.object([[ props, value ]]);
	}

	this._filters = extend( this._filters, props );

	return this;
};

module.exports = CollectionRequest;
