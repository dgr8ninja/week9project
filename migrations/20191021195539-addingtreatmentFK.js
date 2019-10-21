'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Symptoms',
      'treatment_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Treatments',
          key: 'id'
        }
      }
    )
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Symptoms',
      'treatment_id'
    )
  }
};