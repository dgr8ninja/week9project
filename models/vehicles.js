'use strict';
module.exports = (sequelize, DataTypes) => {
  const vehicles = sequelize.define('vehicles', {
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {});
  vehicles.associate = function(models) {
    // associations can be defined here
  };
  return vehicles;
};