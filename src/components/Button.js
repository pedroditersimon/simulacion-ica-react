import React from 'react';

function Button({ onClick, label }) {
    const buttonStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#0056b3',
    };

    // Estado para manejar el hover
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <button
            style={isHovered ? buttonHoverStyle : buttonStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {label}
        </button>
    );
}

export default Button;
