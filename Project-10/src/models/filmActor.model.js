const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FilmActor = sequelize.define(
  'FilmActor',
  {
    actor_id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      allowNull: false,
    },
    film_id: {
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
    tableName: 'film_actor',
  }
);

module.exports = FilmActor;
