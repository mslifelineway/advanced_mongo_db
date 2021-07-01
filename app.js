require('dotenv').config();
require('./src/database/mongoose');
const config = require('config');
const express = require('express');
const fs = require('fs');
const router = express.Router();

const port = config.get('server.port');
const host = config.get('server.host');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

fs.readdirSync(__dirname + '/src/routes').forEach(function (file) {
	if (file.substr(file.lastIndexOf('.') + 1) !== 'js') return;
	const name = file.substr(0, file.indexOf('.'));
	const route = require('./src/routes/' + name)(router, app);
	app.use('/api', route);
});

app.listen(port, host, (err) => {
	if (err) {
		console.log('\n##### server not started due to : ', err);
		process.exit(1);
	}
	console.log('\n\n################ Server is listening on port *' + port);
});
