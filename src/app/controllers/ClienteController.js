const Cliente = require('../models/Cliente');

module.exports = {
    async updateCliente(req, res){
        const { id, name, email, telefone, endereco } = req.body;

        const cliente = await Cliente.update(
        {
             name, 
             email, 
             telefone, 
             endereco 
        },
        {
            where: {
                id: id
            }
        })
        return res.json(cliente);
    },
    async listClientes(req, res){
        const clientes = await Cliente.findAll({
            order: [[ 'id', 'ASC']]
        });

        return res.json(clientes);
    },
    
    async storage(req, res){
        const { name, email, telefone, endereco } = req.body;

        const cliente = await Cliente.create({ name, email, telefone, endereco })
        return res.json(cliente);
    }
}