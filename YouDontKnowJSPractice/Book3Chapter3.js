//6 basic types of false
var exhibit = 0;
exhibit = false;
exhibit = "";
exhibit = null;
exhibit = undefined;
exhibit = Object.create(null);//correction even an object with no props is true

//other types - first 3 become primitives unless you use new
exhibit = new String("Not the string.");
exhibit = new Number(42);
exhibit = new Boolean(false);
exhibit = new Object(null);//still has the prototype
exhibit = new Function(false);//just a function with false inside, doesn't do anything
exhibit = new Array([]);
exhibit = new Date();//current date
exhibit = new RegExp();// regular expression is /(?:)/ on chrome
exhibit = new Error("This is not an error.");

//simple duplicator, but how do I get the deep copy?
JSON.parse(JSON.stringify([1, 2, 3]));

var obj = Object.create(null);
Object.defineProperty(obj, "notenumerable", {value:"ok", writable:false, configurable:false, enumerable:false});
Object.defineProperty(obj, "enumerable", {value:"only me", writable:false, configurable:false, enumerable:true});
for (i in obj) {
	console.log(i, obj[i]);
}

//forever alone - only way to leave is to assign a different object
//preventExtensions -> seal(not configurable) -> freeze(not writable)
var foreverAlone = Object.create(null);
Object.freeze(foreverAlone);

//even though its frozen its date property can change
var dateObj = Object.create(null);
Object.defineProperty(dateObj, "date", {get: function() { return new Date(); }, enumerable: true});
Object.freeze(dateObj);

//opposite day -- two wrongs make a right ;)
var opposites = {
	_false: true,
	_true: false,
	get false() {
		return this._true;
	},
	set false(val) {
		this._true = !val;
		this._false = !!val;
	},
	get true() {
		return this._false;
	},
	set true(val) {
		this._false = !val;
		this._true = !!val;
	}
}

//custom iterator flipflops X times
function FlipFlop(X) {
	var myObject = Object.create(null);
	Object.defineProperty(myObject, Symbol.iterator, {
		enumerable: false,
		writable: false,
		configurable: true,
		value: function() {
			var idx = 0;
			return {
				next: function() {
					return {
						value: idx++%2 == 1,
						done: idx > 2*X
					};
				}
			};
		}
	});
	return myObject;
}
//the test
for (var v of FlipFlop(3)) {
	console.log(v);
}

var fibbonachi = {
	[Symbol.iterator]: function() {
		var f0 = 0
		var f1 = 1;
		return {
			next: function() {
				let returnval = f0;
				var tmp = f1;
				f1 = f0 + f1;
				f0 = tmp;
				return { value: returnval };
			}
		}
	}
};

var fib1000 = [];
for (var n of fibbonachi) {
	fib1000.push(n);
	if (fib1000.length === 1000) break;
}
