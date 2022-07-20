const express = require("express");
const router = express.Router();
const GoalsController = require("../controllers/goalController");
const Validation = require("../validator/goalsValidator");
const Protect = require("../authorization/protect-routes");

router
  .route("/")
  .get(Protect.chkToken, GoalsController.getGoals)
  .post(Protect.chkToken, Validation.goalValidation, GoalsController.setGoal);

router
  .route("/:id")
  .put(Protect.chkToken, Validation.goalValidation, GoalsController.updateGoal)
  .delete(Protect.chkToken, GoalsController.deleteGoal);

module.exports = router;
