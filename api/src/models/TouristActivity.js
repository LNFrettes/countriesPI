const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('touristActivity',{
      // Here we use the id by default
        nombre: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        dificultad: { 
          //ENUM allows only to store one of thoose options
          type: DataTypes.ENUM('1', '2', '3', '4', '5'),
          allowNull: false,
        },
        duracion: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        temporada: { 
          type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
        }
      })
    
};