const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    drop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drop',
        required: true
    },
    productType: {
        type: String,
        enum: ['onetime', 'subscription'],
        required: true
    },
        currency: {
        type: String,
        required: true
    },
    // For one-time products
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
    // For subscription products
    tiers: [{type: mongoose.Schema.Types.ObjectId, ref: "Tier"}]
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);