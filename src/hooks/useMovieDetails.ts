import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getMovieDetails } from '../services/api';
import { SectionListDataType } from '../interface';
import { DefaultSectionT, SectionList } from 'react-native';
import {
  calculateScrollOffset,
  filterMoviesBasedOnSearchedValue,
  filterMoviesBasedOnSelectedGenre,
} from '../utils';
import { Default_List } from '../constants';

const CURRENT_YEAR = new Date().getFullYear();

export const useMovieDetails = (
  selectedGenre: number[],
  userSearch: string,
  sectionListRef: React.RefObject<SectionList<any, DefaultSectionT>>,
) => {
  const [movieDetails, setMovieDetails] = useState<SectionListDataType[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currYearRef = useRef(2012);
  const oldPageYear = useRef(2012);
  const isTopPaginating = useRef(false);

  const scrollHandler = useCallback(
    (yOffset: number) => {
      setTimeout(() => {
        sectionListRef.current?.getScrollResponder()?.scrollTo({ x: 0, y: yOffset, animated: false });
      }, 0);
    },
    [sectionListRef],
  );

  const fetchData = useCallback(
    (year: number, isTopPage?: boolean) => {
      getMovieDetails(year).then(movieList => {
        const currMovieData: SectionListDataType = {
          title: year.toString(),
          data: movieList.results.sort((a, b) => b.popularity - a.popularity),
        };

        setMovieDetails(prevMovieDetails => {
          if (!prevMovieDetails) return [currMovieData];
          return isTopPage ? [currMovieData, ...prevMovieDetails] : [...prevMovieDetails, currMovieData];
        });
        setIsLoading(false);
        setIsFetching(false);
      });
    },
    [],
  );

  const fetchNextPage = useCallback(() => {
    if (currYearRef.current + 1 > CURRENT_YEAR) return;
    currYearRef.current++;
    setIsFetching(true);
    fetchData(currYearRef.current);
  }, []);

  const fetchPreviousPage = useCallback(() => {
    oldPageYear.current--;
    isTopPaginating.current = true;
    setIsFetching(true);
    fetchData(oldPageYear.current, true);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchData(currYearRef.current);
  }, []);

  const filteredMovieDetail = useMemo<SectionListDataType[]>(() => {
    if (!movieDetails) return [Default_List];
    if (selectedGenre.length === 0) return movieDetails;
    return movieDetails.map(movieDetail => ({
      ...movieDetail,
      data: filterMoviesBasedOnSelectedGenre(movieDetail, selectedGenre),
    }));
  }, [movieDetails, selectedGenre]);

  const filterBySearch = useMemo(() => {
    if (userSearch.length === 0) return filteredMovieDetail;
    return filteredMovieDetail.map(movieDetail => ({
      ...movieDetail,
      data: filterMoviesBasedOnSearchedValue(movieDetail, userSearch),
    }));
  }, [userSearch, filteredMovieDetail]);

  useEffect(() => {
    if (isTopPaginating.current) {
      const offset = calculateScrollOffset(filterBySearch.length > 0 ? filterBySearch[0].data.length : 0);
      scrollHandler(offset);
      isTopPaginating.current = false;
    }
  }, [filterBySearch, scrollHandler]);

  return {
    sectionData: filterBySearch,
    fetchNextPage,
    isFetching,
    fetchPreviousPage,
    isLoading,
  };
};