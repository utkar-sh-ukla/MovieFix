import {CategoriesQueryTypes, MovieListTypes} from '../interface';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getGenresList = async (): Promise<CategoriesQueryTypes> => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?language=en&api_key=${API_KEY}`,
  );
  return response.json();
};

export const getMovieDetails = async (
  year: number,
  pageNumber = 1,
  voteCount = 100,
): Promise<MovieListTypes> => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=${pageNumber}&vote_count.gte=${voteCount}`,
  );
  return response.json();
};
