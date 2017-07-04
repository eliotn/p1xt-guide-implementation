//hiding can be important
var sideeffects = "Nah, trust me";
console.log(sideeffects);
test();
//what if there was an infinite loop with "Print this"?
console.log(sideeffects);
function test() {
	//try without var with peril -- or you can hide with a different
	//variable
	var sideeffects = "Print this";
	console.log(sideeffects);
}

var ExampleLibrary = {
	add: function(a, b) { return a + b;},
	sub: function(a, b) { return a - b;},
	mult: function(a, b) { return a * b;},
	div: function(a, b) { return a / b;}
}

//I cant be accessed after my job, I am a temp worker
//anonymous function thats self contained
//helps to have a name for debugging
(function tempJob(n) {
	console.log(n);
	if (n > 0) {
		tempJob(n-1);
	}
})(3);

//other form, moves parenthesis 
(function test() {console.log(42);}());

//be careful with this -- however setting undefined seems to silently fail in chrome console
undefined = true;
console.log((function test(undefined) { return undefined; })());

//let for previous ESes
try {
        throw Exception();
}
catch (err) {
	err = "Set let value here";
        console.log("In block scope " + err);
}
console.log(err);//doesn't work

//randomblock
{let onlyhere = "This block is where I live"; console.log(onlyhere);} console.log(onlyhere);
