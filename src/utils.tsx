import {Constants} from './constants';
import {CategoriesType, MovieDetails, SectionListDataType} from './interface';

export const calculateScrollOffset = (movieDataLength: number) => {
  const totalRows = movieDataLength;
  const cardLength = totalRows * Constants.MOVIE_CARD_HEIGHT;
  const yearMargins =
    Constants.MOVIE_CARD_MARGIN * totalRows + Constants.MOVIE_YEAR_HEIGHT;
  return cardLength + yearMargins - 20;
};

export const toggleSelectedGenre = (
  selectedGenre: number,
  genres: number[],
) => {
  return genres.includes(selectedGenre)
    ? genres.filter(genre => genre !== selectedGenre)
    : [...genres, selectedGenre];
};

export const fetchGenreName = (genres: CategoriesType, item: MovieDetails) => {
  return genres
    .filter(genre => item.genre_ids.includes(genre.id))
    .map(genre => genre.name);
};

export const filterMoviesBasedOnSelectedGenre = (
  movieDetail: SectionListDataType,
  selectedGenre: number[],
) => {
  return movieDetail.data.filter(movie =>
    movie.genre_ids.some(id => selectedGenre.includes(id)),
  );
};

export const optimizeCardLoad = (
  prevMovieGenreName: string[],
  nextMovieGenreName: string[],
) => {
  return (
    prevMovieGenreName.length === nextMovieGenreName.length &&
    prevMovieGenreName.every(
      (genre, index) => genre === nextMovieGenreName[index],
    )
  );
};

export const filterMoviesBasedOnSearchedValue = (
  movieDetail: SectionListDataType,
  userSearch: string,
) => {
  if (userSearch.trim() === '') {
    return movieDetail.data;
  }
  const lowerCaseSearch = userSearch.toLowerCase();
  return movieDetail.data.filter(movie =>
    movie.title.toLowerCase().includes(lowerCaseSearch),
  );
};
