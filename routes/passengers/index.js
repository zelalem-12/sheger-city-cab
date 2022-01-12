const express = require("express");
const router = express.Router();
const Driver = require("../../models/driver");
const { passengerLocationValidator } = require("../../middlewares");

/* Get Nearby Cabs */
router.post("/available_cabs", passengerLocationValidator, async (req, res) => {
    const { latitude, longitude } = req.body;
    const passengerLat = parseFloat(latitude);
    const passengerLon = parseFloat(longitude);
    try {
        const available_cabs = await Driver.getNearbyCabs(
            passengerLat,
            passengerLon
        );
        const responseBody =
            available_cabs.length === 0
                ? {
                    message: "No cabs available!",
                }
                : { available_cabs };
        res.status(200).send(responseBody);
    } catch (err) {
        console.log(err);
        res.status(err.status || 400).send({
            status: "failure",
            reason: err.messege || "Internal Server Error",
        });
    }
});

module.exports = router;
