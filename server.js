const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDB } = require("./data/database.js");
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const MongoStore = require('connect-mongo');

const port = process.env.PORT || 3000;


app
.use(express.json())
.use(express.urlencoded({extended: true}))
.use(bodyParser.json())
.use(session({
    store: MongoStore.create({ mongoUrl: process.env.URI}),
    secret:'secret',
    resave:false,
    saveUninitialized :true,

}))
// This is the basic express session({...})initialization
.use(passport.initialize())
// init passport on every route call
.use(passport.session())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Header', 'Origin, x-Request-Whith, Content-type,Accept,Z-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE,OPTIONS');
  next();
})
.use(cors({
  origin:'*',
  methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
.use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
    clientID : process.env.GITHUB_CLIENT_ID,
    clientSecret :process.env.GITHUB_CLIENT_SECRET,
    callbackURL : process.env.CALLBACK_URL
 },
  function(accessToken , refreshToken ,profile ,done){
    return done(null,profile);

  }));


  passport.serializeUser((user , done)=>{
    done(null ,user);})
  passport.deserializeUser((user , done)=>{
    done(null ,user);})  

app.get('/',(req ,res)=>{res.send(req.session.user !== undefined ?`Logged in as ${req.session.user.displayName}`:'Logged out')})

app.get('/github/callback', passport.authenticate('github',{
    failureRedirect :'/api-docs',session :false}),
    (req , res)=>{
    req.session.user = req.user;
    res.redirect('/');

});

app.listen(port , ()=> { 
    initializeDB();
    console.log(`Database is listening and node runing on port:${port}`)});