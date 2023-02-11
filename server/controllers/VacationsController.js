const TokenVerification = require("../../classes/VerifyToken.class");
const {
  getAllVacations,
  getFollowersByVacationId,
  createNewVacation,
  deleteVacation,
  followVacation,
  getFollowedVacations,
} = require("../actions/VacationsActions");
const router = require("express").Router();

//Get all vacations
router.get("/all",TokenVerification.everyUser, getAllVacations);

//Get followers by vacation id
router.get("/followers/:vacationId",TokenVerification.everyUser,getFollowersByVacationId);

// Create a new Vacation

router.post("/new", TokenVerification.adminOnly, createNewVacation);

// Delete a vacation

router.post("/delete/:id", TokenVerification.adminOnly, deleteVacation);

// Follow / Unfollow a vacation
router.put(
  "/put/:followerId/:vacationId",
  TokenVerification.userOnly,
  followVacation
);

// Get all vacations for the logged in user
router.get(
  "/followedvacations/:userId",
  TokenVerification.userOnly,
  getFollowedVacations
);

module.exports = router;
