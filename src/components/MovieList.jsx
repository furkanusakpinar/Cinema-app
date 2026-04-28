import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, loading, type }) => {
  if (loading) {
    return (
      <div className="container" style={{ marginBottom: '60px' }}>
        <h2 className="section-title">{title}</h2>
        <div className="movies-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton" style={{ aspectRatio: '2/3' }}></div>
          ))}
        </div>
      </div>
    );
  }

  if (!movies || movies.length === 0) return null;

  return (
    <div className="container" style={{ marginBottom: '60px' }}>
      <h2 className="section-title">{title}</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
