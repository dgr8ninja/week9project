'use strict';
module.exports = (sequelize, DataTypes) => {
  const Symptoms = sequelize.define('Symptoms', {
    symptom_name: DataTypes.STRING,
    symptom_desc: DataTypes.STRING
  }, {});
  Symptoms.associate = function(models) {
    // associations can be defined here
  };
  return Symptoms;
};