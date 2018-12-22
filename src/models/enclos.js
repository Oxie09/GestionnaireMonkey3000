module.exports = (sequelize, DataTypes) => {
    var Enclos = sequelize.define('Enclos', {
      nom: DataTypes.STRING,
      taille: DataTypes.REAL,
      nb_singes: DataTypes.REAL,
      capacite_max: DataTypes.REAL,
	  description: DataTypes.STRING

    });
  
    return Enclos;
  };