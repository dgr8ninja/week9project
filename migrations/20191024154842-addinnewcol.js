'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Symptom_histories',
      'user_input', {
        type: Sequelize.STRING,        
      }
    )
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Symptom_histories',
      'user_input'
    )
  }
};
