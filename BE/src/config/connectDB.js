const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodejs_ecommerce', 'root', 'long18920', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
})

let connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connect to database SUCCESS")
    } catch (error) {
        console.error("Connect to database " + error)
    }
}

export default connectDB