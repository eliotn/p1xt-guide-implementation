//mixin at random
//random hybrid between the two strategies: overwrite, or don't copy
function mixinRandom( sourceObj, targetObj ) {
	for (var key in sourceObj) {
		if (!(key in targetObj) || Math.random() < 0.5) {
			targetObj[key] = sourceObj[key];
		}
	}
	return targetObj;
}
