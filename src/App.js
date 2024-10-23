// src/app.js

import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import axios from 'axios';

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch tickets data (replace with your tickets API endpoint)
                const ticketsResponse = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment/tickets');
                setTickets(ticketsResponse.data.tickets);

                // Fetch users data (replace with your users API endpoint)
                const usersResponse = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment/users');
                const usersMap = {};

                // Assuming the API returns an array of users
                usersResponse.data.forEach((user, index) => {
                    if (index < 5) { // Limit to first 5 users
                        usersMap[user.id] = { id: user.id, name: `User ${user.id}` };
                    }
                });

                setUsers(usersMap);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Board tickets={tickets} users={users} />
        </div>
    );
};

export default App;
