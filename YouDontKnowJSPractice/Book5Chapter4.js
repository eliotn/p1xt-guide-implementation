//simple literal random number generator
function *rng() {
	while(true) {
		yield Math.random() * 100;
	}
}