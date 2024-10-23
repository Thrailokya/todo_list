import React from 'react';
import Card from './Card';
import './styles.css';

// Assuming you have a mapping of priority images
const priorityImages = {
    low: `${process.env.PUBLIC_URL}/Assets/Untitled/icons_FEtask/low-priority.svg`,
    medium: `${process.env.PUBLIC_URL}/Assets/Untitled/icons_FEtask/medium-priority.svg`,
    high: `${process.env.PUBLIC_URL}/Assets/Untitled/icons_FEtask/high-priority.svg`,
};

const Column = ({ title, tickets, users, groupBy }) => {
    // Get the priority image based on the title if grouping is by priority
    const priorityKey = title.toLowerCase(); // Assuming title matches priority keys
    const priorityImage = groupBy === 'priority' ? priorityImages[priorityKey] : null;

    return (
        <div className="column">
            <div className="column-header">
                <div className="header-left">
                    {/* Check if priorityImage is valid before rendering */}
                    {priorityImage && (
                        <img 
                            src={priorityImage} 
                            alt="Priority Icon" 
                            className="priority-icon" 
                            style={{ width: '24px', height: '24px', marginRight: '10px' }} 
                        />
                    )}
                    <h2>{title}</h2>
                </div>
                <div className="header-controls">
                    <button className="add-task-button">+</button>
                    <img 
                        src={`${process.env.PUBLIC_URL}/Assets/Untitled/icons_FEtask/3 dot menu.svg`} 
                        alt="More options" 
                        className="three-dots-icon" 
                    />
                </div>
            </div>
            <div className="column-tickets">
                {tickets.length > 0 ? (
                    tickets.map(ticket => (
                        <Card key={ticket.id} ticket={ticket} users={users} />
                    ))
                ) : (
                    <p>No tickets in this column.</p>
                )}
            </div>
        </div>
    );
};

export default Column;
