require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const app = express();
const User = require("./user");

mongoose.connect(process.env.MONGO_URL,{
	useNewUrlParser: true,
	useUnifiedTopology: true
},() => {
	console.log("connect to mongoose")
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
	origin: `http://localhost:3000`,
	credentials: true
}))

app.use(session({
	secret: "thisissecretcode",
	resave: true,
	saveUninitialized: true
}))

app.use(cookieParser("thisissecretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportconfig")(passport);



app.post("/login",(req,res,next) => {
	console.log(req.session);
	console.log(req.body);
	passport.authenticate("local",(err,user,info) => {
		if(err) throw err;
		if(!user) res.send("No user Exists");
		else {
			req.logIn(user,err => {
				if(err) throw err;
				res.send("successfully Authenticated");
				console.log(req.user);
			})
		}
	})(req,res,next)
})

app.post("/register",(req,res) => {
	console.log(req.session);
	console.log(req.body);
	console.log("REQ.USER: ",req.user);
	User.findOne({username: req.body.username},async (err,doc) => {
		try {
			if(err) throw new Error("Ohhh, error found",e)
			if(doc) res.send("User Already Exists");
			if(!doc) {
				const hashedPassword = await bcrypt.hash(req.body.password,10);
				const newUser = new User({
					username: req.body.username,
					password: hashedPassword
				});
				await newUser.save();
				res.send("user created")
			}
		}	
		catch(e) {
			console.log(e);
		}
	})
})

app.get("/user",(req,res) => {
	res.send(req.user);
})

app.listen(5000,() => {
	console.log("server is stating!");
})