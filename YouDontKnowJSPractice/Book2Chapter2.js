//vars are copied over from the different scopes
//this is a slightly more interesting demonstration

function attemptToPrint(label, a1, a2, a3) {
	console.log("Analyzing " + label + "...");
	if (a1 != undefined) { console.log(a1); }
	if (a2 != undefined) { console.log(a2); }
	if (a3 != undefined) { console.log(a3); }
}

//note -- you can't use a variable where its not defined
var inGlobalScope = "You should see me everywhere, I am in the global scope.";
function level1() {
	var inLevel1 = "I am only visible from anywhere from within level 1.";
	function level2() {
		var inLevel2 = "You need to be in level 2 to see me.";
		attemptToPrint("level2", inGlobalScope, inLevel1, inLevel2);
	}
	attemptToPrint("level1", inGlobalScope, inLevel1);
	level2();
}
attemptToPrint("global", inGlobalScope);
level1();

//shadow example
var shadowme = "I am in the global scope, window is key to find me.";
function shadows(shadowme) {
	console.log(shadowme);
	console.log(window.shadowme);
}
shadows("I cast a shadow over the global scope.");

//will produce an error under strict mode
function modifyGlobal() {
	eval("globalvar = 'Globalvar successfully modified';");
}
var globalvar = "Uh oh...";
modifyGlobal();
console.log(globalvar);

//the perils of using with, restricted by strict mode
var blankobj = {};
var important = "1,1,2,3,5,8,13,21";
with (blankobj) {
	important = "No"
}
console.log(important);
