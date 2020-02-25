var express             = require("express");
var app                 = express();
var bodyParser          = require("body-parser");
var mongoose            = require("mongoose");
var flash               = require("connect-flash");
var passport            = require("passport");
var LocalStrategy       = require("passport-local");
var Campground          = require("./models/campground");
var Comment             = require("./models/comment");
var User                = require("./models/user");
var seedDB              = require("./seeds");
var methodOverride      = require("method-override");

// requiring routes
var commentRoutes       = require("./routes/comments");
var campgroundRoutes    = require("./routes/campgrounds");
var indexRoutes         = require("./routes/index");


// mongoose.connect("mongodb://localhost/yelp_camp_v12", { useNewUrlParser: true }); 
mongoose.connect("mongodb+srv://lmeet:5566@lmeet-sweui.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
// ingnore above two line of code and separate production and working database, do below:
// export DATABASEURL=mongodb://localhost/yelp_camp_v12    // run this in cmd first
// go to heroku setting config -> add DATABASEURL and mongodb+srv://lmeet:5566@lmeet-sweui.mongodb.net/test?retryWrites=true&w=majority

// mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "SECRET",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



// seedDB();  //seed the database
app.use("/", indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The Animal server has started");
});