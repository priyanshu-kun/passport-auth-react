const User = require("./user");
const bcrypt = require("bcryptjs");
const localStragety = require("passport-local").Strategy;

module.exports = function(passport) {
	passport.use(
		new localStragety((username,password,done) => {
			User.findOne({username},(err,user) => {
				if(err) throw err;
				if(!user) return done(null,false);
				bcrypt.compare(password,user.password,async (err,result) => {
					try {
						if(err) throw err;
						if(result)
							return done(null,user);
						else 
							return done(null,false);
					}
					catch(e) {
						console.log(e);
					}
				})
			})
		})
	)

	passport.serializeUser((user,cb) => {
		cb(null,user.id);
	})
	passport.deserializeUser((id,cb) => {
		User.findOne({_id: id},(err,user) => {
			if(err) throw err;
			cb(err,user)
		})
	})
}