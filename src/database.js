const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '66.97.38.48',
    user: 'tests',
    password: 'apuSP!',
    database: 'dbInstructores',
    multipleStatements: true
});

mysqlConnection.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('db esta conectada');
    }
});

module.exports = mysqlConnection;