/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const { MongooseAutoIncrementID } = require("mongoose-auto-increment-reworked");
const { modelsName } = require("../../utils");

MongooseAutoIncrementID.initialise();

const DriverSchema = require("./schema");

DriverSchema.plugin(MongooseAutoIncrementID.plugin, {
  modelName: modelsName.DRIVER,
});

const instanceMethods = require("./instance");
const staticMethods = require("./static");

/**
 * Registering Instance Methods
 */

DriverSchema.method(instanceMethods);

/**
 *Registering Static Methods
 */

DriverSchema.static(staticMethods);

/**
 * Register  Driver
 */

const Driver = mongoose.model(modelsName.DRIVER, DriverSchema);

module.exports = Driver;
