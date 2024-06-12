import React from 'react';	
import onlineIcon from '../../icons/onlineIcon.png';
    
const PlayerList = ({ players }) => {
    return (
        <div className="playerContainer">
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
                <h2>
                    {players.map(({ name }) => (
                        <div key={name} className="activeItem">
                            {name}
                            <img alt="Online Icon" src={onlineIcon} />
                        </div>
                    ))}
                </h2>
            </div>
        </div>
    );
};

export default PlayerList;