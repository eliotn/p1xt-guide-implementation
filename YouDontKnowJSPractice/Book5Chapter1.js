//callback utility object to ensure order -- waits until two callbacks are
//called at least limit times, then fires all callbacks
function CallbackOrder(callback1, callback2, limit) {
	var firstRuns = 0;
	var secondRuns = 0;
	function run() {
		if (firstRuns >= limit && secondRuns >= limit) {
		for (var i = 0; i < firstRuns; i++){
			callback1();
		}
		for (var i = 0; i < secondRuns; i++) {
			callback2();
		}
		firstRuns = 0;
		secondRuns = 0;
		}
	}
			
	return { callback1:(function() {
		firstRuns += 1;
		run();
		}),
		callback2: (function() {
		secondRuns += 1;
		run();
		})
	};
}
//to test


var cbord = CallbackOrder(function(arg) { console.log("First" + arg); }, function(arg) { console.log("Second" + arg);}, 2);
setTimeout(cbord.callback1("Thing #1"), 1000);
setTimeout(cbord.callback1("Thing #2"), 1000);
setTimeout(cbord.callback2("Thing #1"), 1000);
setTimeout(cbord.callback2("Thing #2"), 1000);

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
