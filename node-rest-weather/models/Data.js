const mongoose = require ('mongoose');

const dataSchema = new mongoose.Schema({

    temp:{

        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model ('Data', dataSchema);