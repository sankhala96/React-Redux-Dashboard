const config = require("config");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) {
    res.status(401);
    res.json({ msg: "No Token, authorization denied" });
    return;
  }

  try {
    // Verify Token
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400);
    res.json({ msg: "Token is not valid" });
    return;
  }
};

module.exports = auth;
