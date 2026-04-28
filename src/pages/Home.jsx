import React, { useState, useEffect } from 'react';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getPopularTV, discoverMovies } from '../api/tmdb';
import Hero from '../components/Hero';
import MovieList from '../components/MovieList';

const Home = () => {
  const [trending, setTrending] = useState(null);
  const [popular, setPopular] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, popularRes, tvRes, actionRes, animRes] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
          getPopularTV(),
          discoverMovies({ with_genres: '28' }), // Action
          discoverMovies({ with_genres: '16' }), // Animation
        ]);

        setTrending(trendingRes.data.results[0]);
        setPopular(popularRes.data.results);
        setPopularTV(tvRes.data.results);
        setActionMovies(actionRes.data.results);
        setAnimations(animRes.data.results);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page">
      <Hero movie={trending} />
      <div className="home-content" style={{ marginTop: '-100px', position: 'relative', zIndex: '5' }}>
        <MovieList title="Popüler Filmler" movies={popular} loading={loading} type="movie" />
        <MovieList title="Trend Diziler" movies={popularTV} loading={loading} type="tv" />
        <MovieList title="Aksiyonun Kalbi" movies={actionMovies} loading={loading} type="movie" />
        <MovieList title="Animasyon Dünyası" movies={animations} loading={loading} type="movie" />
      </div>
    </div>
  );
};

export default Home;
