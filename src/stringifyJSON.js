// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
	//obj check function called at end of function if necessary!
	var isObject = function(a) {
    	return (!!a) && (a.constructor === Object);
	};
	
	if (obj === null) {
		return 'null';
	}
	else if (typeof(obj) === 'number') {
		return obj.toString();
	}
	else if (typeof(obj) === 'string') {
		return "\""+obj+"\"";
	}
	else if (typeof(obj) === 'boolean') {
		return obj.toString();
	}
	else if (Array.isArray(obj)) {
		var stringifyArr = [];
		if (obj.length > 0) {
			for (var i = 0; i < obj.length; i++) {
				// console.log(obj[i])
				var strung = stringifyJSON(obj[i]);
				stringifyArr.push(strung);
			}
			return '[' + stringifyArr + ']';
		}else {
			return '[]';
		}
	}else if (isObject(obj)) {
		var key = [];
		var value = [];
		for (var prop in obj) {
			console.log(typeof(obj[prop]))
			if (obj[prop] === undefined || typeof(obj[prop]) === 'function') {
				continue;
			}
			key.push(prop);
			value.push(obj[prop]);
		}
		var objStrung = stringifyObj(key, value);
		return '{' + objStrung + '}';
	}
};

var stringifyObj = function(keyArr, valArr) {
	var objString = '';
	for (var i =0; i < keyArr.length; i++) {
		objString += stringifyJSON(keyArr[i]) + ':' + stringifyJSON(valArr[i]);
		if (keyArr.length > 1) {
			objString += ',';
		}
	}
	if (keyArr.length > 1) {
		objString = objString.slice(0, -1);
	}

	return objString;
}
  // your code goes here



// // console.log(typeof(null))