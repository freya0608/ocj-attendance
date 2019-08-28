const sequelize = require('./sequelize');

const Sequelize = require('sequelize');

const Leave = sequelize.define('leave',{
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
	isDelete:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	},
	createdAt:Sequelize.DATE,
	isPass:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	},

},{
	tableName:'leave',
	defaultScope: {
		where: {
			IsDelete: false
		},
	},
});

module.exports = Leave;

