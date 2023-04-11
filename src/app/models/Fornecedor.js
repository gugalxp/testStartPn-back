const { Model, DataTypes } = require("sequelize");

class Fornecedor extends Model {
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
        modelName: "Fornecedor",
        tableName: "fornecedores",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "userId", as: "owner" });
  }
}

module.exports = Fornecedor;
