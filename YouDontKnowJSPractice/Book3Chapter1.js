//threading an object with the this construct
function a() {
    function b() {
        console.log(this);
    }
    b.call(this);//if you do b() here you get the window object
}
(function() {
    var test = {"message":"I am being threaded with the this construct"};
    a.call(test);
})();

//the way programmers think about this in OO programming is real.
(function() {
    var a = {"hi": (function() {console.log(this);})}; a.hi();})();

//this will coerce numbers and similar types to objects, but undefined and null will become this
(function () {
    function test() {
        console.log(this);
    }
    test.call(42);//number obj
    test.call("HI there!");//string obj
    test.call(false);//Boolean obj
    test.call(undefined);//window
    test.call(null);//window
}());


