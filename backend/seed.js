const mongoose = require('mongoose');
const User = require('./models/User');
const Usage = require('./models/Usage');
const Billing = require('./models/Billing');

// Connect to MongoDB
const DB_URI = 'mongodb://localhost:27017/tensorgo';
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Seed data
async function seedData() {
    try {
        // Create and save a new user
        const user = new User({ googleId: '12345', name: 'John Doe', email: 'john@example.com' });
        await user.save();

        console.log('User data saved:', user);

        // Create usage data for the user
        const usageData = new Usage({
            userId: user._id,
            apiCalls: 500,
            storageUsed: '25GB',
            totalProjects: 5,
            activeProjects: 3
        });
        await usageData.save();

        console.log('Usage data saved:', usageData);

        // Create billing data for the user
        const billingData = new Billing({
            userId: user._id,
            billingCycle: 'Sept 2024',
            totalUsage: '$500',
            nextBillingDate: new Date('2024-10-01')
        });
        await billingData.save();

        console.log('Billing data saved:', billingData);

        // Close the connection after seeding
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

// Call the function to seed data
seedData();