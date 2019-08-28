const sequelize = require('./sequelize');

const Sequelize = require('sequelize');

var Post = sequelize.define('post',{
	id:{
		type:Sequelize.INTEGER,
		primaryKey: true
	},
	title:{
		type: Sequelize.STRING(256)
	},
	imgUrl:{
		type: Sequelize.STRING(256)
	},
	content:{
		type: Sequelize.TEXT
	}


},{
	tableName:'post'
});

module.exports = Post;
