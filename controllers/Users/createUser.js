const User = require("../../models/user");
var jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ email: user.email }, process.env.LOGIN_TOKEN);
    res.send({ success: true, email: user.emal, token });
  } catch (error) {
    if (error.errors[0])
      res
        .status(400)
        .send({ success: false, error: "e-mail already registered" });
  }
}

module.exports = createUser;
