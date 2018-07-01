// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
/*
	IN ORDER TO RUN EVERYTHING CORRECTLY YOU MUST RUN => jsonCall('your json')
		Only works for whole numbers and normal strings, no special character checks!!
		I was too lazy to implement them 
*/

var parseJSON = function(json) {
	//assign index and create first instance of 'ch' variable
	var index = 0;
	var ch = json[index]; 


	var nextChar = function() {
		//returns the next character in a JSON string; also increments the index
		index++;
		var tracker = index;

		// if the event the index goes too far, just return false
		if (tracker > json.length) {
			return false;
		}
		//assigns next ch element
		ch = json.charAt(index);

		return ch;
	};

	//value: (string | number | object | array | (true | false) | null)
	var value = function() {
		//this function is called on every necessary character; returns a value assignment
		// console.log(ch, 'about to roll on through nigga')
		if (ch === '{') {
			return objects();
		} else if (ch === '[') {
			return arrays();
		} else if (ch === '\"') {
			return strings();
		} else if (ch === 't' || ch === 'f') {
			return boolCatch();
		} else if (ch === 'n') {
			return nullHandle();
		} else if (ch && ch >= 0 && ch <= 9) {
			return numberCall();
		}
	};

	var nullHandle = function() {
		//returns null if string is null
		var nullified = '';

		if (ch === 'n') {
			nullified += ch;
			for (var i = 0; i < 3; i++) {
				nextChar();
				nullified += ch;
			} 
		}

		if (nullified === 'null') {
			nextChar();
			return null;
		} else {
			return 'no null';
		}
	};

	var boolCatch = function() {
		//returns the correct boolean value when "true" of "false" passed 
		var truthy = '';

		if (ch === 't' || ch === 'f') {
			truthy += ch;
			//increment until the comma assuming there is one 
			while (ch !== ',') {
				nextChar();
				truthy += ch;
			}
			//clean up the string by slicing the comma off
			truthy = truthy.slice(0, (truthy.length-1));
		}

		if (truthy === 'true') {
			return true;
		}

		if (truthy === 'false') {
			return false;
		} else {
			return 'bad truthy call';
		}
	};

	var numberCall = function() {
		//returns an integer value when passed an instance of a number 
		var numStr = '';
		//not sure how this piece works exactly but its from Wesley Tsai's post
		if (ch && ch >= 0 && ch <= 9) {
			var tracking = index;
			while(ch && ch >= 0 && ch <= 9) {
				numStr += ch;
				nextChar();
				tracking = index;
			}
		}

		if (!isNaN(parseInt(numStr))) {
			return parseInt(numStr);
		} 
	}

	var strings = function() {
		//returns a regular string value when a double quoted string is passed
		var stringHold = '';
		var tracker = index;
		//check for the double quote and begin its journey
		if (ch === '\"') {
			nextChar();
			stringHold += ch;
		}
		//continue traversing until another double quote is found
		while (json.charAt(index)) {
			if (ch === '\"') {
				nextChar();
				//clean up the string by slicing the last double quote off
				return stringHold.slice(0,-1);
			} else {
				nextChar();
				tracker = index;
				stringHold += ch;	
			}
		}
	};

	var arrays = function () {
		//returns an array of values
			//continuosly calls the value function as long as there are elements in the array
		var array = [];
		var val;

		if (ch !== '[') {
			return 'there is no beginning bracket'
		};

		//empty array check
		if (nextChar() === ']') {
			return array;
		}

		val = value();
		array.push(val);

		while(ch === ',') {
			//as long as there are commas, there are values that need to be assigned
			nextChar();
			val = value();
			if (val !== undefined) {
				array.push(val)
			}
		}
		nextChar();
		return array;
	}

	var objects = function() {
		//the whole shabang is an object, traverse through if there is another nested obj
		var obj = {}
		var key;
		var val;

		if (ch !== '{') {
			return 'bad object call';
		}
		//empty obj check
		if (nextChar() === '}') {
			return obj;
		}

		//assigns the first piece of the object 
		key = value();
		nextChar();
		var val = value();
		obj[key] = val;


		while (ch === ',' || ch === '}') {
			//stops the loop in order to account for the nested obj
			if (ch === '}') {
				nextChar();
				return obj;
			}
			//comma check, more shit to look for
			if (ch === ',') {
				nextChar();
			}
			key = value();

			nextChar();
			if (ch === '{') {
				var anotherObject = objects();
				return anotherObject;
			}

			val = value();
			obj[key] = val;

		}
		//last obj call, last resort? I don't really know 
		return obj;
	}
	return value();
};


function jsonCall(jsonStr) {
	//eliminates extra spaces btwn words 
	var toyed = jsonStr.replace(/\s/g, '');
	var parsed = parseJSON(toyed);
	return parsed;
}


