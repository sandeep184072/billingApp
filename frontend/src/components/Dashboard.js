import React from 'react';
import axios from 'axios';
import UsageDetails from './UsageDetails';
import BillingDetails from './BillingDetails';

function Dashboard() {
    const generateInvoice = () => {
        axios.post('http://localhost:5000/api/invoice')
            .then(response => {
                alert('Invoice generated successfully!');
            })
            .catch(error => {
                console.error('Error generating invoice:', error);
                alert('Failed to generate invoice.');
            });
    };

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>You are successfully logged in!</p>

            {/* Render Usage and Billing details */}
            <UsageDetails />
            <BillingDetails />

            {/* Button to generate invoice */}
            <button onClick={generateInvoice}>Generate Invoice</button>
        </div>
    );
}

export default Dashboard;
