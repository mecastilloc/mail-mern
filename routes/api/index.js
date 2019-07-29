const router = require("express").Router();
const mailRoutes = require("./mailRoutes");

router.use("/mail", mailRoutes);

module.exports = router;