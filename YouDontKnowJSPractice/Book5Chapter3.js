//The middle line prints the synchronous and asynchronous return values of a value.code
//For example the following prints 24 42:
var value = 24;
new Promise(function(resolve){ resolve(value); }).then(function(oldvalue) {console.log(oldvalue, value)});
value = 42;

//function copied from You Don't Know JS book but adapted
//to create a promise that resolves or rejects after X milliseconds
function timeoutPromise(delay, willReject) {
	return new Promise( function(resolve,reject) {
		setTimeout( function() {
			if (willReject) {
				reject( "Timeout!" );
			}
			else {
				resolve(delay);
				//once resolved/rejected a promise will silently ignore future calls
				resolve();
				reject("Timeout!");
			}
        }, delay );
    } );
}

Promise.race( [
	timeoutPromise( 1000, false ),
	timeoutPromise( 2000, true ),

] )
//Accepted
.then(function() {console.log("Accepted");}, function (err) {console.log("Error:", err);})
//Acceptance confirmed - promises can be forked
.then(function() {console.log("Acceptance confirmed");}, function (err) {console.log("Error confirmed:", err);});

//Is a thenable through duck typing.  Use Promise.resolve(foo(42)).then(...)
//instead of foo(42).then(...)
function foo(x) {
	return {
		then: function(cb, evil) {
			cb(x);
			evil("Error:" + x);
        }
    }
}
//simple string concatination promise example
//without function(resolve, reject), setTimeout
//will return immediately and fulfill the promise.
var p1 = new Promise(function(resolve, reject) {setTimeout(function() {resolve("HI THERE"); }, 1000); });
var p2 = new Promise(function(resolve, reject) {setTimeout(function() {resolve("HELLO");}, 2000);});
Promise.all([p1, p2])
.then( function(msgs) {
	return new Promise(function(resolve, reject) { setTimeout(function() { resolve(msgs[0] + msgs[1]); }, 2000);});
})
.then( function(msg) {
	console.log( msg );
} );//HI THEREHELLO

//a funny example that races number of runners in
//the 2017 bolder boulder
var promises = [];
for (let i = 0; i < 49714; i++) {
	promises.push(new Promise(function(resolve, reject) {
		setTimeout(function() {resolve("Runner " + i + " makes it to the finish line first!");
		}, 4000 + 1000000*Math.random());
	}));
}
Promise.race(promises)
.then(function(msg) {
	console.log(msg);
});

//wrapping setTimeout with Promise.wrap defined in you don't know JS
Promise.wrap( function(x, cb) { setTimeout(cb, x);} );
