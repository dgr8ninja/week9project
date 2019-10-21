'use strict';
module.exports = (sequelize, DataTypes) => {
  const Symptom_history = sequelize.define('Symptom_history', {
    user_id: DataTypes.INTEGER,
    symptom_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {});
  Symptom_history.associate = function(models) {
    // associations can be defined here
  };
  return Symptom_history;
};