// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className) {
	var resultArr = [];
	var entireBody = document.body;
	var elementMatch = function(element) {
		if (element.classList && element.classList.contains(className)) {
			resultArr.push(element);
		}
		if (entireBody.childNodes) {
	    	for (var i = 0; i < element.childNodes.length; i++) {
	    		elementMatch(element.childNodes[i]);
	    	}
		}
	}
	elementMatch(entireBody)
	return resultArr;
};


