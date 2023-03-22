const User = require('../models/User');

module.exports = {
    async listUsers(req, res){
        const users = await User.findAll();

        return res.json(users);
    },
    async storage(req, res){
        const { name, email, telefone, endereco, password } = req.body;

        const user = await User.create({ name, email, telefone, endereco, password })
        return res.json(user);
    }
}