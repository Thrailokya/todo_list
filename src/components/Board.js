import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Column from './Column';
import { priorityImages } from './imagesData'; // Import priority images
import './styles.css';

const Board = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState({}); // Make sure users is an object
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
                setTickets(response.data.tickets);
                
                const usersMap = response.data.users.reduce((acc, user) => {
                    acc[user.id] = {
                        name: user.name,
                        profilePicture: user.profilePicture || ''
                    };
                    return acc;
                }, {});
                
                setUsers(usersMap);
            } catch (err) {
                console.error('Error fetching tickets:', err);
            }
        };

        fetchData();
    }, []);

    const groupTickets = (tickets) => {
        const grouped = {};

        tickets.forEach(ticket => {
            const key = ticket[groupBy] || 'Unassigned';
            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(ticket);
        });

        for (const key in grouped) {
            grouped[key].sort((a, b) => {
                if (sortBy === 'priority') {
                    return b.priority - a.priority;
                } else if (sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                }
                return 0;
            });
        }

        return grouped;
    };

    const sortedTickets = groupTickets(tickets);

    // Get priority image for the main heading
    const priorityImage = priorityImages[sortBy.toLowerCase()] || null; // You can change this logic to display a specific priority icon

    return (
        <div className="board">
            
            <button onClick={() => setShowControls(!showControls)}>
                Display Controls {showControls ? '▲' : '▼'}
            </button>

            {showControls && (
                <div className="controls">
                    <label>Grouping:</label>
                    <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                        <option value="status">Status</option>
                        <option value="userId">User</option>
                        <option value="priority">Priority</option>
                    </select>

                    <label>Ordering:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="priority">Priority</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            )}

            <div className="columns">
                {Object.keys(sortedTickets).length > 0 ? (
                    Object.keys(sortedTickets).map((key) => (
                        <Column key={key} title={key} tickets={sortedTickets[key]} users={users} />
                    ))
                ) : (
                    <p>No tickets available.</p>
                )}
            </div>
        </div>
    );
};

export default Board;
