const {
  emailValidator,
  phoneNumberValidator,
  nullValidator,
  typeValidator,
  driverTypeValidator,
} = require("../utils");

const driverOnboardingValidator = (req, res, next) => {
  const { name, email, phone_number, license_number, car_number } = req.body;

  // Checking if there exist missed filed
  const nullErrorMessage = nullValidator({
    name,
    email,
    phone_number,
    license_number,
    car_number,
  });
  if (nullErrorMessage) {
    return res.status(400).send({
      status: "failure",
      reason: nullErrorMessage,
    });
  }

  // Check if there exist a wrong type of required fields
  const typeErrorMessage = driverTypeValidator({
    name,
    email,
    phone_number,
    license_number,
    car_number,
  });
  if (typeErrorMessage) {
    return res
      .status(400)
      .send({ status: "failure", reason: typeErrorMessage });
  }

  // Check if the email address and phone number are valid
  let validityErrorMessage = "";
  if (!emailValidator(email)) {
    validityErrorMessage = "InValid Email Address";
  }
  if (!phoneNumberValidator(phone_number)) {
    validityErrorMessage =
      validityErrorMessage +
      `${validityErrorMessage ? " and " : ""}InValid ${
        phone_number.toString().length
      } digit phone number`;
  }
  if (validityErrorMessage) {
    return res.status(400).send({
      status: "failure",
      reason: validityErrorMessage,
    });
  }
  next();
};

const driverIdAndLocationValidator = (req, res, next) => {
  const {
    body: { latitude, longitude },
    params: { id },
  } = req;

  const driverId = !isNaN(id) ? parseInt(id) : id;
  const driverLat = !isNaN(latitude) ? parseFloat(latitude) : latitude;
  const driverLon = !isNaN(longitude) ? parseFloat(longitude) : longitude;

  // Checking if there exist missed filed
  const nullErrorMessage = nullValidator({
    id: driverId,
    latitude: driverLat,
    longitude: driverLon,
  });
  if (nullErrorMessage) {
    return res.status(400).send({
      status: "failure",
      reason: nullErrorMessage,
    });
  }
  // Check if there exist a wrong type of required fields
  const typeErrorMessage = typeValidator({
    id: driverId,
    latitude: driverLat,
    longitude: driverLon,
  });
  if (typeErrorMessage) {
    return res.status(400).send({
      status: "failure",
      reason: typeErrorMessage,
    });
  }
  next();
};

const passengerLocationValidator = (req, res, next) => {
  const { latitude, longitude } = req.body;
  const passengerLat = !isNaN(latitude) ? parseFloat(latitude) : latitude;
  const passengerLon = !isNaN(longitude) ? parseFloat(longitude) : longitude;

  // Checking if there exist missed filed
  const nullErrorMessage = nullValidator({
    latitude: passengerLat,
    longitude: passengerLon,
  });
  if (nullErrorMessage) {
    return res.status(400).send({
      status: "failure",
      reason: nullErrorMessage,
    });
  }
  // Check if there exist a wrong type of required fields
  const typeErrorMessage = typeValidator({
    latitude: passengerLat,
    longitude: passengerLon,
  });
  if (typeErrorMessage) {
    return res.status(400).send({
      status: "failure",
      reason: typeErrorMessage,
    });
  }
  next();
};

module.exports = {
  driverOnboardingValidator,
  driverIdAndLocationValidator,
  passengerLocationValidator,
};
