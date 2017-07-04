//simple function example to bind something as this to a function call
function callbackThis(fn, bindme) {
	return function() {
		fn.call(bindme, arguments);//remember the arguments
	}
}

//function example of modifying a function to also print out its arguments
function debugArgs(fn) {
	return function() {
		for (var i = 0; i < arguments[i]; i++) {
			console.log(arguments[i]);
		}
		fn.apply(this, arguments);
	}
}


