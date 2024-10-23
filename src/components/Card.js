import React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import './styles.css';

const Card = ({ ticket, users }) => {
    const hasFeatureRequestTag = ticket.tag.some(tag => tag.toLowerCase() === "feature request");

    // Find the user associated with the ticket
    const user = users[ticket.userId]; // Ensure ticket has userId and users is an object

    return (
        <div className="card">
            {/* Card content */}
            <div className="card-header">
                <h3 style={{ color: 'gray' }}>{`${ticket.id}`}</h3>
                <h4>{ticket.title}</h4>
                {hasFeatureRequestTag && <p style={{ color: 'gray' }}>Feature Request</p>}
                
                {/* Avatar positioned in the top-right corner */}
                <div className="avatar-container">
                    <Avatar sx={{ bgcolor: user ? deepOrange[500] : deepPurple[500] }}>
                        {user ? user.name.charAt(0) : 'U'} {/* Use first letter of user name */}
                    </Avatar>
                </div>
            </div>
        </div>
    );
};

export default Card;
