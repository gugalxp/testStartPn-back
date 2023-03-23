const Cliente = require("../models/Cliente");
const uuid = require("uuid");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.body;

      const cliente = await Cliente.destroy({
        where: {
          id: id,
        },
      });
      return res.json(cliente);
    } catch (err) {
      console.log(err);
    }
  },
  async update(req, res) {
    try {
      const { id, name, email, telefone, endereco } = req.body;

      const cliente = await Cliente.update(
        {
          name,
          email,
          telefone,
          endereco,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.json(cliente);
    } catch (err) {
      console.log(err);
    }
  },
  async listAll(req, res) {
    try {
      const clientes = await Cliente.findAll({
        order: [["id", "ASC"]],
      });

      return res.json(clientes);
    } catch (err) {
      console.log(err);
    }
  },
  async storage(req, res, next) {
    try {
      const { name, email, telefone, endereco } = req.body;

      const clientExistis = await Cliente.findOne({
        where: {
          email: email,
        },
      });
      if (clientExistis !== null) {
        throw new Error("Este e-mail já existe!");
      }

      const cliente = await Cliente.create({
        id: uuid.v4(),
        name,
        email,
        telefone,
        endereco,
      });
      return res.json(cliente);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },
};
