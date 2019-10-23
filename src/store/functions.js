/**
 * Filter an array of objects to get the most frequent element
 *
 * @param {Object[]} arr The array of objects
 * @param {String} keyname The name that will be used to filter the objects
 * @returns {Array}
 */
export function getMostFrequent(arr, keyname) {
	// Store how many times each element appears
	let lookup = {};
	for (let i = 0; i < arr.length; i++) {
		const key = arr[i][keyname];
		if (lookup[key] === undefined) lookup[key] = 0; // Insert if not available yet
		lookup[key]++;
	}
  
	// Transform that into an sortable array
	let sortableLookup = [];
	for (let o in lookup) {
		sortableLookup.push([o, lookup[o]]);
	}
  
	// Sort the elements
	let result = sortableLookup.sort((a, b) => b[1] - a[1]);
  
	// Get one of the most frequent
	let best = result[0];
  
	// Filter by `keyname` to get the most frequent words
	result = result.filter(el => el[1] === best[1]).map(el => el[0]);
  
	return result;
  }