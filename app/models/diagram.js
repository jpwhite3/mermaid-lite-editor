// Example model


module.exports = function (sequelize, DataTypes) {

  var Diagram = sequelize.define('Diagram', {
    encoded_data: DataTypes.STRING(1024)
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Diagram;
};

