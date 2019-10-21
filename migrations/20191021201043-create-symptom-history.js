'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Symptom_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            field: "id"
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
       
      },
      symptom_id: {
        
        type: Sequelize.INTEGER,
        references: {
          model: "Symptoms",
          field: "id"
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
     
    },
    status_id: {
        
      type: Sequelize.INTEGER,
      references: {
        model: "Statuses",
        field: "id"
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
   
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Symptom_histories');
  }
};