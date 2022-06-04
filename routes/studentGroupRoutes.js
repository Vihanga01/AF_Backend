const express = require("express");
const {
  createStudentGroup,
  getStudentGroupByID,
  registerTopic,
  supervisorApproves,
  co_supervisorApproves,
  panelApproves,
  getStudentGroupByUserID,
} = require("../controllers/studentGroupController");

const router = express.Router();

// const { protect } = require("../middleware/authMiddleware");
router.route("/").post(createStudentGroup);

router.route("/:id").get(getStudentGroupByID);

router.route("/registerTopic/:id").put(registerTopic);

router.route("/supervisorApproves/:id").put(supervisorApproves);

router.route("/co_supervisorApproves/:id").put(co_supervisorApproves);

router.route("/panelApproves/:id").put(panelApproves);

router.route("/user/:id").get(getStudentGroupByUserID);

module.exports = router;
