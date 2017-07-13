//hiding can be important
var sideeffects = "Nah, trust me";
console.log(sideeffects);//Nah, trust me
test();//Print this with var in test otherwise Nah trust me


console.log(sideeffects);//Nah trust me
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
console.log(ExampleLibrary.add(1, 1));//2
console.log(ExampleLibrary.sub(1, 1));//0
console.log(ExampleLibrary.mult(2, 2));//4
console.log(ExampleLibrary.div(2, 2));//1


//I cant be accessed after my job, I am a temp worker
//anonymous function thats self contained
//helps to have a name for debugging
(function tempJob(n) {
	console.log(n);
	if (n > 0) {
		tempJob(n-1);
	}
})(3);

//other form for Immediately Invoked Function Expression moves parenthesis 
(function test() {console.log(42);}());

//be careful with this -- however setting undefined seems to silently fail in chrome console
//also c9 console detects that you are trying to shadow undefined
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
console.log(err);//Reference Error

//randomblock
{let onlyhere = "This block is where I live"; console.log(onlyhere);} console.log(onlyhere);
