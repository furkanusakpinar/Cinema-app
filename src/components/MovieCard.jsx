import React from 'react';
import { Link } from 'react-router-dom';
import { img } from '../api/tmdb';
import './MovieCard.css';

const MovieCard = ({ movie, type }) => {
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;
  const linkType = type || (movie.media_type === 'tv' ? 'tv' : 'movie');

  return (
    <Link to={`/${linkType}/${movie.id}`} className="movie-card fade-in">
      <div className="card-poster">
        <img src={img(movie.poster_path)} alt={title} loading="lazy" />
        <div className="card-overlay">
          <div className="card-rating">
            <span className="star">★</span> {movie.vote_average?.toFixed(1)}
          </div>
          <button className="play-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
          </button>
        </div>
      </div>
      <div className="card-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-year">{date?.split('-')[0]}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
