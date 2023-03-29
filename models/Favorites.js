const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');

const sequelize = require('../config/connection');

class Favorites extends Model {
  // checkPassword(loginPw) {
  //   return bcrypt.compareSync(loginPw, this.password);
  // }
}

Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    favitem_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'favitem',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favorites',
  }
);

module.exports = Favorites;
