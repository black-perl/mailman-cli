"use strict";
/*
	@module mailman-cli
	@submodule ListsRequest 
*/
var CollectionRequest = require( './shared/collection-request' );
var inherit = require( 'util' ).inherits;

/**
 * ListsRequest extends CollectionRequest to handle the /lists API endpoint
 *
 * @class ListsRequest
 * @constructor
 * @extends CollectionRequest
 * @param {Object} options A hash of options for the ListsRequest instance
 * @param {String} options.endpoint The endpoint URI for the invoking MC instance
 * @param {String} [options.username] A username for authenticating API requests
 * @param {String} [options.password] A password for authenticating API requests
 */
function ListsRequest( options ) {
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
	 * Query parameters should be dealt with in a pythonic way
	 * @property _filters
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._filters = {};

	/**
	 * A hash of non-filter query parameters because some query filters are used for non query purposes
	 * Query parameters like count,page etc.
	 * @property _params
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._params = {};

	/**
	 * A hash of values to assemble into the API request path
	 * eg. member or moderator etc.
	 * @property _path
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._path = {};

	/**
	 * The URL template that will be used to assemble endpoint paths
	 * Dynamically put values in the _path variable once they are set by the property calls
	 *
	 * @property _template
	 * @type String
	 * @private
	 * @default 'lists'
	 */
	this._template = 'lists(/:listId)(/roster/:action)(/:actionId)';

	/**
	 * @property _supportedMethods
	 * @type Array
	 * @private
	 * @default [ 'head', 'get', 'post' ]
	 */
	this._supportedMethods = [ 'head', 'get', 'post' ];
	/* post method may not be supported yet becuse we are not actually going to create lists */
}

inherit( ListsRequest, CollectionRequest );

/**
 * A hash table of path keys and regex validators for those path elements
 *
 * @property _pathValidators
 * @type Object
 * @private
 */
ListsRequest.prototype._pathValidators = {

	/**
	 * list_id and action_id must be a valid email addresses
	 * => TODO: list_ids cannot use @ 
	 * @property _pathValidators.id
	 * @type {RegExp}
	 */
	actionId: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 
	// actionId: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,

	/**
	 * Action must be one of 'member', 'moderator', or 'owner'
	 * Want to retrieve some particulars
	 *
	 * @property _pathValidators.action
	 * @type {RegExp}
	 */
	action: /(moderator|owner|member)/
};


// TODO : member, moderator and etc retrieval should work only in the case of list_id is set

/**
 * Specify a list_id ID to query
 *
 * @method id
 * @chainable
 * @param {Number} id The ID of the list to retrieve
 * @return {ListsRequest} The ListsRequest instance (for chaining)
 */
ListsRequest.prototype.listId = function( id ) {
	this._supportedMethods = [ 'head', 'get', 'post' ];
	this._path.listId = id || null;

	if ( this._path.listId ) {
		this._supportedMethods = [ 'head', 'get', 'put', 'post', 'delete' ];
	}

	return this;
};


/**
 * Specify that we are retrieving List Members
 *
 * Will return list of all the members of the lists in the list collection
 * 
 * First of all the list collections should be filtered by using list_id
 *
 * @method members
 * @chainable
 * @param memberId
 * @return {PostsRequest} The PostsRequest instance (for chainin)
 */
ListsRequest.prototype.members = function( memberId ) {
	this._path.action = 'member';
	this._path.actionId = memberId || null;
	this._supportedMethods = [ 'head', 'get'];

	return this;
};

/**
 * Specify that we are retrieving List Owners 
 *
 * Will return list of all the members of the lists in the list collection
 * 
 * First of all the list collections should be filtered by using list_id
 *
 * @method owner
 * @chainable
 * @param ownerId => TODO : Don't know whether such thing is available or not
 * @return {ListsRequest} The ListsRequest instance (for chainin)
 */
ListsRequest.prototype.owner = function( ownerId ) {
	this._path.action = 'owner';
	this._path.actionId = ownerId || null;
	this._supportedMethods = [ 'head', 'get'];

	return this;
};

/**
 * Specify that we are retrieving List Moderators
 *
 * Will return list of all the moderators of the lists in the list collection
 * 
 * First of all the list collections should be filtered by using listId
 *
 * @method moderators
 * @chainable
 * @param moderatorId => TODO : Don't know whether such thing is available or not
 * @return {PostsRequest} The PostsRequest instance (for chainin)
 */
ListsRequest.prototype.moderators = function( moderatorId ) {
	this._path.action = 'moderator';
	this._path.actionId = moderatorId || null;
	this._supportedMethods = [ 'head', 'get'];

	return this;
};

module.exports = ListsRequest;

