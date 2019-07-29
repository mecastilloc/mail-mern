const router = require("express").Router();
const mailController = require("../../controllers/mailController");
//For/api/books
router
  .route("/")
 // .get(mailController.findByTaskId)
  .post(mailController.saveMail);

// fot /api/books/:id
router
  .route("/:taskId")
  .get(mailController.findByTaskId)

module.exports = router;
     