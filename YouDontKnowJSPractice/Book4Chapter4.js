//All Important falsy value list
//false, NaN, -0, +0, "", null, undefined
//everything else is true (unless a browser quirk)
function isFalseValue(a) {
    return (a === 0 || //-0 and +0
    a !== a || // NaN
    a === null || a === undefined 
    || a === "" || a === false);
};
isFalseValue(NaN);//true
isFalseValue(-1/Infinity);//true
isFalseValue([]);//false

//A slightly simpler version of onlyOne
function onlyOne(a, b, c) {
	return (!a && (!b != !c)) || (!!a && !b && !c);
}
onlyOne(true, false, false);//true
onlyOne(false, true, true);//false
onlyOne(false, false, true);//true

//copied from Book4Chapter1.js, used in looseEquality, avoids null bug
function realtypeof(a) {
    if (!a && (typeof a === "object")) {
        return "null";
    }
    return (typeof a)
}

//coerces an integer to a string while preserving -0
function realint(a) {
    if (a === 0 && 1/a === -Infinity) return "-0";
    if (realtypeof(a) === "number") return "" + a;
    return a;
}

//verbosely handles == for two objects
function looseEquality(a, b) {
    var types = {};
    //NaN !== NaN
    types[a !== a] = 0;
    types[b !== b] = 1;
    if ("true" in types) {
        console.log("NaN isn't equal to anything, including '" + realint(arguments[1-types["true"]]) + "'.");
        return false;
    }
    //objects go by reference for both, also functions and symbols do
    if (realtypeof(a) === realtypeof(b) && (realtypeof(a) == "function" || realtypeof(a) == "symbol" || realtypeof(a) == "object")) {
        if (a == b) {
            console.log("Both arguments are " + realtypeof(a) + "s with the same reference.");
            return true;
        }
        console.log("Both arguments are " + realtypeof(a) + "s with a different reference.");
        return false;
    }
    if (realtypeof(a) === realtypeof(b)) {
        //handles -0 and 0 special case
        if (realtypeof(a) === "number" && a === b && realint(a) !== realint(b)) {
            console.log(realint(a) + " and " + realint(b) + " are not the same number but equal.")
            return true;
        }
        //handles comparison when types are equal
        if (realint(a) === realint(b)) {
            console.log("'" + realint(a) + "' and '" + realint(b) + "' are " + realtypeof(a) + "s with the same value.");
            return true;
        }
        console.log("'" + realint(a) + "' and '" + realint(b) + "' are " + realtypeof(a) + "s with a different value.")
        return false;
    }
    types[realtypeof(a)] = 0;
    types[realtypeof(b)] = 1;
    //symbol and function don't get coerced and are only equal by reference
    if ("symbol" in types) {
        console.log(realint(arguments[1-types["symbol"]]) + " is not equal to " + String(arguments[types["symbol"]]) + ", only a reference to the same symbol is.");
        return false;
    }
    if ("function" in types) {
        console.log(realint(arguments[1-types["function"]]) + " is not equal to " + String(arguments[types["function"]]) + ", only a reference to the same function is.");
        return false;
    }
    //undefined and null are only equal to each other
    if ("undefined" in types && "null" in types) {
        console.log("undefined and null are equal to each other with weak equality.");
        return true;
    }
    if ("undefined" in types) {
        console.log(realint(arguments[1-types["undefined"]]) + " is not equal to undefined, only undefined/null is.");
        return false;
    }
    if ("null" in types) {
        console.log(realint(arguments[1-types["null"]]) + " is not equal to null, only undefined/null is.");
        return false;
    }
    //string and a number = coerce the string to a number
    if ("string" in types && "number" in types) {
        console.log("Coercing the string '" + arguments[types["string"]] + "' to the number '"
        + realint(Number(arguments[types["string"]])) + "'.");
        return looseEquality(arguments[types["number"]], Number(arguments[types["string"]]));
    }
    //boolean and anything = coerce the boolean to a number - true = 1, false = 0
    if ("boolean" in types) {
        console.log("Coercing the boolean '" + arguments[types["boolean"]] + "' to the number '" + Number(arguments[types["boolean"]]) + "'");
        return looseEquality(arguments[1-types["boolean"]], Number(arguments[types["boolean"]]));
    }
    //string or number and object = coerce the object to a string
    if ((("string" in types) || ("number" in types)) && "object" in types) {
        try {
            var objstring = String(arguments[types["object"]])
        }
        catch (TypeError) {
            console.log("The object cannot be coerced to a string, comparison throws a TypeError!");
            return false;
        }
        console.log("coercing the following object:");
        console.log(arguments[types["object"]]);
        console.log("to the string '" + objstring + "'");
        return looseEquality(arguments[1-types["object"]], String(arguments[types["object"]]));
    }
    //fallthrough in case of totally new behavior
    console.log("I don't know how to handle this case, but " + (a == b) + " will be returned");
    return (a == b);
}

function testLooseEquality(a, b) {
    var isLooseEqual;
    try {
        isLooseEqual = (a == b);
    }
    catch (TypeError) {
        isLooseEqual = false;
    }
    return isLooseEqual === (looseEquality(a, b));
}

//Test Cases -- should all return true
var a = Symbol();
testLooseEquality(a, a);
testLooseEquality(a, Symbol());
testLooseEquality(a, function() {});
a = function() {};
testLooseEquality(a, a);
testLooseEquality(a, Symbol());
testLooseEquality(a, function() {});
a = Object.create(null);
testLooseEquality(a, a);
testLooseEquality("5", 5);
testLooseEquality("0", false);
testLooseEquality("0", []);
testLooseEquality(false, []);
testLooseEquality(false, {});
testLooseEquality(false, a);
testLooseEquality(1, ["1"]);
testLooseEquality(null, null);
testLooseEquality(undefined, undefined);
testLooseEquality(null, undefined);
testLooseEquality(null, 42);
testLooseEquality(-0, undefined);
testLooseEquality(false, -0);
testLooseEquality("Try this", -0);
testLooseEquality(-0, "-0");
testLooseEquality(Symbol(), -0);
testLooseEquality(function() {}, -0);
testLooseEquality(["-0"], -0);
testLooseEquality(Symbol(), function() {});