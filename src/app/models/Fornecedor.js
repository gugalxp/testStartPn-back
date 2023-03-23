const { Model, DataTypes} = require('sequelize');

class Fornecedor extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            endereco: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Fornecedor',
            tableName: 'fornecedores',
        }) 
    }   
}

module.exports = Fornecedor;