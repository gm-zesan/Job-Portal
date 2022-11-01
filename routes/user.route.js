const express = require("express");
const {
    getAllCandidates,
    getAllHiringManagers,
    getACandidate,
} = require("../controllers/user.controller");
const { register, login } = require("../controllers/auth.controller");
const {
    verifyAdmin,
    verifyToken,
} = require("../Utilities/verifyToken");
const router = express.Router();

//registration
router.post("/signup", register);

//login
router.post("/login", login);

router.get(
    "/candidates",
    verifyToken,
    verifyAdmin,
    getAllCandidates
);
router.get(
    "/candidate/:id",
    verifyToken,
    verifyAdmin,
    getACandidate
);
router.get(
    "/hiringManagers",
    verifyToken,
    verifyAdmin,
    getAllHiringManagers
);

module.exports = router;
