const { modelsName, constants } = require("../../utils");

function shareDriverLocation(driverId, latitude, longitude) {
  const Driver = this.model(modelsName.DRIVER);

  return new Promise(async (resolve, reject) => {
    try {
      const driverUpdated = await Driver.findOneAndUpdate(
        { _id: driverId },
        { $set: { latitude, longitude } },
        { new: true }
      );
      resolve(driverUpdated);
    } catch (err) {
      reject({ status: 400, message: err.message || "Internal Server Error" });
    }
  });
}

function getNearbyCabs(passengerLatitude, passengerLongitude) {
  const Driver = this.model(modelsName.DRIVER);
  return new Promise(async (resolve, reject) => {
    Driver.aggregate([
      {
        $match: {
          $and: [
            { latitude: { $exists: true } },
            { longitude: { $exists: true } },
          ],
        },
      },
      {
        $addFields: {
          driver_distance: {
            $multiply: [
              2,
              constants.EARTH_RADIUS,
              {
                $asin: {
                  $sqrt: {
                    $add: [
                      {
                        $pow: [
                          {
                            $sin: {
                              $divide: [
                                {
                                  $degreesToRadians: {
                                    $subtract: ["$latitude", passengerLatitude],
                                  },
                                },
                                2,
                              ],
                            },
                          },
                          2,
                        ],
                      },
                      {
                        $multiply: [
                          { $cos: { $degreesToRadians: passengerLatitude } },
                          { $cos: { $degreesToRadians: "$latitude" } },
                          {
                            $pow: [
                              {
                                $sin: {
                                  $divide: [
                                    {
                                      $degreesToRadians: {
                                        $subtract: [
                                          "$longitude",
                                          passengerLongitude,
                                        ],
                                      },
                                    },
                                    2,
                                  ],
                                },
                              },
                              2,
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          $expr: { $lte: ["$driver_distance", constants.FARTHEST_NEARBY_CABS] },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          car_number: 1,
          phone_number: 1,
        },
      },
    ]).exec((err, available_cabs) => {
      if (err) {
        reject({
          status: 400,
          message: err.message || "Internal Server Error",
        });
      } else {
        resolve(available_cabs);
      }
    });
  });
}

module.exports = {
  shareDriverLocation,
  getNearbyCabs,
};
