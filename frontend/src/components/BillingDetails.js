import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BillingDetails() {
    const [billing, setBilling] = useState({});

    useEffect(() => {
        // Fetch billing details from the backend
        axios.get('http://localhost:5000/api/billing')
            .then(response => {
                setBilling(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the billing data!", error);
            });
    }, []);

    return (
        <div>
            <h2>Billing Information</h2>
            <p>Billing Cycle: {billing.billingCycle}</p>
            <p>Total Usage: {billing.totalUsage}</p>
            <p>Next Billing Date: {billing.nextBillingDate}</p>
        </div>
    );
}

export default BillingDetails;
