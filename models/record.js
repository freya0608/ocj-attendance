const sequelize = require('./sequelize');

const Sequelize = require('sequelize');

const Record = sequelize.define('record',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true
	},
	userId:Sequelize.INTEGER,
	createdAt:Sequelize.DATE,
	isDelete:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	},
	isPass:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	},


},{
	tableName:'record',
	defaultScope: {
		where: {
			IsDelete: false
		},
	},
});

module.exports = Record;

