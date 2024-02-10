const mongoose = require('mongoose');



const profanityFilterSchema = new mongoose.Schema({
bannedWords: [String]
});

const ProfanityModel = mongoose.model("Profanity",profanityFilterSchema)

module.exports = ProfanityModel