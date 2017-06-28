//TODO: figure out why there seems to be a double execute sometime with twitch
//passport

//installed express, mongoose/mongodb, passport-twitch
const express = require('express');
const app = express();
const server = "test-eliotn.c9users.io";
const port = process.env.PORT || 3000;


//mongoose.Promise = Promise;//mongoose's promise library is depricated

const mongourl = 'mongodb://localhost:27017/twitchvotes';
var MongoClient = require('mongodb').MongoClient;

//allow JSON request bodies to be readable
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//users contains the following
//access_token, userid
//polls contains the following
//userid, question, [{answer, votes}]
var users;//get the collection
var polls;//get the polls
MongoClient.connect(mongourl, function(err, database) {
    if (err) throw err;
    users = database.collection('users');
    //users.drop();//temporary, drop between runs
    polls = database.collection('polls');
    //polls.drop();
});

const fs = require('fs');
//err is true if there is an error connecting


//test out twitch passport
const passport = require("passport");


app.use(passport.initialize());
app.use(passport.session());
var twitchStrategy = require("passport-twitch").Strategy;
const TWITCH_CLIENT_ID = "cmavc0iwqxq8zesuuvwca02gzaxoth";

//read secret from file before starting passport
var clientSecret; 
fs.readFile("secret", "utf-8", function(err, str) {
    if (err) throw err;
    clientSecret = str;
    passport.use(new twitchStrategy({
        clientID: TWITCH_CLIENT_ID,
        clientSecret: clientSecret,
        callbackURL: "https://" + server + "/auth/twitch/callback",
        scope: "user_read",
        session: false
    }, function(accessToken, refreshToken, profile, done) {
        //do stuff with the user after you log them in
        users.findOne({"userid": profile.id}, function(err, results) {
            if (err) {
                return done(err);
            }
            if (!results) {
                console.log("user needs to be created");
                users.insert({"userid": profile.id, "access_token":accessToken}, function (err) {
                    if (err) return done(err);
                    return done(null, {"access_token":accessToken});
                });
            }
            else {
                console.log("user already logged in!");
                users.updateOne({"userid": profile.id}, {$set: {"access_token":accessToken}});
                
                return done(null, {"access_token":accessToken});
            }
        });
        console.log(JSON.stringify(profile));
        //put data we want access to in the callback here
        
    }));
    afterPassport();
});

//authenticate based on token
var BearerStrategy = require("passport-http-bearer").Strategy;
function afterPassport() {
    passport.use(
        new BearerStrategy(
            function (token, done) {
                if (!token) {
                    console.log("token not found");
                    return done(null, false, {message: 'no token'});
                }
                users.findOne({"access_token": token}, function(err, result) {
                    if (err) {
                        console.log("error in bearerstrategy" + err);
                        return done(err);
                    }
                    if (!result) {
                        console.log("incorrect token");
                        return done(null, false, {message: 'incorrect token'});
                    }
                    console.log("correct token");
                    return done(null, result, {scope:'all'});
                });
            }
        )
    );

    //session is set to false because we aren't using sessions
    //thanks https://jeroenpelgrims.com/token-based-sessionless-auth-using-express-and-passport
    app.get('/auth/twitch/', passport.authenticate("twitch", {session: false}));
    app.get('/auth/twitch/callback', passport.authenticate("twitch", {session:false, failureRedirect: '/'}), function (req, res) {
    
       res.redirect('/?access_token=' + req.user.access_token);
    });
    app.get('/', function (req, res) {
        res.send("Homepage");
    });
    app.put('/api/poll/:pollid/:vote', function (req, res) {
        console.log("Starting vote!");
        polls.findOne({"userid": String(req.params.pollid)}, function(err, results) {
            if (err) {
                res.json({"err":err});
                return;
            }
            console.log(results);
            console.log(req.params.pollid);
            if (!results || results.answers.length <= req.params.vote) {
                res.status(404).send();
                return;
            }
            polls.updateOne({userid: req.params.userid, answers:req.params.vote-1}, {$inc: "answers.$"});
            res.json({"Note:": "vote counted"});
        });
    });
    app.post('/api/poll',  passport.authenticate("bearer", {session: false}), function (req, res) {
        console.log(req.body);
        if (req.body.question && req.body.answers) {
            polls.findOne({"userid": req.user.userid}, function(err, results) {
            if (err) {
                res.json({"err":err});
                return;
            }
            //properly format answers
            var answers = [];
            for (var answer in req.body.answers) {
                answers.push({"answer":answer, "votes":0});
            }
            
            if (!results) {
                console.log("poll needs to be created");
                polls.insert({"userid": req.user.userid, "question": req.body.question, "answers":answers}, function (err) {
                    if (err) res.json({"err":err});
                    else res.json({"Note":"Poll added"});
                });
            }
            else {
                console.log("update poll with new information");
                polls.updateOne({"userid": req.user.userid}, {$set: {"question":req.body.question, "answers":answers}});
                res.json({"Note":"Poll updated"});
            }
        });
        }
        else {
            res.json({"Note":"You posted an invalid poll"});
        }
    });
    app.get('/api/debug/testlogin',  passport.authenticate("bearer", {session: false}), function (req, res) {
        res.json({"Note":"Your userid is " + req.user.userid});
    });
    //dump the database output
    app.get('/api/debug/users',  passport.authenticate("bearer", {session: false}), function (req, res) {
        users.find().toArray(function(err, result) {
            if (err) throw err;
            res.json({'users':JSON.stringify(result)}); 
        });
    });
    app.get('/api/debug/polls',  passport.authenticate("bearer", {session: false}), function (req, res) {
        polls.find().toArray(function(err, result) {
            if (err) throw err;
            res.json({'polls':JSON.stringify(result)}); 
        });
    });
    app.listen(port, function() {
        console.log("listening on port " + port);
    });
}