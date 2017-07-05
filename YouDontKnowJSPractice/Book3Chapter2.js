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

function calledByNewDifferences() {
    console.log(this);//window for call if called directly ex: from global, empty foo object for new.  No surefire way to tell the difference by using this
    //return {"a":5};//returned for both
    //return 32;//returns 32 if not new, same for non objects
}

//better than passing in null -- prevents suprise things going to global -- also potentially testable for developer mistakes
DMZ = Object.create(null);

//assignments don't count as direct calls
var test = { foo: function() {if (this === window) {console.log("Alert this is global.");}}}
var test2;
(test2.foo = test.foo)();
