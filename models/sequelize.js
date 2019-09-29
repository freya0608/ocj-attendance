const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	database: 'safety',
	username: 'root',
	password: 'freya123',
	host: 'localhost',
	define:{
		freezeTableName:true
	},
	dialect:  'mysql'
});

 module.exports = sequelize;
