var mysql = require('mysql');
var http = require('http');
var path = require('path');

// Some constances
const express = require('express')
const app = express()
const port = 3000
// Setup static folder
app.use(express.static(__dirname + "/static/"));
// Creating mysql connection pool
var con  = mysql.createPool({
	connectionLimit : 100,
	host: "localhost",
	user: "root",
	password: "",
	database:"test"
});

// JSON Response of table query
app.get('/data.json', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
	con.query("SELECT * FROM `age_population`", function (err, result) {
		res.write(JSON.stringify(result));
		res.end();
	});
})
// rendering html file.
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
