import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsageDetails() {
    const [usage, setUsage] = useState({});

    useEffect(() => {
        // Fetch usage details from the backend
        axios.get('http://localhost:5000/api/usage')
            .then(response => {
                setUsage(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the usage data!", error);
            });
    }, []);

    return (
        <div>
            <h2>Usage Details</h2>
            <p>API Calls: {usage.apiCalls}</p>
            <p>Storage Used: {usage.storageUsed}</p>
            <p>Total Projects: {usage.totalProjects}</p>
            <p>Active Projects: {usage.activeProjects}</p>
        </div>
    );
}

export default UsageDetails;
