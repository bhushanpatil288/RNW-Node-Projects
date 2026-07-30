const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FilmCategory = sequelize.define(
  'FilmCategory',
  {
    film_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'film_category',
  }
);

module.exports = FilmCategory;
