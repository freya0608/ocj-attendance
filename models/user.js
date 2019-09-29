const sequelize = require('./sequelize');

const Sequelize = require('sequelize');
const Fee = require('./fee');
const Duty = require('./duty');
const Record = require('./record');
const Leave = require('./leave');
const User = sequelize.define('User',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true
	},
	userId:Sequelize.INTEGER,
	managerId:{type:Sequelize.INTEGER,
		references: {
			model: 'User',
			key: 'managerId'
		},
	},
	username:Sequelize.STRING,
	feeTime:Sequelize.FLOAT,
	dutyTime:Sequelize.FLOAT,
	isDelete:{
		type:Sequelize.BOOLEAN,
		defaultValue:0
	},
	email:Sequelize.STRING,

},{
	tableName:'User',
	defaultScope: {
		where: {
			IsDelete: 0
		},
		attributes: { exclude: ['PassWord'] }
	},
	// classMethods: {
	// 	associate() {
	//
	// 	}
	// }
});
console.log('User',User)
console.log(Duty);
// User.belongsTo(User,{foreignKey: 'managerId',as:'managerUser'});

User.hasMany(Fee,{ foreignKey: 'userId', as: 'Fee', sourceKey: 'userId'});
User.hasMany(Duty,{ foreignKey: 'userId', as: 'Duty',sourceKey: 'userId' });
User.hasMany(Record,{ foreignKey: 'userId', as: 'Record',sourceKey: 'userId' });
User.hasMany(Leave,{ foreignKey: 'userId', as: 'Leave',sourceKey: 'userId' });



module.exports = User;

