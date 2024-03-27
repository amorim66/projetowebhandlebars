const Sequelize = require("sequelize")
const sequelize = new Sequelize("sistemaweb","root","",{
    host: "localhost",
    port: 3307,
    dialect: "mysql"
})

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}