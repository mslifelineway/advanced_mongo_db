const mongoose = require('mongoose');
const config = require('config');
const host = config.get("db.host");
const port = config.get("db.port");
const dbname = config.get("db.name");

const url = `mongodb://${host}:${port}/${dbname}`;
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
      console.log("Error While Connecting The DB",err);
      process.exit(1);
    }
    else {
      console.log(mongoose.connection.readyState,'DB Connection Successfully');
    }
})
