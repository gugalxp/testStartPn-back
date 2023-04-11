const { Model, DataTypes} = require('sequelize');

class User extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
        }) 
    }   
    static associate(models) {
        this.belongsToMany(models.Cliente, { foreignKey: 'userId', through: 'clientId', as: 'users'});
    }
}

module.exports = User;