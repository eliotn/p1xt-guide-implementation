

//installed express, mongoose/mongodb, passport-twitch
const express = require('express');
const server = "test-eliotn.c9users.io";
const port = process.env.PORT || 3000;


//mongoose.Promise = Promise;//mongoose's promise library is depricated

const mongourl = 'mongodb://localhost:27017/twitchvotes';
var MongoClient = require('mongodb').MongoClient;
var users;//get the collection
MongoClient.connect(mongourl, function(err, database) {
    if (err) throw err;
    users = database.collection('users');
    users.drop();//temporary, drop between runs
});

const fs = require('fs');
//err is true if there is an error connecting


//test out twitch passport
const passport = require("passport");
//authenticate based on token
/*passport.use(
    new BearerStrategy(
        function (token, done)
    );    
);*/
const app = express();
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
            if (results == null) {
                console.log("user needs to be created");
                users.insert({"userid": profile.id, "access_token":accessToken}, function (err) {
                    if (err) return done(err);
                    return done(null, {"access_token":accessToken});
                });
            }
            else {
                console.log("user already logged in!");
                return done(null, {"access_token":accessToken});
            }
        });
        console.log(JSON.stringify(profile));
        //put data we want access to in the callback here
        
    }));
});

//session is set to false because we aren't using sessions
//thanks https://jeroenpelgrims.com/token-based-sessionless-auth-using-express-and-passport
app.get('/auth/twitch/', passport.authenticate("twitch", {session: false}));
app.get('/auth/twitch/callback', passport.authenticate("twitch", {session:false, failureRedirect: '/'}), function (req, res) {
    
   res.redirect('/?access_token=' + req.user.access_token);
});
app.get('/', function (req, res) {
    res.send("Homepage");
})
app.listen(port, function() {
    console.log("listening on port " + port);
});