import passport from 'passport';
import GithubStrategy from 'passport-github';
import FacebookStrategy from 'passport-facebook';
import User from './models/User';
import { githubLoginCallback, facebookLoginCallback } from './controllers/userControllers';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.GH_CB_URL,
  }, githubLoginCallback),
);

passport.use(
  new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CB_URL,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ['public_profile', 'email'],
  }, facebookLoginCallback),
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
