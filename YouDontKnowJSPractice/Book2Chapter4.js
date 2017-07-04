//Everything hoisted


a();
function a() {
	b = 2;
}
console.log(b);
var a;
var b;

unknown2();
function unknown2() {
	console.log("I'm hoisted first");
}
unknown2 = function() {
	console.log("After here, you will be able to see me");
}
function unknown2() {
	console.log("I'm hoisted and override the other function!");
}
unknown2();
var unknown2;
