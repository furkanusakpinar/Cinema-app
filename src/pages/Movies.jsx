import React, { useState, useEffect } from 'react';
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies, discoverMovies } from '../api/tmdb';
import MovieList from '../components/MovieList';

const Movies = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [pRes, tRes, uRes] = await Promise.all([
          getPopularMovies(),
          getTopRatedMovies(),
          getUpcomingMovies(),
        ]);
        setPopular(pRes.data.results);
        setTopRated(tRes.data.results);
        setUpcoming(uRes.data.results);
      } catch (error) {
        console.error('Filmler çekilemedi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <MovieList title="Popüler Filmler" movies={popular} loading={loading} type="movie" />
      <MovieList title="En Çok Oy Alanlar" movies={topRated} loading={loading} type="movie" />
      <MovieList title="Yakında Gelecekler" movies={upcoming} loading={loading} type="movie" />
    </div>
  );
};

export default Movies;
