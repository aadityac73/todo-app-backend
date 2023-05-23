const { createUser, userLogin, userLogout } = require('../service/authService');

exports.register = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, password } = req.body;
  const user = await createUser({
    firstName,
    lastName,
    email,
    mobileNumber,
    password
  });
  return res.status(200).json({ message: 'Registered successfully' });
};

exports.login = async (req, res) => {
  const [error, data] = await userLogin({
    username: req.body.username,
    password: req.body.password
  });
  if(error) {
    return res.status(200).json({message: error.message})
  }
  return res.status(200).json(data);
};

exports.logout = async (req, res) => {
  const isLoggedOut = await userLogout(req.headers.authorization);
  if(isLoggedOut) {
    return res.status(200).json({ message: 'Successfully logged out' });
  }
  return res.status(400).json({ message: 'Invalid user' });
};
