import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTVDetails, img } from '../api/tmdb';
import MovieList from '../components/MovieList';
import CastList from '../components/CastList';
import './MovieDetails.css';

const TVDetails = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const { data } = await getTVDetails(id);
        setSeries(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Dizi detay hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="loading-screen"><div className="loader"></div></div>;
  if (!series) return <div className="error-message">Dizi bulunamadı.</div>;

  return (
    <div className="movie-details-page">
      <div className="details-hero" style={{ 
        backgroundImage: `linear-gradient(to top, var(--bg-primary) 10%, rgba(10, 10, 15, 0.7)), url(${img(series.backdrop_path, 'original')})` 
      }}>
        <div className="container details-content">
          <div className="details-poster fade-in">
            <img src={img(series.poster_path)} alt={series.name} />
          </div>
          <div className="details-info fade-in">
            <h1 className="details-title">{series.name}</h1>
            <div className="details-meta">
              <span className="badge badge-gold">★ {series.vote_average?.toFixed(1)}</span>
              <span>{series.first_air_date?.split('-')[0]}</span>
              <span>{series.number_of_seasons} Sezon</span>
              <span>{series.genres?.map(g => g.name).join(', ')}</span>
            </div>
            <p className="details-tagline">{series.tagline}</p>
            <h3 className="section-subtitle">Özet</h3>
            <p className="details-overview">{series.overview}</p>
            
            <div className="details-actions">
              <button className="btn btn-primary">Fragmanı Oynat</button>
              <button className="btn btn-outline">Listeme Ekle</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container additional-info">
        <div className="info-grid">
          <div className="info-item">
            <h4>Durum</h4>
            <p>{series.status}</p>
          </div>
          <div className="info-item">
            <h4>Bölüm Sayısı</h4>
            <p>{series.number_of_episodes}</p>
          </div>
          <div className="info-item">
            <h4>Orijinal Dil</h4>
            <p>{series.original_language?.toUpperCase()}</p>
          </div>
        </div>

        <CastList cast={series.credits?.cast} />

        <MovieList 
          title="Benzer Diziler" 
          movies={series.similar?.results?.slice(0, 6)} 
          loading={false} 
          type="tv"
        />
      </div>
    </div>
  );
};

export default TVDetails;
