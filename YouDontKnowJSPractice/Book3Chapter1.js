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

//another way to pass this, have something call its own variable.  This confuses programmers.
(function() {
    var a = {"hi": (function() {console.log(this);})}; a.hi();});

//this will coerce numbers and similar types to objects, but call has no effect on this for null/undefined args
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


