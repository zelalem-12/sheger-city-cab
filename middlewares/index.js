const { emailValidator, phoneNumberValidator } = require("../utils");

const driverOnboardingValidator = (req, res, next) => {
  const { name, email, phone_number, license_number, car_number } = req.body;

  // Checking if there exist missed filed
  const newDriver = { name, email, phone_number, license_number, car_number };
  const missedFields = [];
  for (const [key, value] of Object.entries(newDriver)) {
    if (value !== false && !value) missedFields.push(key);
  }

  if (missedFields.length !== 0) {
    let message = "";
    const lastField = missedFields.pop();
    message = missedFields.length
      ? `${missedFields.toString()} and ${lastField}  are required`
      : `${lastField} is required`;
    return res.status(400).send({
      status: "failure",
      reason: message,
    });
  }

  // Check if there exist a wrong type of required fields
  const wrongTypedFields = [];
  for (const [key, value] of Object.entries(newDriver)) {
    if (key === "phone_number" && typeof value !== "number")
      wrongTypedFields.push(key);
    else if (key !== "phone_number" && typeof value !== "string")
      wrongTypedFields.push(key);
  }

  if (wrongTypedFields.length !== 0) {
    let message = "";

    const phoneNumError = wrongTypedFields.splice(
      wrongTypedFields.indexOf("phone_number"),
      wrongTypedFields.indexOf("phone_number") === -1 ? 0 : 1
    )[0];

    const lastField = wrongTypedFields.pop();

    message = phoneNumError
      ? wrongTypedFields.length
        ? `${wrongTypedFields.toString()} and ${lastField} should be string and phone_number should be numeric `
        : `${
            lastField
              ? `${lastField} should string and phone_number should be numeric`
              : "phone_number should be numeric"
          }`
      : wrongTypedFields.length
      ? `${wrongTypedFields.toString()} and ${lastField} should be string  `
      : `${lastField} should string`;

    return res.status(400).send({
      status: "failure",
      reason: message,
    });
  }

  // Check if the email address and phone number are valid
  let emailAndPhoneValidity = "";
  if (!emailValidator(email)) {
    emailAndPhoneValidity = "InValid Email Address";
  }
  if (!phoneNumberValidator(phone_number)) {
    emailAndPhoneValidity =
      emailAndPhoneValidity +
      `${emailAndPhoneValidity ? " and " : ""}InValid ${
        phone_number.toString().length
      } digit phone number`;
  }
  if (emailAndPhoneValidity) {
    return res.status(400).send({
      status: "failure",
      reason: emailAndPhoneValidity,
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
  const missedFields = [];
  const locationAndId = {
    id: driverId,
    latitude: driverLat,
    longitude: driverLon,
  };
  for (const [key, value] of Object.entries(locationAndId)) {
    if (value !== false && !value) missedFields.push(key);
  }
  if (missedFields.length !== 0) {
    let message = "";
    const lastField = missedFields.pop();
    message = missedFields.length
      ? `${missedFields.toString()} and ${lastField} are required`
      : `${lastField} is required`;
    return res.status(400).send({
      status: "failure",
      reason: message,
    });
  }

  // Check if there exist a wrong type of required fields
  const wrongTypedFields = [];
  for (const [key, value] of Object.entries(locationAndId)) {
    if (typeof value !== "number") wrongTypedFields.push(key);
  }

  if (wrongTypedFields.length !== 0) {
    let message = "";
    const lastField = wrongTypedFields.pop();
    message = wrongTypedFields.length
      ? `${wrongTypedFields.toString()} and ${lastField} should be numeric`
      : `${lastField} should be numeric`;
    return res.status(400).send({
      status: "failure",
      reason: message,
    });
  }
  next();
};

const passengerLocationValidator = (req, res, next) => {
  const { latitude, longitude } = req.body;
  const passengerLat = !isNaN(latitude) ? parseFloat(latitude) : latitude;
  const passengerLon = !isNaN(longitude) ? parseFloat(longitude) : longitude;

  // Checking if there exist missed filed
  const missedFields = [];
  const passengerLocation = { latitude: passengerLat, longitude: passengerLon };
  for (const [key, value] of Object.entries(passengerLocation)) {
    if (value !== false && !value) missedFields.push(key);
  }
  if (missedFields.length !== 0) {
    let message = "";
    const lastField = missedFields.pop();
    message = missedFields.length
      ? `${missedFields.toString()} and ${lastField} are required`
      : `${lastField} is required`;
    return res.status(400).send({
      status: "failure",
      reason: message,
    });
  }

  // Check if there exist a wrong type of required fields
  const wrongTypedFields = [];
  for (const [key, value] of Object.entries(passengerLocation)) {
    if (typeof value !== "number") wrongTypedFields.push(key);
  }
  if (wrongTypedFields.length !== 0) {
    let message = "";
    const lastField = wrongTypedFields.pop();
    message = wrongTypedFields.length
      ? `${wrongTypedFields.toString()} and ${lastField} should be numeric`
      : `${lastField} should be numeric`;
    return res.status(400).send({
      status: "failure",
      reason: message,
    });
  }
  next();
};

module.exports = {
  driverOnboardingValidator,
  driverIdAndLocationValidator,
  passengerLocationValidator,
};
