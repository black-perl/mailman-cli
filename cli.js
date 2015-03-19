"use strict";
/**
 * A Mailman REST API client for Node.js
 *
 * @module mailman-cli 
 * @module main
 *
 **/

var extend = require( 'node.extend' );

var defaults = {
	username: 'restadmin',
	password: 'restpass'
};

// Pull in request module constructors
var ListsRequest = require( './lib/lists' );


/**
 * The base constructor for the Mailman API service
 *
 * @class MC
 * @constructor
 * @param {Object} options An options hash to configure the instance
 * @param {String} options.endpoint The URI for a Mailman REST API endpoint
 * @param {String} [options.username] A MC-API Basic Auth username
 * @param {String} [options.password] A MC-API Basic Auth password
 */

function MC( options ) {

	// Enforce `new`
	if ( this instanceof MC === false ) {
		return new MC( options );
	}

	this._options = extend( {}, defaults, options );

	if ( ! this._options.endpoint ) {
		throw new Error( 'options hash must contain an API endpoint URL string' );
	}

	// Ensure trailing slash on endpoint URI
	this._options.endpoint = this._options.endpoint.replace( /\/?$/, '/' );

	return this;
}

/**
 * Convenience method for making a new MC instance
 *
 * @example
 * These are equivalent:
 *
 *     var client = new MC({ endpoint: 'http://my.blog.url/some-json' });
 *     var client = MC.site( 'http://my.blog.url/some-json' );
 *
 * @method site
 * @static
 * @param {String} endpoint The URI for a MC-API endpoint
 * @return {MC} A new MC instance, bound to the provided endpoint
 */
MC.site = function( endpoint ) {
	return new MC({ endpoint: endpoint });
};

/**
 * Start a request against the `/lists` endpoint
 *
 * @method lists
 * @param {Object} [options] An options hash for a new ListsRequest
 * @return {ListsRequest} A ListsRequest instance
 */
MC.prototype.lists = function( options ) {
	options = options || {};
	options = extend( options, this._options );
	return new ListsRequest( options );
};

module.exports = MC;