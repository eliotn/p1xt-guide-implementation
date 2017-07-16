//Checks if there are empty holes in an array which shouldn't
//be there
function arrayHasHoles(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (!(i in arr)) {
            return true;
        }
    }
    return false;
}
arrayHasHoles([1, , 3]);//true
arrayHasHoles(Array(3));//true
var a = [];
a.length = 6;
arrayHasHoles(a);//true
a = [];
a[3] = 5;
arrayHasHoles(a);//true
arrayHasHoles([]);//false
arrayHasHoles([1, 2, 3]);//false
arrayHasHoles(Array.apply(null, {length: 10}));//false