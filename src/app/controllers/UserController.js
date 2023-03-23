const User = require("../models/User");
const uuid = require("uuid");
const { hash } = require("bcryptjs");

module.exports = {
  async listUsers(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (err) {
      console.log(err);
    }
  },
  async storage(req, res) {
    try {
      const { name, email, telefone, endereco, password } = req.body;

      const passwordHash = await hash(password, 8);

      const user = await User.create({
        id: uuid.v4(),
        name,
        email,
        telefone,
        endereco,
        password: passwordHash,
      });
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  },
};
