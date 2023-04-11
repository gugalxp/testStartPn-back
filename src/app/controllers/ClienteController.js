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
          ],
        },
      });

      if (clients.length === 0) {
        throw new Error(
          "Nenhum cliente encontrado com o nome ou e-mail informado"
        );
      }

      return res.json(clients);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      const cliente = await Cliente.destroy({
        where: {
          id: id,
        },
      });

      return res.json(cliente);
    } catch (err) {
      next(err);
    }
  },

  async deleteAll(req, res, next) {
    try {
      await Cliente.destroy({
        where: {},
        truncate: true,
      });
      return res.json({
        message: "Todos os clientes foram excluídos com sucesso!",
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { name, email, telefone, endereco, urlImg } = req.body;
      const { id } = req.params;

      const cliente = await Cliente.update(
        {
          name,
          email,
          telefone,
          endereco,
          urlImg
        },
        {
          where: {
            id: id,
          },
        }
      );
      return res.json(cliente);
    } catch (err) {
      next(err);
    }
  },
  async listAll(req, res, next) {
    try {
      const { id } = req.params
      console.log(`ID do usuário: ${id}`);

      const clientes = await Cliente.findAll({
        order: [["id", "ASC"]],
        where:{
          userId: id
        }
      });

      return res.json(clientes);
    } catch (err) {
      next(err);
    }
  },
  async storage(req, res, next) {
    try {
      const { name, email, telefone, endereco, urlImg, id } = req.body;

      const clientExistis = await Cliente.findOne({
        where: {
          email: email,
          userId: id
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
        urlImg,
        userId: id
      });
      return res.json(cliente);
    } catch (err) {
      next(err);
      console.log(err);
    }
  },
};
