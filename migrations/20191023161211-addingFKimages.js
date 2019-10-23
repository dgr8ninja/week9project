'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Treatments',
      'image_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'Images',
          key: 'id'
        }
      }
    )
  },


  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Treatments',
      'image_id'
    )
  }
};

