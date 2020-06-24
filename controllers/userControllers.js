import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const getJoin = (req, res) => res.render('Join', { pageTitle: 'Join' });

export const postJoin = async (req, res, next) => {
  // console.log(req.body);
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

export const getLogin = (req, res) => res.render('Login', { pageTitle: 'Login' });

export const postLogin = passport.authenticate('local', {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
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
    if (user) {
      user.githubId = id;
      // user.avatarUrl = avatar_url;
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

export const postGithubLogin = (req, res) => res.redirect(routes.home);

export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {
  const { _json: { id, name, email } } = profile;
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      user.facebookId = id;
      // user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
      facebookId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => res.redirect(routes.home);

export const logout = (req, res) => {
  // To Do: process Logout
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render('userDetail', { pageTitle: 'User Detail', user: req.user });
};

export const users = (req, res) => {
  res.render('user', { pageTitle: 'User' });
};

export const getEditProfile = (req, res) => {
  res.render('editProfile', { pageTitle: 'Edit Profile' });
};

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect('editProfile', { pageTitle: 'Edit Profile' });
  }
};

export const userDetail = async (req, res) => {
  const { params: { id } } = req;
  try {
    const user = await User.findById(id).populate('videos');
    console.log(user);
    res.render('userDetail', { pageTitle: 'User Detail', user });
  } catch {
    res.redirect(routes.home);
  }
};

export const getChangePassword = (req, res) => {
  res.render('changePassword', { pageTitle: 'Change Password' });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (!newPassword || !newPassword1 || newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    console.log(error);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
