const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('livros', 'aluno_medio', '@lunoSenai23.', {
    host: '127.0.0.1',
    port: '3306', //porta que o banco está disponível
    dialect: 'mysql' // Tipo/nome do banco de dados utilizado
})

// try {
//     sequelize.authenticate()
//     console.log('Conectado')
// } catch (error) {
//     console.log(error)
// }

module.exports = sequelize