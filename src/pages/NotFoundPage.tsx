import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <h1>404 - Country Not Found</h1>
      <p>The country you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')}>
        Return to Map
      </button>
    </div>
  );
};

export default NotFoundPage;