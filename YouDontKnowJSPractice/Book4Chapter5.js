//testing nested object destructure -- from mozilla docs
//format is {from:{from2: ... {fromn:to}}}
function objectDestructureTest() {
    var obj = {op:'+', left:{val:2}, right:{val:2}};
    var {left:{val:lside}, op:op, right:{val:rside}} = obj;
    console.log(lside, op, rside);
}
objectDestructureTest();//2+2

//my guess for operater precedence exercise
//precedence || > && > ?:
/*var a = 42;
var b = "foo";
var c = false;
a && b || c ? c || b ? a : c && b : a
42 && "foo" || false ? false || "foo" ? 42 : false && "foo" : 42
42 && "foo" ? "foo" ? 42 : false && "foo" : 42
"foo" ? "foo" ? 42 : false : 42
"foo" ? 42 : 42
42
//no && has higher precedence
false && true || true  - returns true

a && b || c ? c || b ? a : c && b : a
42 && "foo" || false ? false || "foo" ? 42 : false && "foo" : 42
"foo" || false ? false || "foo" ? 42 : false : 42
"foo" ? "foo" ? 42 : false : 42*/

//tests side effects from expressions in cases
function switchSideEffectTest() {
    switch(true) {
        case console.log("first"):
            break;
        case console.log("second") == undefined:
            console.log("fourth");
            break;
        case console.log("third"):
            break;
    }
}

switchSideEffectTest();//first second fourth -- evaluates statements in order until a match is found