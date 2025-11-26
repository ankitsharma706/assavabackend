const express = require("express");
// const router = require(".");
const coffeController = require("./../controller/coffeeController");
const router = express.Router();

// router.param("id", coffeController.checkId);
router
  .route("/top-5-cheap")
  .get(coffeController.aliasTopTours, coffeController.getAllCoffee);
router.route("/tour-stats").get(coffeController.getCoffeeStats);
router.route("/monthly-plan/:year").get(coffeController.getMonthlyPLan);
router
  .route("/")
  .get(coffeController.getAllCoffee)
  .post(coffeController.createCoffee);
router
  .route("/:id")
  .get(coffeController.getCoffee)
  .patch(coffeController.updateCoffee)
  .delete(coffeController.deleteCoffee);

module.exports = router;
