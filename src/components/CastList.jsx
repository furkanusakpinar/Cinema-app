import React from 'react';
import { img } from '../api/tmdb';
import './CastList.css';

const CastList = ({ cast }) => {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="cast-section">
      <h3 className="section-subtitle">Oyuncu Kadrosu</h3>
      <div className="cast-grid">
        {cast.slice(0, 10).map(person => (
          <div key={person.id} className="cast-card">
            <div className="cast-image">
              {person.profile_path ? (
                <img src={img(person.profile_path, 'w185')} alt={person.name} />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="cast-info">
              <p className="cast-name">{person.name}</p>
              <p className="cast-character">{person.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastList;
