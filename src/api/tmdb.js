import axios from 'axios';

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8'; // Public demo key
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: 'tr-TR' },
});

export const getPopularMovies = (page = 1) =>
  tmdb.get('/movie/popular', { params: { page } });

export const getTrendingMovies = () =>
  tmdb.get('/trending/movie/week');

export const getTopRatedMovies = (page = 1) =>
  tmdb.get('/movie/top_rated', { params: { page } });

export const getUpcomingMovies = (page = 1) =>
  tmdb.get('/movie/upcoming', { params: { page } });

export const getNowPlayingMovies = (page = 1) =>
  tmdb.get('/movie/now_playing', { params: { page } });

// TV Series
export const getPopularTV = (page = 1) =>
  tmdb.get('/tv/popular', { params: { page } });

export const getTopRatedTV = (page = 1) =>
  tmdb.get('/tv/top_rated', { params: { page } });

export const getTrendingTV = () =>
  tmdb.get('/trending/tv/week');

export const getTVDetails = (id) =>
  tmdb.get(`/tv/${id}`, {
    params: { append_to_response: 'videos,credits,similar,recommendations,aggregate_credits' },
  });

// Details & Search
export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`, {
    params: { append_to_response: 'videos,credits,similar,recommendations' },
  });

export const getMovieVideos = (id) =>
  tmdb.get(`/movie/${id}/videos`);

export const getMovieCredits = (id) =>
  tmdb.get(`/movie/${id}/credits`);

export const searchAll = (query, page = 1) =>
  tmdb.get('/search/multi', { params: { query, page } });

export const getGenres = () =>
  tmdb.get('/genre/movie/list');

export const discoverMovies = (params) =>
  tmdb.get('/discover/movie', { params });

export const getPersonDetails = (id) =>
  tmdb.get(`/person/${id}`, {
    params: { append_to_response: 'movie_credits' },
  });

export const img = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null;

export default tmdb;
