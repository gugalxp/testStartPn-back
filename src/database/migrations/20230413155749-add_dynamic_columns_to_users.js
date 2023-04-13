'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumns('users', {
      // Adicione as colunas dinâmicas aqui
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'nomeDaColuna1');
    await queryInterface.removeColumn('users', 'nomeDaColuna2');
    // Remova as colunas dinâmicas aqui
  }
};
