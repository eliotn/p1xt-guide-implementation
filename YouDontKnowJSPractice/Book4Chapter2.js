//handles -0 properly for negetive
function isNegetive(n) {
    return n < 0 || (1/n) === -Infinity;
}
isNegetive(0);//false
isNegetive(-0);//true
function passesByReference(v) {
    return  (!!v) &&((typeof v) === "object" || (typeof v) === "function");
}
passesByReference(null);//false
passesByReference(42);//false
passesByReference(Object.create(null));//true
passesByReference(function() {});//true

//array to linked list - takes advantage of objects being references in javascript
function arrayToLinkedList(a) {
    if (a.length == 0) return undefined;
    var head = {value:a[0]};
    var tmp = head;
    for (var i = 1; i < a.length; i++) {
        tmp.next = {value:a[i]};
        tmp = tmp.next;
    }
    return head;
}
arrayToLinkedList([]);//undefined
arrayToLinkedList([1, 2, 3]);//3 nodes, last node's next is undefined