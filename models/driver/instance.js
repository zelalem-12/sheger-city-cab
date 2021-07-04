function register() {
  const driver = this;
  return new Promise(async (resolve, reject) => {
    try {
      const {
        _id: id,
        name,
        email,
        phone_number,
        license_number,
        car_number,
      } = await driver.save();
      resolve({ id, name, email, phone_number, license_number, car_number });
    } catch (err) {
      let message = "";
      if (err && err.message && err.message.split(" ")[1] === "duplicate") {
        message = err
          ? err.message
            ? err.message.split("{")[1]
              ? err.message.split("{")[1].split(":")[0]
              : ""
            : ""
          : "";
      }
      reject({
        status: 400,
        message: message
          ? `Deplicate ${message} isn't allowed`
          : "Internal Server Error",
      });
    }
  });
}

module.exports = {
  register,
};
