const sequelize = require('./sequelize');

const Sequelize = require('sequelize');

const Duty = sequelize.define('duty',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true
	},
	userId:Sequelize.INTEGER,
	end:{
		type: Sequelize.DATE
	},
	start:{
		type: Sequelize.DATE
	},
	time:{
		type: Sequelize.FLOAT
	},
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
	tableName:'duty',
	defaultScope: {
		where: {
			IsDelete: false
		},
	},
});

module.exports = Duty;

