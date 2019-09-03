const sequelize = require('./sequelize');

const Sequelize = require('sequelize');

const Fee = sequelize.define('fee',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	userId:{
		type:Sequelize.INTEGER,
		references: {
			model: 'user',
			key: 'userId'
		}
	},
	end:{
		type: Sequelize.DATE
	},
	start:{
		type: Sequelize.DATE
	},
	time:{
		type: Sequelize.FLOAT
	},
	isDelete:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	},
	isPass:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	},


},{
	tableName:'fee',
	defaultScope: {
		where: {
			IsDelete: 0
		},
	}
});

module.exports = Fee;

