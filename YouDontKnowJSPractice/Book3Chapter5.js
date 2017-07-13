//experimentation -- returns a function not the number -- this can be misleading
//but the function is in the __prototype__
var aNumber = Object.create(Number);

//3 assignment cases
var proto = { a : "old"};
var case1 = Object.create(proto);
case1.a = "new";
console.log(case1.a);//new
console.log(case1.__proto__.a);//old
Object.defineProperty(proto, "a", {"writable":false});
var case2 = Object.create(proto);
case2.a = "new";
console.log(case2.a);//Reference Error
var proto2 = { set a(val) { console.log("setter called"); this.__a__ = val + " setter called";}};
var case3 = Object.create(proto2);
case3.a = "new";//setter called
console.log(case3.__a__);//new setter called

console.log((function(){console.log(this)}).bind(null).prototype);//undefined twice
var a = (function(){console.log(this);}).bind(null);
console.log(new a().prototype);//still no prototype, but this is now not bound

