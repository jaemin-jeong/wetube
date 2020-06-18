import express from 'express';
import passport from 'passport';
import routes from '../routes';
import { home, search } from '../controllers/videoControllers';
import {
  getJoin, postJoin, getLogin, postLogin, logout, githubLogin, postGithubLogin, getMe, facebookLogin, postFacebookLogin,
} from '../controllers/userControllers';
import { onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(routes.githubCallback, passport.authenticate('github', { failureRedirect: routes.login }),
  postGithubLogin);

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, passport.authenticate('facebook', { failureRedirect: routes.login }),
  postFacebookLogin);

export default globalRouter;
