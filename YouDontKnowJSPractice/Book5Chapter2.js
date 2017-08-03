//functions may be async, may not be async
function maybeAsyncMaybeSync(cbk) {
    if (Math.random() < 0.5) {
        cbk.call(this);
    }
    else {
        setTimeout(cbk, Math.random() * 200);
    }
}

//ajax utility
function ajax(path, cb) {
    var newthis = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            cb(xhttp.responseText);
        }
    }
    xhttp.open("Get", path, true);
    xhttp.send();
}
//can only do this for domains that enable cross origin
//this is one of the domains I found that does this:
ajax("https://enable-cors.org/", function(response) {console.log(response);});

