const User = require("../models/User");
const uuid = require("uuid");
const { hash } = require("bcryptjs");

module.exports = {
  // async deleteAll(req, res, next) {
  //   try {
  //     await User.destroy({
  //       where: {},
  //       truncate: true,
  //     });
  //     return res.json({
  //       message: "Todos os clientes foram excluídos com sucesso!",
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  async update(req, res, next) {
    try {
      const { name, email, telefone, urlImg } = req.body;
      console.log("A URL DA IMAGEM DO PERFIL É ESSA: ", urlImg);
      const { id } = req.params;

      const user = await User.update(
        {
          name,
          email,
          telefone,
          urlImg
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.json(user);
    } catch (err) {
      next(err);
    }
  },
  async updatePassword(req, res, next) {
    try {
      const { newPassword } = req.body;
      const { id } = req.params;

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

      return res.json({ message: "Senha atualizada com sucesso!" });
    } catch (err) {
      next(err);
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
      next();
      return res.json(userExists);
    } catch (err) {
      next(err);
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
