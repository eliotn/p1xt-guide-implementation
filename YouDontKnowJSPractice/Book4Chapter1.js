//fixes the null bug for typeof
function realtypeof(a) {
    if (!a && (typeof a === "object")) {
        return "null";
    }
    return (typeof a)
}

realtypeof(null);//null
realtypeof({});//object

//uses this to see what is defined in the call site
function definedInThis(variablename) {
    return (variablename in this && typeof this[variablename] !== "undefined");
}
definedInThis("definedInThis");//true
definedInThis("a");//false