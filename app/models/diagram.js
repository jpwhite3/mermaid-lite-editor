// Example model


module.exports = function (sequelize, DataTypes) {

    var Diagram = sequelize.define('Diagram', {
        name: DataTypes.STRING,
        encoded_data: DataTypes.STRING(1024)
    }, {
        classMethods: {
            associate: function (models) {
                // example on how to add relations
                // Diagram.hasMany(models.Comments);
            }
        }
    });

    return Diagram;
};

