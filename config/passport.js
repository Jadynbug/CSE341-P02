const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongo = require('mongoose');
const mongodb = require('mongodb');
const User = require('../models/User');
const { getDb } = require('../db/connect'); 

module.exports = (passport) => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                };
 
                try { 
                    let collection = await getDb().db('P02').collection("User");

                    let user = await collection.findOne({ googleId: profile.id });

                    if(user) {
                        done(null, user);
                    } else {
                        user = await collection.insertOne(newUser);
                        done(null, user);
                    };
                } catch (err) { 
                    console.error(err);
                }; 
            } 
        )
    );

    let user_cache = {};

    passport.serializeUser(function(user, next) {
    let id = user._id;
    user_cache[id] = user;
    next(null, id); 
    });

    passport.deserializeUser(function(id, next) {
    next(null, user_cache[id]);
    });
};