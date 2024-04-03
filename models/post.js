const db = require('./banco');
const { DataTypes } = require('sequelize');

const Agendamentos = db.sequelize.define("agendamentos", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    origem: {
        type: db.Sequelize.STRING
    },
    data_contato: {
        type: db.Sequelize.STRING
    },
    observacao: {
        type: db.Sequelize.TEXT
    }
})

module.exports = Agendamentos


//Agendamentos.sync({force: true})