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

const nullValidator = (requestBody) => {
  const missedFields = [];
  let message = "";
  for (const [key, value] of Object.entries(requestBody)) {
    if (value !== false && !value) missedFields.push(key);
  }
  if (missedFields.length !== 0) {
    const lastField = missedFields.pop();
    message = missedFields.length
      ? `${missedFields.toString()} and ${lastField} are required`
      : `${lastField} is required`;
  }
  return message;
};

const typeValidator = (requestBody) => {
  const wrongTypedFields = [];
  let message = "";
  for (const [key, value] of Object.entries(requestBody)) {
    if (typeof value !== "number") wrongTypedFields.push(key);
  }

  if (wrongTypedFields.length !== 0) {
    const lastField = wrongTypedFields.pop();
    message = wrongTypedFields.length
      ? `${wrongTypedFields.toString()} and ${lastField} should be numeric`
      : `${lastField} should be numeric`;
    return message;
  }
};

const driverTypeValidator = (requestBody) => {
  const wrongTypedFields = [];
  let message = "";
  for (const [key, value] of Object.entries(requestBody)) {
    if (key === "phone_number" && typeof value !== "number")
      wrongTypedFields.push(key);
    else if (key !== "phone_number" && typeof value !== "string")
      wrongTypedFields.push(key);
  }

  if (wrongTypedFields.length !== 0) {
    const phoneNumError = wrongTypedFields.splice(
      wrongTypedFields.indexOf("phone_number"),
      wrongTypedFields.indexOf("phone_number") === -1 ? 0 : 1
    )[0];

    const lastField = wrongTypedFields.pop();

    message = phoneNumError
      ? wrongTypedFields.length
        ? `${wrongTypedFields.toString()} and ${lastField} should be string and phone_number should be numeric `
        : `${lastField
          ? `${lastField} should string and phone_number should be numeric`
          : "phone_number should be numeric"
        }`
      : wrongTypedFields.length
        ? `${wrongTypedFields.toString()} and ${lastField} should be string  `
        : `${lastField} should string`;

    return message;
  }
};

module.exports = {
  constants,
  modelsName,
  emailValidator,
  phoneNumberValidator,
  nullValidator,
  typeValidator,
  driverTypeValidator,
};
