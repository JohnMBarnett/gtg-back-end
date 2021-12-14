const Users = require("./routes/users/user-model");
const bcrypt = require("bcryptjs");

const validateBody = (req, res, next) => {
  const test = req.body;

  if (!test.password) {
    return res.status(401).json({ message: "username and password required" });
  }
  if (!test.username) {
    return res.status(401).json({ message: "username and password required" });
  }

  next();
};

const checkUserFree = async (req, res, next) => {
  const { username, user_email } = req.body;

  const [user] = await Users.getBy({ username });
  const [email] = await Users.getBy({ user_email });

  if (user) {
    return res.status(401).json({ message: "username taken" });
  } else if (email) {
      return res.status(401).json({ message: "email taken" });
  }

  next();
};

const checkUserExists = async (req, res, next) => {
  const { username, password } = req.body;

  const [user] = await Users.getBy({ username });

  if (user && bcrypt.compareSync(password, user.password)) {
    next();
  } else {
    return res.status(401).json({ message: "invalid credentials" });
  }
};

const validateUserEdit = (req, res, next) => {
  const user = req.body;

  if (user.password) {
    const hash = bcrypt.hashSync(user.password, 4);
    user.password = hash;
  }

  if (!user.password && !user.username) {
    return res
      .status(401)
      .json({ message: "Must change username or password" });
  }
  next();
};

module.exports = {
  validateBody,
  checkUserFree,
  checkUserExists,
  validateUserEdit,
};
