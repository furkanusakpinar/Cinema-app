import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, img } from '../api/tmdb';
import MovieList from '../components/MovieList';
import CastList from '../components/CastList';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const { data } = await getMovieDetails(id);
        setMovie(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Film detay hatası:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading-screen"><div className="loader"></div></div>;
  if (!movie) return <div className="error-message">Film bulunamadı.</div>;

  return (
    <div className="movie-details-page">
      <div className="details-hero" style={{ 
        backgroundImage: `linear-gradient(to top, var(--bg-primary) 10%, rgba(10, 10, 15, 0.7)), url(${img(movie.backdrop_path, 'original')})` 
      }}>
        <div className="container details-content">
          <div className="details-poster fade-in">
            <img src={img(movie.poster_path)} alt={movie.title} />
          </div>
          <div className="details-info fade-in">
            <h1 className="details-title">{movie.title}</h1>
            <div className="details-meta">
              <span className="badge badge-gold">★ {movie.vote_average?.toFixed(1)} ({movie.vote_count})</span>
              <span>{movie.release_date?.split('-')[0]}</span>
              <span>{movie.runtime} dk</span>
              <span>{movie.genres?.map(g => g.name).join(', ')}</span>
            </div>
            <p className="details-tagline">{movie.tagline}</p>
            <h3 className="section-subtitle">Özet</h3>
            <p className="details-overview">{movie.overview}</p>
            
            <div className="details-actions">
              {movie.videos?.results?.find(v => v.type === 'Trailer') && (
                <a 
                  href={`https://www.youtube.com/watch?v=${movie.videos.results.find(v => v.type === 'Trailer').key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Fragmanı İzle
                </a>
              )}
              <button className="btn btn-outline">Listeme Ekle</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container additional-info">
        {movie.videos?.results?.find(v => v.type === 'Trailer') && (
          <div className="trailer-section">
            <h3 className="section-subtitle">Fragman</h3>
            <div className="video-container">
              <iframe 
                src={`https://www.youtube.com/embed/${movie.videos.results.find(v => v.type === 'Trailer').key}`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <div className="info-grid">
          <div className="info-item">
            <h4>Durum</h4>
            <p>{movie.status === 'Released' ? 'Vizyonda' : movie.status}</p>
          </div>
          <div className="info-item">
            <h4>Yapımcı Şirketler</h4>
            <p>{movie.production_companies?.map(c => c.name).join(', ')}</p>
          </div>
          <div className="info-item">
            <h4>Hasılat</h4>
            <p>${movie.revenue?.toLocaleString()}</p>
          </div>
        </div>

        <CastList cast={movie.credits?.cast} />

        <MovieList 
          title="Benzer Filmler" 
          movies={movie.similar?.results?.slice(0, 6)} 
          loading={false} 
          type="movie"
        />
      </div>
    </div>
  );
};

export default MovieDetails;
