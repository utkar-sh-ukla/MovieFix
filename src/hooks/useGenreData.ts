import {useEffect, useState} from 'react';
import {CategoriesType} from '../interface';
import {getGenresList} from '../services/api';

export const useGenreData = () => {
  const [genres, setGenres] = useState<CategoriesType>([]);

  useEffect(() => {
    getGenresList().then(genres => setGenres(genres.genres));
  }, []);

  return genres;
};
