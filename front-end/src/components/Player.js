import React from 'react';

const Player = ({ match }) => {

  const { fileName, type } = match.params;

  return (
    <div className="container mt-5">
      <video className="mt-5" controls>
        <source src={`/api/video/watch/${type}/${fileName}`} type="video/mp4">
          Your browser does not support the video tag
        </source>
      </video>
    </div>
  );
};
export default Player;

