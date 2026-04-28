import React, { useState, useEffect } from 'react';
import { getTrendingMovies, getTrendingTV } from '../api/tmdb';
import MovieList from '../components/MovieList';

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, tvRes] = await Promise.all([
          getTrendingMovies(),
          getTrendingTV(),
        ]);
        setMovies(movieRes.data.results);
        setTv(tvRes.data.results);
      } catch (error) {
        console.error('Trend çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <MovieList title="Haftanın Trend Filmleri" movies={movies} loading={loading} type="movie" />
      <MovieList title="Haftanın Trend Dizileri" movies={tv} loading={loading} type="tv" />
    </div>
  );
};

export default Trending;
