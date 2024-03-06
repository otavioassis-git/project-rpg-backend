const User = require("../../models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user)
      res.status(400).send({ success: false, error: "email not found" });
    else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (!result) {
          res.status(400).send({ success: false, error: "wrong password" });
        } else {
          const token = jwt.sign(
            { email: user.email },
            process.env.LOGIN_TOKEN
          );
          res.send({
            success: true,
            id: user.id,
            username: user.username,
            email: user.email,
            token,
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, error });
  }
}

module.exports = login;
