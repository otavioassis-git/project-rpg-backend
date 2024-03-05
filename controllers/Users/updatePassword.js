const User = require("../../models/user");
const bcrypt = require("bcrypt");

async function updatePassword(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user)
      res.status(404).send({ success: false, error: "user not found" });
    else {
      bcrypt.compare(
        req.body.password,
        user.password,
        async function (err, result) {
          if (!result) {
            res
              .status(401)
              .send({ success: false, error: "previous password is wrong" });
          } else {
            await User.update(
              { password: bcrypt.hashSync(req.body.newPassword, 10) },
              {
                where: {
                  email: req.body.email,
                },
              }
            );
            res.send({ success: true });
          }
        }
      );
    }
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
}

module.exports = updatePassword;
