const router = require("express").Router()

const sauceController = require("../controllers/sauce")
const auth = require("../middleware/auth")
const multer = require('../middleware/multer-config');

//POST nouvelle sauce
router.post('/', auth , multer , sauceController.createSauce)
//POST like ou dislike sauce
router.post('/:id/like', auth ,  sauceController.likeDislike)
//GET toutes les sauces
router.get("/", auth , sauceController.getAllSauces)
//GET une seul sauce
router.get('/:id', auth , sauceController.getOneSauce);
//PUT mise à jour d'une sauce
router.put('/:id', auth , multer ,  sauceController.modifySauce);
//DELETE supprime une sauce
router.delete('/:id', auth ,sauceController.deleteSauce);

module.exports = router