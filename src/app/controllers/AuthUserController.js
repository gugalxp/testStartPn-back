const User = require("../models/User");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
  async authUserService(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (user == null) {
        throw new Error("Email/senha incorreto");
      }

      const passwordMatch = await compare(password, user.password);
      console.log(passwordMatch);

      if (!passwordMatch) {
        throw new Error("Email/senha incorreto");
      }

      const token = sign(
        {
          name: user.name,
          email: user.email,
        },
        "4da87c28b002243bc25fff6b2a4b7fd6",
        {
          subject: user.id,
          expiresIn: "30d",
        }
      );

      return res.json({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        endereco: user?.endereco,
        token: token,
      });
    } catch (err) {
      console.log(err);

      next(err);
    }
  },
};
