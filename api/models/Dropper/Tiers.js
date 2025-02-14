const mongoose = require('mongoose');

const TierSchema = new mongoose.Schema({
    name: String,
    unit : Number,
    orignalPrice : Number,
    offerPrice: Number,
    commissionType: {
        type: String,
        enum: ['flat', 'percentage']
    },
    commissionRate: Number,
    commissionCharges: {
        type: Number,
        default: 5
    },
    totalCommission: Number,
    offer: {type: mongoose.Schema.Types.ObjectId, ref: "Offer"},
    },

    { timestamps: true }
);

module.exports = mongoose.model('Tier', TierSchema);