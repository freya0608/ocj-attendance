
const sequelize = require('./sequelize');

const Sequelize = require('sequelize');

var Comment = sequelize.define('comment',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true
	},
	userId:Sequelize.INTEGER,
	postId:Sequelize.INTEGER,

	content:{
		type: Sequelize.TEXT
	}


},{
	tableName:'comment'
});

module.exports = Comment;

