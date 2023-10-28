const { constants } = require('buffer')
const mongoose = require('mongoose')
const { configDotenv } = require('dotenv');

configDotenv();


const connectDB = async () => {
  try {
      console.log(process.env.GOOGLE_CLIENT_ID);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB