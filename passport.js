import passport from 'passport';
import GithubStrategy from 'passport-github';
import User from './models/User';
import { githubLoginCallback } from './controllers/userControllers';

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: process.env.CB_URL,
  }, githubLoginCallback),
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());