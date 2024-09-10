const mongoose = require('mongoose');




const BillingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    billingCycle: { type: String, required: true },
    totalUsage: { type: String, required: true },
    nextBillingDate: { type: Date, required: true },
});

module.exports = mongoose.model('Billing', BillingSchema);