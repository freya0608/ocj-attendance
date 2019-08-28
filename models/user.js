const sequelize = require('./sequelize');

const Sequelize = require('sequelize');
const Fee = require('./fee');
const Duty = require('./duty');
const User = sequelize.define('User',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true
	},
	userId:Sequelize.INTEGER,
	managerId:Sequelize.INTEGER,
	feeTime:Sequelize.FLOAT,
	dutyTime:Sequelize.FLOAT,
	isDelete:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	}
},{
	tableName:'User',
	defaultScope: {
		where: {
			IsDelete: false
		},
		attributes: { exclude: ['PassWord'] }
	},
});
console.log(Duty);
Fee.belongsTo(User);
Duty.belongsTo(User);

module.exports = User;

