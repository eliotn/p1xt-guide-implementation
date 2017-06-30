## 6/30/2017
socket.io isn't too hard to implement.
I can have api calls do other cool things on the server, like join a twitch channel.

## 6/29/2017
learned about twitch bots going to try a library and see if I can integrate it in.
And it works.
Note: don't count on returning things from within callbacks.
If you call a function with less arguments then the max in js the undeclared ones
are undefined, makes sense.
Interview questions:
If an edge case would make an answer pointless raise an exception.
Good interview tips website: https://www.interviewcake.com/coding-interview-tips


## 6/28/2017
MongoDB is Very Particular about type of the object as well as the parameter.
When inputting a custom string for an object parameter you have to create the
object and use brackets, as the variable name will be interpreted as a string.
My first instinct is to use print statements instead of a debugger.
You can use telnet to make http requests.
get / HTTP/1.1
Host: example.com
Be sure to revert to saved when you have cloud 9 saved.  I lost some progress :(
Of course committing more often would have saved me.
also make sure you put the static folder in the right directory. Oops.

## 6/27/2017
Good managers will support prioritization and that projects are hard to scope.
Bad managers will simply say get it done.
Be sure to break the tasks down.
Keep in perspective how important something is.
Get an idea of how much time something is worth.
Much easier to build the product when you are the user, part of this goes to
domain knowledge you have of your product.
Also its easier to build what you like.
Be careful, 'false' != false :P
Also remember to define a function if you want to shorten a function call.
You can use https://www.hurl.it/ to test queries without installing anything
also www.runscope.com but I can only do a free trial
Ctrl-D is the EOF character.
make always tries to build the first target if run with no arguments

## 6/26/2017
keep client secrets secret with file reads.
Twitch has a neat little api for integration.
Mergesort is O(nlog(n))
I had problems implementing mongoose, was it the promises hook I used or
something else?

## 6/25/2017
Omega time stands for lower bound

## 6/24/2017
argc stands for argument count
argv stands for argument vector
Realized after doing the crypt assignment that the salt is always prepended to
the hash.  This is so that the computer can easily allow someone with the right
password without needing to guess the salt.  Brilliant.


## 6/23/2017
I can use #define macros easily for isUpper or isLower but c also has functions for that.
crypt is a function in C that uses a simple hashing algorithm that takes a salt from the set of 0-9A-Za-z/ to encrypt a password.


## 6/22/2017
###### To check for bool conversion, look at (<value in here>)
comparison for object in javascript
ctrl-l clears terminal window because it executes clear
some logical errors are because you forgot to negate one of the conditions
ex: cs50 buggy3
debug50 is a graphical gdb clone
when you are stuck, TRY TO EXPLAIN YOUR CODE!
###### Interesting fact, uppercase is 32 less than lowercase
for clear documentation, document in a way that is clearer to follow
in initials.c - saying uppercase values have lower values when it is the result is better, but there might be a better way to document

###javascript notes
Arrays are coerced into comma seperated strings, ex: [2,3] == 2,3
Strings, if coerced to numbers due to a comparison will autofail comparison tests since they become NaN
Variable/function definitions are automatically hoisted to the top.  Good to rely on for functions but confusing for var.
If a variable isn't declared, it is automatically set to be global in js.
"use strict" is a good idea, as it prevents variables from doing unexpected behavior by being global if you forgot a var, and instead turns that into a compile time exception.
"use strict" doesn't seem to work in the chrome console
###### Immediately calling a function expression like (<function definition>)(<function args>) is referred to as IIFE
###### this can refer to one of three things: global scope, an object it was called with, or a brand new empty object
Prototypes mean that an object can be prototyped off of another object, and it will search the "inheriting object" for any needed properties that it can't find.  So you can recover behavior by deleting newer properties.
Polyfilling - define a function if it doesn't exist in the current environment, another term for monkey patching.
NaN is never equal to itself.
A shim redefines functions for older browser compatability.
#### Also use a transpiler which converts ES6 syntax to an older syntax, so that it is more compatible with other browsers.  Such as Babel and Traceur.
#### Remember the module pattern.



## 6/21/2017
New idea for homework, do every interview data structure from scratch, and code all of 
the sort algorithms before the interview.
Talk about tradeoffs when facing a hard programming problem.
Watching interview video - Knowing Big O notation will be key for the interview.
Trie is a prefix tree
###### For some reason ({} == false) and ({} == true) are both false, this apparently affects {} objects (most likely coercion to NaN).
null is apparently an object type in js.

### javascript notes:
use isNaN for comparisons with NaN in js
toFixed returns string.
Be careful when doing <= on different types.  Not sure how they can be compared
but '$648.00' <= 1000.00 returns False.
== doesn't seem to coerce floats into ints - both orders 39.01 == 39 are false
javascript boxes types as different types.
## 6/20/2017
I did refactoring for the credit.c too fast.  Too many errors.
You can print part of a string with %.1s for example like with floats
C program pre-processor directives get resolved first! Then to assembly. Then 
make binaries and link them together.
Fun fact: superman 3 has tiny floating point as a plot point, also the error
in the space program (legacy code example) was due to a conversion that
was not valid.
You can expand a float point number to infinite digits, it shows how it is a
fractional approximation in c.  EX: %.59f
remember %% to escape % in printf
long long - 64 bit integer - %lld
get_* library is from cs50 course scripts
make (name of program) will do a default build command, without specific settings
it is cc x.cc -o x
clang hello.c - c9 workspace also specific make command
a.out stands for assembly out

## 6/19/2017
You can use const in ES6 javascript to enforce constants
>>> and >> are different, >> ignores sign, >>> does not.
remember ===/== and !==/!= are different because of whether they are strict or looser.
learn how to use it
**= works in javascript.  So do |= ^= &= <<= >>=.
scratch list actually works similar to a linked list.
earlier c standard doesn't allow int in for loop, for (int i = 0;;) is illegal.

## 6/18/2017
Prompt is the input() of javascript;
The undefined from console.log is because it evals to undefined.
Shift-enter allows multiple lines on the javascript console.
The browser actually compiles javascript.  Javascript is not interpreted. 
Another word for constant is literal value.
If you don't understand why something works, learn!
When summing 4 or more things the algorithm is always take two sums, then sum those things together etc.  Log(n) vs n.
