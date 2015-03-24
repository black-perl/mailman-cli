"use strict";
/**
 * 
 * @module mailman-cli 
 * @module utils
 *
 **/

// Some client side filters

/**
 * A filter to return list with maximum members
 *
 * @param {Object} data JSON data from the server
 */

function maxMembers(data) {
	var listArr = data.entries;
	var entries = 0; // total number of list entries in the JSON response
	var maxCount = 0; // maximum number of members in the list
	var arrLength = data.total_size;
	var modEntries = new Array(); // modified entries
	// first find the maximum number of members
	for ( var ctr = 0 ; ctr < arrLength ; ctr++ )
	{
		var listObj = listArr[ctr];
		if ( listObj.member_count >= maxCount )
			maxCount = listObj.member_count;
	}
	// now add these members to the modEntries array
	for ( var ctr = 0 ; ctr < arrLength ; ctr++ )
	{
		var listObj = listArr[ctr];
		if ( listObj.member_count == maxCount ) // match found
		{
			modEntries.push(listArr[ctr]);
			entries++;
		}
	}
	// modify the Response
	data.total_size = entries;
	data.entries = modEntries;
	return data;
}

module.exports.maxMembers = maxMembers;