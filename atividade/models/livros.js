const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Livros = db.define('Livros', {
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        require: true
    },
    capaDura: {
        type: DataTypes.BOOLEAN
    },
    preco: {
        type: DataTypes.FLOAT,
        require: true
    }
})

module.exports = Livros