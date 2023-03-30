const User = require("../models/User");
const uuid = require("uuid");
const { hash } = require("bcryptjs");

module.exports = {
  async updatePassword(req, res, next) {
    try {
      const { id, newPassword } = req.body;

      const passwordHash = await hash(newPassword, 8);

      const user = await User.update(
        {
          password: passwordHash,
        },
        {
          where: {
            id: id,
          },
        }
      );
      next();

      return res.json({ message: "Senha atualizada com sucesso!"});
    } catch (err) {
      next(err)
      console.log(err);
    }
  },
  async detailsUser(req, res, next) {
    try {
      const userExists = await User.findOne({
        where: {
          id: req.id,
        },
      });

      if (userExists === null) {
        throw new Error("Usuario não encontrado!");
      }
      next()
      return res.json(userExists);
    } catch (err) {
      next(err)
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