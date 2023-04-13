const { Model, DataTypes } = require("sequelize");

class Cliente extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        telefone: DataTypes.STRING,
        endereco: DataTypes.STRING,
        urlImg: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Cliente",
        tableName: "clientes",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'owner'});
  }
}

module.exports = Cliente;
