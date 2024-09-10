const mongoose = require('mongoose');



const UsageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    apiCalls: { type: Number, default: 0 },
    storageUsed: { type: String, default: '0GB' },
    totalProjects: { type: Number, default: 0 },
    activeProjects: { type: Number, default: 0 },
});

module.exports = mongoose.model('Usage', UsageSchema);