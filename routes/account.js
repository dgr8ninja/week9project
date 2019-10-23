const express = require("express");
const router = express.Router();
//const db = require("/database");

// function checkIsLoggedIn(req, res, next) {
//     if (req.session.user_id) {
//         next();
//     } else {
//         res.redirect("/login"); //
//     }
// }

// router.use(checkIsLoggedIn);

// router.get("/", (req, res) => {
//     console.log("THE FORCE AWAKENS");
//     res.render("account");
// });

module.exports = router;