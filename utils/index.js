const mongoose = require("mongoose");

const modelsName = {
  DRIVER: "Driver",
};
const constants = {
  EARTH_RADIUS: 6371, // Eearth Radius in kilometre
  FARTHEST_NEARBY_CABS: 4, // The farthest Nearby driver location in kilometre
};

const emailValidator = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

const phoneNumberValidator = (phone_number) => {
  const stringPhoneNumber = phone_number.toString();
  return stringPhoneNumber.length === 10 ? true : false;
};

const connectToDb = () => {
  const mongoUser = process.env.MONGO_USER || null;
  const mongoPassword = process.MONGO_PASSWORD || null;
  const options = {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  if (mongoUser && mongoPassword) {
    options.auth = { user: mongoUser, password: mongoPassword };
  }
  const mongoUrl =
    process.env.MONGODB_URL ||
    "mongodb+srv://test_user:gJcqTdeOLk6kqsZ6@cluster0.jgafy.mongodb.net/cabSearchSystem?retryWrites=true&w=majority";
  mongoose
    .connect(mongoUrl, options)
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.log("Database connection failed");
      console.log(err);
    });

  return mongoose.connection;
};

module.exports = {
  constants,
  modelsName,
  emailValidator,
  phoneNumberValidator,
  connectToDb,
};
