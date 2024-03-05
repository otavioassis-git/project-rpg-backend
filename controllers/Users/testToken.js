var jwt = require("jsonwebtoken");

function testToken(req, res) {
  if (!req.body.token) res.status(400).send("token was not sent");
  if (!req.body.email) res.status(400).send("email was not sent");
  else {
    const token = req.body.token;
    const email = req.body.email;
    try {
      var decoded = jwt.verify(token, process.env.LOGIN_TOKEN);
      if (decoded.email == email) res.send("valid token");
      else res.status(401).send("invalid token");
    } catch (err) {
      res.status(401).send("invalid token");
    }
  }
}

module.exports = testToken;
