const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { emailValidator, phoneNumberValidator } = require("../../utils");

const DriverSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: Number, required: true, unique: true },
  license_number: { type: String, required: true, unique: true },
  car_number: { type: String, required: true, unique: true },
  latitude: { type: Number },
  longitude: { type: Number },
});

DriverSchema.path("email").validate(
  emailValidator,
  "Enter Valid Email Address"
);

DriverSchema.path("phone_number").validate(
  phoneNumberValidator,
  "Enter Valid  10  digit phone number"
);
module.exports = DriverSchema;
