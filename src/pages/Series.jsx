import React, { useState, useEffect } from 'react';
import { getPopularTV, getTopRatedTV, getTrendingTV } from '../api/tmdb';
import MovieList from '../components/MovieList';

const Series = () => {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const [pRes, tRes, trRes] = await Promise.all([
          getPopularTV(),
          getTopRatedTV(),
          getTrendingTV(),
        ]);
        setPopular(pRes.data.results);
        setTopRated(tRes.data.results);
        setTrending(trRes.data.results);
      } catch (error) {
        console.error('Diziler çekilemedi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  return (
    <div className="container" style={{ paddingTop: '120px' }}>
      <MovieList title="Popüler Diziler" movies={popular} loading={loading} type="tv" />
      <MovieList title="Haftanın Trendleri" movies={trending} loading={loading} type="tv" />
      <MovieList title="En İyi Diziler" movies={topRated} loading={loading} type="tv" />
    </div>
  );
};

export default Series;
