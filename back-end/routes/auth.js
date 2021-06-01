const router = require("express").Router()

const userController = require("../controllers/user")



//signup 
router.post("/signup", userController.signup)

//login
router.post("/login", userController.login)


module.exports = router