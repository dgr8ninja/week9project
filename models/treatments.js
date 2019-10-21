'use strict';
module.exports = (sequelize, DataTypes) => {
  const Treatments = sequelize.define('Treatments', {
    treatment_desc: DataTypes.STRING
  }, {});
  Treatments.associate = function(models) {
    // associations can be defined here
  };
  return Treatments;
};