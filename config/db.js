const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }).then(() => console.log('MongoDB Connected'))
    .catch(err => {
      console.log.error(err.message);
      //Exit process with failure
      process.exit(1);
    });
}

module.exports = connectDB;