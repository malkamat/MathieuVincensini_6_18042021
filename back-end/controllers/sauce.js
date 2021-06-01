const Sauce = require("../models/Sauce")
const fs = require("fs")

// fonction pour créer la sauce
exports.createSauce = (req, res, next) => { 
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  }

// fonction pour modifier la sauce
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }; 
      //si l'image est modifiée alors on supprime l'ancien fichier image
      if(sauceObject.imageUrl) {
         Sauce.findOne({ _id: req.params.id })
          .then(sauce => { 
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }             
                  })
            })
      }   
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  }

// fonction pour supprimer la sauce
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
  }

// fonction pour récupérer un objet sauce
  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  }

// fonction pour récupérer toutes les sauces
  exports.getAllSauces = (req, res) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

// fonction pour liker ou disliker une sauce
exports.likeDislike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    sauce.likeDislike(req.body.like, req.body.userId)
    sauce.save()
    .then(() => res.status(201).json({message: 'Votre avis compte'}))
    .catch(error => res.status(400).json({ error }));
  });
}