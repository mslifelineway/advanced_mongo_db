const mongoose = require('mongoose');
const config = require('config');
const host = config.get('db.host');
const port = config.get('db.port');
const dbname = config.get('db.name');

const url = `mongodb://${host}:${port}/${dbname}`;
const rules = {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true,
};
mongoose.connect(url, rules, function (err) {
	if (err) {
		console.log('\n\tDatabase connection failed! Please start the mongodb server.');
		console.log('--------------------------------------------------');
		process.exit(1);
	} else {
		console.log('\n\t', mongoose.connection.readyState, 'DB Connection Successfully');
		console.log('--------------------------------------------------');
	}
});
