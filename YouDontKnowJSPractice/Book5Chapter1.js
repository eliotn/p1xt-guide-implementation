//callback utility object to ensure order -- waits until two callbacks are
//called at least limit times, then fires all callbacks
function CallbackOrder(callback1, callback2, limit) {
	var firstRuns = [];
	var secondRuns = [];
	function run() {
	    if (firstRuns.length >= limit && secondRuns.length >= limit) {
		var fRunTo = firstRuns.length;
		var sRunTo = secondRuns.length;
		for (var i = 0; i < fRunTo; i++) {
		    callback1.apply(firstRuns[i][0], firstRuns[i][1]);
		}
		for (var i = 0; i < sRunTo; i++) {
		    callback2.apply(secondRuns[i][0], secondRuns[i][1]);
		}
		firstRuns = firstRuns.slice(fRunTo);
		secondRuns = secondRuns.slice(sRunTo);
		}
	}
         
    return { callback1:(function() {
	var _this = this;
	var _arguments = arguments;
	return function() {
	    firstRuns.push([_this, _arguments]);
		run();
	};
	}),
    callback2: (function() {
	var _this = this;
	var _arguments = arguments;
	return function() {
		    secondRuns.push([_this, _arguments]);
		run();
	};
    })};
}

//to test
var cbord = CallbackOrder(function(arg) { console.log("First " + arg); console.log(this); }, function(arg) { console.log("Second " + arg); console.log(this);}, 2);
var cb1 = cbord.callback1;
//this should be window
setTimeout(cb1("Thing #1"), 1000);
setTimeout(cb1("Thing #2"), 1000);
//this should be the callback order object
setTimeout(cbord.callback2("Thing #3"), 900);
setTimeout(cbord.callback2("Thing #4"), 900);

//asynchronous array processing
function AsyncMap(array, numberToProcess, cb) {
	var index = 0;
	(function process() {
		var maxindex = Math.min(index + numberToProcess, array.length);
		for (; index < maxindex; index++) {
			let curidx = index;
			array[curidx] = cb(array[curidx]);
		}
		if (maxindex < array.length) {
			setTimeout(process, 100);//makes the async easier to visualize
		}
	})(arguments);
	return array;//the array returned will be processed in place
}
//to test
var test = AsyncMap([1, 2, 3, 4, 5], 2, function(num) { console.log(num); return num+1; });
