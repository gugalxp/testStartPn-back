const Fornecedor = require("../models/Fornecedor");
const uuid = require("uuid");

module.exports = {
  async delete(req, res) {
    try {
      const { id } = req.body;

      const fornecedor = await Fornecedor.destroy({
        where: {
          id: id,
        },
      });
      return res.json(fornecedor);
    } catch (err) {
      console.log(err);
    }
  },
  async update(req, res) {
    try {
      const { id, name, email, telefone, endereco } = req.body;

      const fornecedor = await Fornecedor.update(
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
      return res.json(fornecedor);
    } catch (err) {
      console.log(err);
    }
  },
  async listAll(req, res) {
    const fornecedores = await Fornecedor.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(fornecedores);
  },
  async storage(req, res, next) {
    try {
      const { name, email, telefone, endereco } = req.body;

      const fornecedorExistis = await Fornecedor.findOne({
        where: {
          email: email,
        },
      });
      if (fornecedorExistis !== null) {
        throw new Error("Este e-mail já existe!");
      }

      const fornecedor = await Fornecedor.create({
        id: uuid.v4(),
        name,
        email,
        telefone,
        endereco,
      });
      return res.json(fornecedor);
    } catch (err) {
      next(err);
    }
  },
};
