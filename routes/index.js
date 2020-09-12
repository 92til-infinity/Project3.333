const router = require("express").Router();
const apiRoutes = require("./API");

// API Routes
router.use("/api", apiRoutes);

module.exports = router;
