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

//simple duplicator.  Will not be able to deep copy but works pretty well
function duplicate(_obj) {
	return JSON.parse(JSON.stringify(_obj));
}
var a = {1:2, 3:4, 5:6};
var b = duplicate(a);
b[3] = 5;
console.log(b[3]);//5
console.log(a[3]);//4

var obj = Object.create(null);
Object.defineProperty(obj, "notenumerable", {value:"ok", writable:false, configurable:false, enumerable:false});
Object.defineProperty(obj, "enumerable", {value:"only me", writable:false, configurable:false, enumerable:true});
for (i in obj) {
	console.log(obj[i]);//only me
}

//forever alone - only way to leave is to assign a different object
//preventExtensions -> seal(not configurable) -> freeze(not writable)
var foreverAlone = Object.create(null);
Object.freeze(foreverAlone);

//even though its frozen its date property can change
var dateObj = Object.create(null);
Object.defineProperty(dateObj, "date", {get: function() { return new Date(); }, enumerable: true});
Object.freeze(dateObj);
console.log(dateObj.date);//current date

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

//custom iterator flipflops X times before being done
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

//iterates through fibbonachi numbers infinitely
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
