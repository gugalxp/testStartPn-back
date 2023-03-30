const Cliente = require("../models/Cliente");
const uuid = require("uuid");
const { Op } = require("sequelize");

module.exports = {
  async searchClient(req, res, next) {
    try {
      const { search } = req.body;
  
      const clients = await Cliente.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ]
        }
      });

      if (clients.length === 0) {
        throw new Error("Nenhum cliente encontrado com o nome ou e-mail informado");
      }

      return res.json(clients);
    } catch (error) {
      return res.json({error: error.message});
    }
  },
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
