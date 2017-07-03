//Illustrating differences between lhs and rhs the cool way
//LHS = pushed to the scope.  RHS = referenced from the scope
function foo(a) {//a is LHS, defining foo is neither
	var b = a;//a is RHS, b is LHS
	return a + b;//a and b are RHS
}

var c = foo( 2 );//foo is RHS, c is LHS

//each var is defined by how many times it is read and written to by scope
var LHS0TimesRHS0Times;//by default it is undefined, but this variable never touches scope
var LHS1TimeRHS0Times = 3 + 1 - 2;//assigned to scope once, never read
var LHS2TimesRHS0Times = 5 % 7 + 2;//assigned to scope two times, never read
//etc.

//compiler handles function definition, so no run-time assignment
function LHS0TimesRHS1Time(LHS1TimeRHS1Times) {
	return LHS1TimeRHS1Times;
}

function LHS0TimesRHS2Times(LHS2TimesRHS2Times) {
	var LHS1TimeRHS2Times = LHS2TimesRHS2Times * 2;
	LHS2TimesRHS2Times = LHS1TimeRHS2Times + 42;
	return LHS1TimeRHS2Times + LHS2TimesRHS2Times;
}

LHS2TimesRHS0Times = LHS0TimesRHS1Time(LHS0TimesRHS2Times(LHS0TimesRHS2Times(1)));



