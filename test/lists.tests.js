'use strict';
var expect = require('chai').expect;

var ListsRequest = require( '../lib/lists' );
var CollectionRequest = require( '../lib/shared/collection-request' );
var MCRequest = require( '../lib/shared/mailman-request' );

describe( 'mailman.lists' ,function(){

	describe( 'constructor' ,function(){
		var lists; // putting it in outer scope

		beforeEach(function(){
			lists = new ListsRequest();
		});

		it( 'should create a ListsRequest instance' ,function(){
			expect( lists instanceof ListsRequest ).to.be.true;
		});

		it( 'should set any passed-in options', function(){
			lists = new ListsRequest({
				booleanProp: true,
				strProp: 'Some string'
			});
			expect( lists._options.booleanProp ).to.be.true;
			expect( lists._options.strProp ).to.equal( 'Some string' );
		});

		it( 'should default _options to {}', function(){
			expect( lists._options ).to.deep.equal( {} );
		});

		it( 'should intitialize instance properties', function(){
			expect( lists._filters ).to.deep.equal( {} );
			expect( lists._path ).to.deep.equal( {} );
			expect( lists._params ).to.deep.equal( {} );
			expect( lists._template ).to.equal( 'lists(/:listId)(/roster/:action)(/:actionId)' );
			var _supportedMethods = lists._supportedMethods.sort().join( '|' );
			expect( _supportedMethods ).to.equal( 'get|head|post' );
		});

		it( 'should inherit ListsRequest from CollectionRequest', function(){
			expect( lists instanceof CollectionRequest ).to.be.true;
			expect( lists instanceof MCRequest ).to.be.true;
		});

		it( 'should inherit prototype methods from both ancestors', function(){
			// Spot-check from CollectionRequest:
			expect( lists ).to.have.property( 'filter' );
			expect( lists.filter ).to.be.a( 'function' );
			expect( lists ).to.have.property( 'param' );
			expect( lists.param ).to.be.a( 'function' );
			// From MCRequest:
			expect( lists ).to.have.property( 'get' );
			expect( lists.get ).to.be.a( 'function' );
			expect( lists ).to.have.property( '_renderURI' );
			expect( lists._renderURI ).to.be.a( 'function' );
		});

	});

	describe( '_pathValidators', function() {

		it( 'defines validators for id and action', function() {
			var lists = new ListsRequest();
			expect( lists._pathValidators ).to.deep.equal({
				actionId: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
				action: /(moderator|owner|member)/
			});
		});

	});

});