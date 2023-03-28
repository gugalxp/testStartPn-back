const { verify } = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, "4da87c28b002243bc25fff6b2a4b7fd6");
    req.id = sub;
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}

module.exports = isAuthenticated;
