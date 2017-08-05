//simple literal random number generator
function *rng() {
	while(true) {
		yield Math.random() * 100;
	}
}

//Me solving the exercise - b should be 18?
//s2 b = 1 s2 s1 a = 2 s2 a = 9 s1 b = 9 s1 a = 12 s2 b = 24
//I am confused about the last statement -- simpler generator example to test
//the following tests are tested with a global variable a
//interleaved as a = 1 tgen = test() a = 2 tgen.next() a = 3 tgen.next(0)

//Program to solve number of possible orderings:
//copy of setup from you don't know js
var a = 1; var b = 2;
function step(gen) {
	var it = gen();var last;
	return function() {
		last = it.next( last ).value;
	};
}
function *foo() {
	a++;
	yield;
	b = b * a;
	a = (yield b) + 3;
}
function *bar() {
	b--;
	yield;
	a = (yield 8) + b;
	b = a * (yield 2);
}

var order = {};
function testCalls(nBeforeStep2) {
	a = 1; b = 2;
	var step1 = step(foo); var step2 = step(bar)
	for (var i = 0; i < nBeforeStep2.length; i++) {
		if (i > 0) step2();
		for (var j = 0; j < nBeforeStep2[i]; j++) {
			step1();
		}
	}
	return [a, b];
}
//another algorithm
//[5, 0, 0, 0]
//[4, 1, 0, 0]
//..
//[0, 5, 0, 0]
//[4, 0, 1, 0]
//idea for expansion into a more general algorithm:
//if the slot has limited capacity, attempt a transfer from the first element,
//propagate upwards, then reset slots
function *generateCombinations(objects, slots) {
	var buckets = [];
	var number;
	var furthestindex = 1;
	for (var i = 0; i < slots; i++) {
		buckets[i] = 0;
	}//setup buckets
	//initial state: array
	if (slots <= 0) {
		yield [];
		return;
	}
	buckets[0] = objects;
	yield buckets;
	//algorithm: shift 1 from the leftmost value 1 to the right then
	//return everything else on that value to 0
	while (buckets[slots-1] < objects) {
		for (var i = 0; i < slots; i++) {
			if (buckets[i] > 0) {
				number = buckets[i];
				buckets[i+1] = buckets[i+1] + 1;
				buckets[i] = 0;
				buckets[0] = number - 1;
				break;
			}
		}
		yield buckets;
	}
}

//simpler algorithm with nested for loops
function *generatePossibilities() {
	var possibilities = [0, 0, 0, 0, 0];
	var alreadyExplored = {};
	for (var i = 0; i < 5; i++) {
		for (var j = i; j < 5; j++) {
			for (var k = j; k < 5; k++) {
				possibilities = [0, 0, 0, 0, 0]
				possibilities[i] += 1;
				possibilities[j] += 1;
				possibilities[k] += 1;
				var values = testCalls(possibilities);
				if (!(String(values) in alreadyExplored)) {
					alreadyExplored[String(values)] = 1;
					yield values;
				}
			}
		}
	}
}

function generatorLen(gen) {
	var it = step(gen);
	for (var length = 0; gen(it) != 0; length++) {
		
	}
	length = 3;
}



