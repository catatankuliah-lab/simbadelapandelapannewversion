const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('simbav3', 'itssimbav3', 'Z7vV0Afy5fH9AzEmVkmq', {
  host: '195.35.7.27',
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000 // 60 seconds
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
