const { Model, DataTypes } = require('sequelize');
// const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

class FavItem extends Model {}

FavItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    album_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
    },

    condition: {
      type: DataTypes.ENUM('New', 'Good', 'Fair'),
      allowNull: false,
    },

    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    listing_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'listing',
        key: 'id',
      },
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favitem',
  }
);

module.exports = FavItem;
