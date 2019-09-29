const mysql = require('mysql');
exports.getConnection = function(){
	let connection = mysql.createConnection({
		host: 'localhost',
		database: 'safety',
		user: 'root',
		password: 'freya123',
		// password: 'Uxd123',
	});
	connection.connect();
	return connection;
};



