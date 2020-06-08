import routes from "../routes";

export const getJoin = (req, res) => {
  res.render('Join', { pageTitle: 'Join'});
}

export const postJoin = (req, res) => {
  console.log(req.body)
  const {
    body: {name, email, password, password2}
  } = req;
  if(password !== password2){
    res.status(400)
    res.render('Join', { pageTitle: 'Join'});
  } else {
    // To Do: Register User
    // To Do: Log User in
    res.redirect(routes.home);
  }
}

export const join = (req, res) => {
  res.render('Join', { pageTitle: 'Join'});
}

export const login = (req, res) => {

  res.render('Login', { pageTitle: 'Login'});
}

export const logout = (req, res) => {

  res.render('Logout', { pageTitle: 'Logout'});
}

export const users = (req, res) => {

  res.render('User', { pageTitle: 'User'});
}

export const editProfile = (req, res) => {

  res.render('editProfile', { pageTitle: 'Edit Profile'});
}

export const userDetail = (req, res) => {

  res.render('userDetail', { pageTitle: 'User Detail'});
}

export const changePassword = (req, res) => {

  res.render('changePassword', { pageTitle: 'Change Password'});
}