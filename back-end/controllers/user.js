const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

// signup fonction
exports.signup = async (req, res) => {


    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // création du new user
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send({
            user: user._id
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

//login fonction
exports.login = async (req, res) => {

    // note that we are only providing the field we would like to search with
    const userToSearchWith = new User({
        email: req.body.email
    });
    userToSearchWith.encryptFieldsSync();

    //check si l'email existe
    const user = await User.find({
        email: userToSearchWith.email
    });
    console.log(user[0]._id);
    if (user.length < 1) return res.status(400).send("l'adrresse email n'existe pas")


    //check si le password match
    const validPass = await bcrypt.compare(req.body.password, user[0].password)
    if (!validPass) return res.status(400).send("mot de passe incorrect")

    //assignation d'un token
    res.status(200).json({
        userId: user[0]._id,
        token: jwt.sign({
                userId: user[0]._id
            },
            process.env.TOKEN_SECRET, {
                expiresIn: '24h'
            }
        )
    });


}