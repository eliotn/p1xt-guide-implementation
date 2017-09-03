## 9/3/2017
- float properties on inline elements are a bad idea, since float removes the element
from the normal flow and changes it back to block.
- If I use float, I will need to return the flow of the page to its normal status.
One way is by using clear:both on the next element, or containing floats in a parent element.
There is a specific element called a clearfix used for doing this.
- For the inline block elements, the line break will add an additional space.  You need to comment
the line break out or put it on the same line.
- Relative is relative to where it would normally be positioned.
Absolute positioning is relative to the nearest relatively positioned element, or the body.
-Typeface weights (bold/normal/100-900) require the text to support it.
-Set height and line-height to the same value to vertically center text.
-In font the slash is for (font size)/(line height)

## 9/2/2017 - What I learned on my 25th Birthday
- CSS properties have different priorities (cascades):  For example properties that come later override properties that come earlier.
Priority is given by id, class, then type, then by number of selectors in that category.
- Also be careful of repeating css tags, e.g. #dedication h2#dedication doesn't work but h2#dedication does.
- Percentage ties the value to width, em ties it to font size.
- inline-block means that block elements will not break out of the inline element itself, but will be included.
- difference between margin and padding, whether its inside or outside the border.
- Margin, padding, and border aren't counted in size.  Also inline elements ignore certain parameters.
- Border radius accepts multiple parameters, and starts from the top left.
- use border-box to prevent sizing issues, so that padding and border is within size.

## 9/1/2017
- HTML Has several different types of div tags that have a connotation, like <header> and <footer>

## 8/31/2017
- i or em can be used to indicate italics.  b or strong can be used to indicate bold.  But the real difference is in connotation, b or i are usually just used for stylistic fonts, while em/strong are used to emphesize a word.  css means these can be customized to behave differently.
- Learned that elements can be block or inline.  Now the block or inline properties make more sense.
- Programming names should always refer to use/content.

## 8/30/2017
- Learned that Visual Studio Code has a neat way to do build processes with tasks.json.
- Include charset in html pages.  A standard document for list of tags would be helpful.

## 8/29/2017
- SIMD has been replaced by WebAssembly.
- Same with Asm.js
- Found http://frenetic.be/tricks/simple-timer.php
Cool alternative to relying on setTimeout but I don't think
the timer is completely accurate...
- Benchmark seems to be a node library?  Tests seem to fail.

### Altering the syntax of example code seems to work well as a teaching tool. It seems to avoid some of the copy paste syndrome and forces you to think about flow.

## 8/19/2017
- Generators are really about pausing code execution.  The code pauses at a particular yield statement and waits.  That is why they can work with async, as you can have resume when an async task finishes built into the structure.
- runAll is tricky to implement because the generator script doesn't seem to be saved?

## 8/12/2017
- Mysql triggers - Deleting rows on insert looks like a bad idea.
- There are three different frameworks for node:
https://www.airpair.com/node.js/posts/nodejs-framework-comparison-express-koa-hapi

## 8/11/2017
- Inside of a generator, yield star[async1, async2, ...] is another way to do the
store of values then yield, but this is probably too clever of a solution.
- Generators can be recursive, which is nice.

## 8/9/2017
- The generator async pattern relies on the function returning asynchronously.

## 8/6/2017
- Python will first check the local directory for files to import.  So don't
name your application flask.py if you are trying to use flask.

## 8/5/2017
- I tried to run one of the generator examples and saw some weird behavior???

## 8/4/2017
- Generators seem to store global variables left to right for a future generator run
- Learned how to implement a combinations of X algorithm.

## 8/1/2017
- Once an error comes up, a promise will continue to be resolved in a dandy
way.  For a timeout promise, the best way to propagate an error is by setting a variable.
- You have to store an iterator state and the values that get returned seperately.

## 7/31/2017
- setTimeout returns immediately, this can mess up
async code if I'm not careful.

## 7/30/2017
- Machine learning is based off whether what you
are recognizing has the closest distance.

## 7/29/2017
- Good hint, never rely on order between async callbacks.
- Also promises can only be called once.  Nice way to stop mistakes.
- Always better to pass an error object than a string when hanlding errors.
- curl -I can be used to just get the header of an http response.

## 7/28/2017
- For a promise object, the promise function is run synchronously, likely with an
asynchronous call, but the functon inside then is always asynchronous.

## 7/27/2017
- Malloc never zero initializes memory.  Valgrind will complain if you attempt
to follow pointers on uninitialized memory.
- You can't convert from sync to async unless you directly/indirectly play with
the event queue loop.
- Found await-going to explore await as part of chapter 5 as it looks like an improvement.
https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9

## 7/26/2017

## 7/25/2017
- Code that can run now or later is dangerous because it can change the order
that statements are executed in.

## 7/24/2017
- Job Queue is a way to mess with event queue ordering by ensuring that code is
run at end of tick.

## 7/23/2017
- con?a:b is right associative
- code after a finally clause isn't run, also its run after you break out of
try (like with return/continue)
- You can use switch (true) to transform if/if-else code into a switch statement,
because if conditions can be placed into the cases.  However there are caveats.
- DOM elements with global ids are also javascript variables.

## 7/22/2017
- Loose comparison can throw typeerrors from coercion, ex: Object.create(null) == ""
- ++a++ is invalid because it evaluates to ++<returnvalue>.
- You can use (a++, ++a).  This discards the first statement when returning, so
you get a+2 returned.  Without parenthesis, b = a++, ++a will simply set b to a+1
first before executing ++a.
- you can object destructure with brackets as part of a var declaration or
function definition, and you can nest it
- Always cast malloc to the pointer type that is needed.

## 7/21/2017
- coercion for == is actually pretty simple when you understand how it works
- Note, safari console seemes to interpret valid JSON properly.

## 7/20/2017
- Read ahead a little, but it looks like Promises are a useful alternative to
callback hell.
- One gotcha with == is that it is an invalid way to test something's truthiness.
Use if (expr) or !!expr or Boolean instead to get something's truthiness.  This
is because true and false will instead become 1 and 0.

## 7/19/2017
- Coercion isn't evil.  The only evil that it has is when it confuses other
developers.
- == allows coercion in comparisons. === disallows it. == and ===
BOTH check type, == is more work because it coerces according to several rules.

## 7/18/2017
- When Date becomes an int it is always the unix timestamp.


## 7/17/2017
- parseInt coerces to string, then politely discards the junk afterwards,
- which can make some operations look confusing.

## 7/16/2017
- Remember to use the Markdown Live previewer when editing markdown files live.
- You can get a function's # of arguments with .length
- typeof is another way to do dependency injection.  One way I am familiar with
in node.js is ||
- Libraries might be important for handling unicode characters
- 'reverseͨ͆.'.split("").reverse().join(""); Does not work as it puts the special
character over the wrong letter.
- Octal numbers can be specified in non-strict mode by 0xxxx, this is confusing.
- Negetive zero is not coerced or compared properly by ===.
- Object.is is good for equality for stricter cases.
- Arrays can have holes in JS which are confusingly represented by the different
browsers, hole means the property is not there.
- Function() is only good for dynamically making functions with different parameters
- RegExp() can be used to define functions dynamically
- You don't know JS book is wrong, RegExp prototype is default defined as an
object in chrome and firefox.

## 7/15/2017
- With refactoring, always be careful about order and potential side effects.

## 7/14/2017
- Streaming on twitch is helpful for my programming effort.
-strtof converts string to float in c.

## 7/13/2017
- Need to keep reading/rereading p1xt guide.  It gives me new energy to keep my motivation.
- Looking through red film for secret decoding, finding nothing new, but I can kind of make
out the body with an image filter.
- It helps to go over previous examples.
- safari's console apparently relies on the constructor for the object name so browser matters when debugging.
- You can load javascript libraries dynamically https://www.sitepoint.com/dynamically-load-jquery-library-javascript/

## 7/12/2017

## 7/11/2017
- did alpha-numeric wrong in foundation, oops.
- The foundation form validation seems tricky to get right.

## 7/10/2017
- Passport always bonds the token object to user
- It can be better in code to check conditions one at a time.

## 7/9/2017
- Replace one with upsert:true is the correct way to do replacements for mongod.

## 7/8/2017
- The key to focusing is to be in the state of heightened focus.
- Found a useful decision chart for appropriate HTTP responses https://i.stack.imgur.com/whhD1.png
- Mustache is necessary, Http Templating is a *very* useful tool.
- object.create(null) truly has no prototype because the parameter specifies the prototype.
constructor property should not be used to determine the function it was
constructed by, because it only usuallyhappens to link to the object.
- Also prototype just is assigned like constructor as a side effect.
- You can use twitch to get someones oauth key, but they need to authorize the app to allow
them to chat.
- Use Object.create(null) for a dictionary without any shadowing or weird dropped values from having properties.

## 7/7/2017
- Mustache looks like a good option for serving up content

## 7/6/2017
- I found a good reference for design for the website.
https://stackoverflow.com/questions/6126584/how-to-use-node-js-to-build-pages-that-are-a-mix-between-static-and-dynamic-cont
- Basically, I can make a single page application that uses socket.io to design the website.
- xxd is useful to display the actual bits of an object.  The appropriate command
is xxd -c (bytes per line) -g (bytes per group) -s (offset bytes)

## 7/5/2017
- Always have a local debug environment setup.

## 7/4/2017
- call will thread in anything to this, but it will be coerced to object.  Note that it ignores null/undefined.
- You need to have closure on args if you want to run a callback with them.
- Only way to create null object (no __prototype) is object.create(null)
- Is global an alternative name for window on things such as node?
- I can't convert an object to a primitive in google chrome.
- If you attempt to put a value into an invalid positive array index, the array will be padded with undefined.
- Functions are not exactly the same as a reference? if you bind a copy, only the copy will keep the binding.
- length is a non-enumerable property in an array!
- careful get and put can do infinite recursion

## 7/3/2017
- Asynchronous code cannot be interleaved with other async code in a different scope, but order is not guaranteed!
- Never assume the order that an async request comes in, even if one task is always *much slower*
- always do function() {} on the callback.
- Async can lead to race conditions by its very nature.  But there are latches/checks that can prevent this.
- Object.prototype goes up a chain.
- You can't use variables until you declare them, in their scope, of course.
- If you use function declarations within blocks as part of an if statement, they weren't hoisted in chrome, heed the authors warning and don't even think about using it.
- Angular.js uses closure to monitor dependencies.

## 7/2/2017
- Environment variables are a better strategy than secret files for deployment.
- Never ever ever do an ajax request synchronously as it will lock up the ui.
- console.log may be asynchronous in browsers - in order to get an accurate value, you need to add a closure to the object by making it a string or otherwise capture the right value.
- this will reference the way in which it was called at the time it was called.  It may or may not reference the function.
- In ES6, objects can be assigned different properties.  Most useful for library apis.


## 7/1/2017
- Closure -- scopes will keep a state at a later date
- "use strict;" main effect is to prevent a default assignment to the global scope.  Many browsers support window.<var> to do this without needing "use strict", but there are other effects too.
- Beware of with and eval, as they can modify scope.  Also they stop certain optimizations.
- Keep in mind hoisting, function definitions are hoisted to the top and set first.


## 6/30/2017
- socket.io isn't too hard to implement.
- I can have api calls do other cool things on the server, like join a twitch channel.
- /** seems to automatically do multiline comments in c++ editor.
- Whats improtant is knowing the algorithmic patterns for coding questions.

## 6/29/2017
- learned about twitch bots going to try a library and see if I can integrate it in.
- And it works.
- Note: don't count on returning things from within callbacks.
- If you call a function with less arguments then the max in js the undeclared ones
are undefined, makes sense.
- If an edge case would make an answer pointless it is smart to raise an exception.
- Good interview tips website: https://www.interviewcake.com/coding-interview-tips

## 6/28/2017
- MongoDB is Very Particular about type of the object as well as the parameter.
- When inputting a custom string for an object parameter you have to create the
object and use brackets, as the variable name will be interpreted as a string.
- My first instinct is to use print statements instead of a debugger.
- You can use telnet to make http requests.
- Be sure to revert to saved when you have cloud 9 saved.  I lost some progress :(
- Of course committing more often would have saved me.
- also make sure you put the static folder in the right directory. Oops.

## 6/27/2017
- Good managers will support prioritization and that projects are hard to scope.
- Bad managers will simply say get it done.
- Be sure to break the tasks down.
- Keep in perspective how important something is.
- Get an idea of how much time something is worth.
- Much easier to build the product when you are the user, part of this goes to
domain knowledge you have of your product.
- Also its easier to build what you like.
- Be careful, 'false' != false :P
- Also remember to define a function if you want to shorten a function call.
- You can use https://www.hurl.it/ to test queries without installing anything
- also www.runscope.com but I can only do a free trial
- Ctrl-D is the EOF character.
- make always tries to build the first target if run with no arguments

## 6/26/2017
- keep client secrets secret with file reads.
- Twitch has a neat little api for integration.
- Mergesort is O(nlog(n))
- I had problems implementing mongoose, was it the promises hook I used or
something else?

## 6/25/2017
- Omega time stands for lower bound

## 6/24/2017
- argc stands for argument count
- argv stands for argument vector
- Realized after doing the crypt assignment that the salt is always prepended to
the hash.  This is so that the computer can easily allow someone with the right
password without needing to guess the salt.  Brilliant.


## 6/23/2017
- I can use #define macros easily for isUpper or isLower but c also has functions for that.
- crypt is a function in C that uses a simple hashing algorithm that takes a salt from the set of 0-9A-Za-z/ to encrypt a password.


## 6/22/2017
- To check for bool conversion, look at (<value in here>)
- ctrl-l clears terminal window because it executes clear
- some logical errors are because you forgot to negate one of the conditions
ex: cs50 buggy3
- debug50 is a graphical gdb clone
- when you are stuck, TRY TO EXPLAIN YOUR CODE!
- Interesting fact, uppercase is 32 less than lowercase
- for clear documentation, document in a way that is clearer to follow
- in initials.c - saying uppercase values have lower values when it is the result is better, but there might be a better way to document

###javascript notes
- Arrays are coerced into comma seperated strings, ex: [2,3] == 2,3
- Strings, if coerced to numbers due to a comparison will autofail comparison tests since they become NaN
- Variable/function definitions are automatically hoisted to the top.  Good to rely on for functions but confusing for var.
- If a variable isn't declared, it is automatically set to be global in js.
- "use strict" is a good idea, as it prevents variables from doing unexpected behavior by being global if you forgot a var, and instead turns that into a compile time exception.
- "use strict" doesn't seem to work in the chrome console
- Immediately calling a function expression like (<function definition>)(<function args>) is referred to as IIFE
- this can refer to one of three things: global scope, an object it was called with, or a brand new empty object
- Prototypes mean that an object can be prototyped off of another object, and it will search the "inheriting object" for any needed properties that it can't find.  So you can recover behavior by deleting newer properties.
- Polyfilling - define a function if it doesn't exist in the current environment, another term for monkey patching.
- NaN is never equal to itself.
- A shim redefines functions for older browser compatability.
- Also use a transpiler which converts ES6 syntax to an older syntax, so that it is more compatible with other browsers.  Such as Babel and Traceur.
- Remember the module pattern.



## 6/21/2017
- New idea for homework, do every interview data structure from scratch, and code all of
the sort algorithms before the interview.
- Talk about tradeoffs when facing a hard programming problem.
- Watching interview video - Knowing Big O notation will be key for the interview.
- Trie is a prefix tree
- For some reason ({} == false) and ({} == true) are both false, this apparently affects {} objects (most likely coercion to NaN).
- null is apparently an object type in js.

### javascript notes:
- use isNaN for comparisons with NaN in js
- toFixed returns string.
- Be careful when doing <= on different types.  Not sure how they can be compared
- but '$648.00' <= 1000.00 returns False.
- -== doesn't seem to coerce floats into ints - both orders 39.01 == 39 are false
- javascript boxes types as different types.
## 6/20/2017
- I did refactoring for the credit.c too fast.  Too many errors.
- You can print part of a string with %.1s for example like with floats
- C program pre-processor directives get resolved first! Then to assembly. Then
make binaries and link them together.
- Fun fact: superman 3 has tiny floating point as a plot point, also the error in the space program (legacy code example) was due to a conversion that was not valid.
- You can expand a float point number to infinite digits, it shows how it is a fractional approximation in c.  EX: %.59f
- remember %% to escape % in printf
- long long - 64 bit integer - %lld
- get_* library is from cs50 course scripts
- make (name of program) will do a default build command, without specific settings
it is cc x.cc -o x
- clang hello.c - c9 workspace also specific make command
- a.out stands for assembly out

## 6/19/2017
- You can use const in ES6 javascript to enforce constants
\>\>\> and >> are different, >> ignores sign, >>> does not.
remember ===/== and !==/!= are different because of whether they are strict or looser.
- learn how to use it
- **= works in javascript.  So do |= ^= &= <<= >>=.
- scratch list actually works similar to a linked list.
- earlier c standard doesn't allow int in for loop, for (int i = 0;;) is illegal.

## 6/18/2017
- Prompt is the input() of javascript;
- The undefined from console.log is because it evals to -undefined.
- Shift-enter allows multiple lines on the javascript console.
- The browser actually compiles javascript.  Javascript is not interpreted.
- Another word for constant is literal value.
- If you don't understand why something works, learn!
- When summing 4 or more things the algorithm is always take two sums, then sum those things together etc.  Log(n) vs n.
