const mongoose = require("mongoose")

// model de données attendu pour les sauces
const sauceSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mainPepper: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,

    },
    heat: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0
    },
    usersLiked: {
        type: [String],
        required: true,
        default: []
    },
    usersDisliked: {
        type: [String],
        required: true,
        default: []
    },
})

// fonction de like et dislike de la sauce
sauceSchema.methods.likeDislike = function (like, user) {
    switch (like) {
        case 1:
            if (this.usersDisliked.indexOf(user) < 0) {
                this.usersLiked.push(user)
                this.likes += 1
            }
            break
        case 0:
            if (this.usersLiked.indexOf(user) > -1) {
                this.usersLiked.splice(this.usersLiked.indexOf(user), 1)
                this.likes -= 1
            } else {
                this.usersDisliked.splice(this.usersDisliked.indexOf(user), 1)
                this.dislikes -= 1
            }
            break
        case -1:
            if (this.usersLiked.indexOf(user) < 0) {
                this.usersDisliked.push(user)
                this.dislikes += 1
            }
            break
    }
}

module.exports = mongoose.model("Sauce", sauceSchema)