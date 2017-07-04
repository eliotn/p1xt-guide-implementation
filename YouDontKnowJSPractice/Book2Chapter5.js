//simple infinite closure counter that shields its variables
{
	let s = 0;
	(function exampleClosure() {
		setTimeout(exampleClosure, 100); 
		s = s + 1;
		console.log(s);
	})();
}

//improper for loop with closures
{
	(function() {for (var i = 0; i < 5; i++) {
		setTimeout(function () { console.log(i), 100;}, 100*i);
	}})();
}

//to make it work, have let reset the variable for that block if there is no progression or enclose
//in another lexical block ex:
{
        (function() {for (var i = 0; i < 5; i++) {
                (function() { var j = i; setTimeout(function () { console.log(j), 100;}, 100*i)}());
        }})();
}

//example of a module
function module(counter) {
	function inc() {
		counter++;
	}
	function print() {
		console.log(counter);
	}
	print.inc = inc;
	return print;
}

