import React from 'react';

const Player = () => {
  return (
    <div className="container mt-5">
      <video className="mt-5" controls>
        <source src="player/watch?type=<%= type %>&file=<%= file %>" type="video/mp4">
          Your browser does not support the video tag
        </source>
      </video>
    </div>
  );
};
export default Player;

