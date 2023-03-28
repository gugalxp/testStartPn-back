const User = require("../models/User");
const uuid = require("uuid");
const { hash } = require("bcryptjs");

module.exports = {
  async detailsUser(req, res) {
    try {
      const userExists = await User.findOne({
        where: {
          id: req.id,
        },
      });

      return res.json(userExists);
    } catch (err) {
      console.log(err);
    }
  },
  async listUsers(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  },
  async storage(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({
        where: {
          email: email,
        },
      });

      if (userExists !== null) {
        throw new Error("Este e-mail já existe!");
      }

      const passwordHash = await hash(password, 8);

      const user = await User.create({
        id: uuid.v4(),
        name,
        email,
        password: passwordHash,
      });
      return res.json(user);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },
};
