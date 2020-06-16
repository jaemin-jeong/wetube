import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => {
  res.render('Join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  console.log(req.body);
  const {
    body: {
      name, email, password, password2,
    },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render('Join', { pageTitle: 'Join' });
  } else {
    try {
      // To Do: Register User
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
      // To Do: Log User in
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => {
  res.render('Login', { pageTitle: 'Login' });
};

export const postLogin = passport.authenticate('local', {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  // console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: {
      id,
      // eslint-disable-next-line camelcase
      avatar_url,
      name,
      email,
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl: avatar_url,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  // To Do: process Logout
  req.logout();
  res.redirect(routes.home);
};

export const users = (req, res) => {
  res.render('user', { pageTitle: 'User' });
};

export const editProfile = (req, res) => {
  res.render('editProfile', { pageTitle: 'Edit Profile' });
};

export const userDetail = (req, res) => {
  res.render('userDetail', { pageTitle: 'User Detail' });
};

export const changePassword = (req, res) => {
  res.render('changePassword', { pageTitle: 'Change Password' });
};
