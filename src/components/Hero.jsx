import React from 'react';
import { img } from '../api/tmdb';
import './Hero.css';

const Hero = ({ movie }) => {
  if (!movie) return <div className="hero-skeleton"></div>;

  return (
    <div className="hero" style={{ 
      backgroundImage: `linear-gradient(to right, rgba(10, 10, 15, 0.9) 20%, rgba(10, 10, 15, 0) 80%), url(${img(movie.backdrop_path, 'original')})` 
    }}>
      <div className="container hero-content">
        <div className="hero-info">
          <div className="hero-badges">
            <span className="badge badge-red">Trending Now</span>
            <span className="badge badge-gold">★ {movie.vote_average?.toFixed(1)}</span>
          </div>
          <h1 className="hero-title">{movie.title}</h1>
          <p className="hero-overview">{movie.overview}</p>
          <div className="hero-actions">
            <button className="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
              Fragmanı İzle
            </button>
            <button className="btn btn-outline">Daha Fazla Bilgi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
