/* const Sequelize = require('sequelize');
const sequelize = require('../config/connection');
const CartItem = sequelize.define('cartItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: Sequelize.INTEGER
});
module.exports = CartItem; */

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CartItem extends Model {}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        // cloning FavItem approach!!!
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
        modelName: 'cartitem',
      }
);

module.exports = CartItem;