const express = require("express");
const router = express.Router();
const Driver = require("../../models/driver");
const {
    driverOnboardingValidator,
    driverIdAndLocationValidator,
} = require("../../middlewares");

/* Driver Onboarding */
router.post("/register", driverOnboardingValidator, async (req, res) => {
    const { name, email, phone_number, license_number, car_number } = req.body;
    const newDriver = new Driver({
        name,
        email,
        phone_number,
        license_number,
        car_number,
    });
    try {
        const driverDoc = await newDriver.register();
        res.status(201).send(driverDoc);
    } catch (err) {
        console.log("Onbboarding driver error", err);
        res.status(err.status || 400).send({
            status: "failure",
            reason: err.message || "Internal Server Error",
        });
    }
});
/* Share Driver Locatio */
router.post(
    "/:id/sendLocation",
    driverIdAndLocationValidator,
    async (req, res) => {
        const {
            body: { latitude, longitude },
        } = req;
        const driverId = parseInt(req.params.id);
        const driverLat = parseFloat(latitude);
        const driverLon = parseFloat(longitude);
        try {
            await Driver.shareDriverLocation(driverId, driverLat, driverLon);
            res.status(202).send({ status: "success" });
        } catch (err) {
            console.log("Sharing driver location", err);
            res.status(err.status || 400).send({
                status: "failure",
                reason: err.message || "Internal Server Error",
            });
        }
    }
);
module.exports = router;
