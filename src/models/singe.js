module.exports = (sequelize, DataTypes) => {
    var Singe = sequelize.define('Singe', {
      name: DataTypes.STRING,
      age: DataTypes.REAL,
      poids: DataTypes.FLOAT,
      sexe: DataTypes.STRING,
      descrition: DataTypes.STRING
    });
  
    return Singe;
  };