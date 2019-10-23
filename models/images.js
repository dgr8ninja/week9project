'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Images', {
    image: DataTypes.STRING
  }, {});
  Images.associate = function(models) {
    // associations can be defined here
  };
  return Images;
};