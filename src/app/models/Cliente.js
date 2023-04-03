const { Model, DataTypes} = require('sequelize');

class Cliente extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            endereco: DataTypes.STRING,
            urlImg: DataTypes.BLOB,
        },
        {
            sequelize,
            modelName: 'Cliente',
            tableName: 'clientes',
        }) 
    }   
}

module.exports = Cliente;