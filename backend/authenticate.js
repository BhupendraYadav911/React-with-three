// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var JwtStrategy = require('passport-jwt').Strategy;
// var ExtractJwt = require('passport-jwt').ExtractJwt;
//var FacebookTokenStrategy = require('passport-facebook-token');
var jwt = require('jsonwebtoken'); // Used to create, sign, and verify token

var User = require('./models/user');
var config = require('./config');
var Response = require('./lib/response');

// exports.local = passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//opts.secretOrKey = config.secretKey;

exports.getToken = (user) => {
    return jwt.sign(user, config.secretKey);
}

exports.verifyUser = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if(typeof authorizationHeader === 'undefined') {
        return res.status(403).json(Response(403, 'Required paramater access token is missing'));
    }
    if(!(authorizationHeader.search('Bearer') !== -1)) {
        return res.status(403).json(Response(403, 'Required paramater access token is not in proper format.'));
    }
    const authorizationToken = authorizationHeader.split(' ')[1];
    if(!authorizationToken) {
        return res.status(403).json(Response(403, 'Required paramater access token is missing.'));
    }
    try {
        const decodedToken = jwt.verify(authorizationToken, config.secretKey);
        const userId = decodedToken.userid;
        const user = await User.findById(userId);
        req.body.user = user;
        next();
    } catch (error) {
        return res.status(401).json(Response(403, error.message))
    }
}

// exports.verifyUser = passport.authenticate('jwt', {session: false});
/* exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log('JWT Payload: ', jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err, user) => {
        if(err) {
            return done(err, false);
        } else if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
})); */


/* exports.verfiyAdmin = (req, rest, next) => {
    if (req.user.admin) {
        next();
    } else {
        var err = new Error('You are not authorized to perform this operation');
        err.status = 403;
        next(err);
    }
}

exports.facebookPassport = passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientId,
    clientSecret: config.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({facebookId: profile.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!err && user !== null) {
                return done(null, user);
            } else {
                let user = new User({ username: profile.displayName });
                user.facebookId = profile.id;
                user.firstname = profile.name.givenName;
                user.lastname = profile.name.familyName;
                user.save((err, user) => {
                    if (err) {
                        return done(err, false);
                    }
                    else {
                        return done(null, user);
                    }
                });
            }
        });
    }
)); */
