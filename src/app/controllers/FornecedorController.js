const Fornecedor = require("../models/Fornecedor");
const uuid = require("uuid");
const { Op } = require("sequelize");

module.exports = {
  async searchSupplier(req, res, next) {
    try {
      const { search } = req.body;

      const supplier = await Fornecedor.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        },
      });

      if (supplier.length === 0) {
        throw new Error("Nenhum Fornecedor encontrado com o nome ou e-mail informado");
      }

      return res.json(supplier);
    } catch (error) {
      return res.json({error: error.message});
    }
  },
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
