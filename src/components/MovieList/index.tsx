import React, {useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  SectionListData,
} from 'react-native';
import {MovieCard} from './MovieCard';
import {MovieYear} from './MovieYear';
import {useMovieDetails} from '../../hooks/useMovieDetails';
import {CategoriesType, MovieDetails} from '../../interface';
import {Constants} from '../../constants';
import {fetchGenreName} from '../../utils';
import {COLOR} from '../../colors';

interface MovieListProps {
  selectedGenre: number[];
  genres: CategoriesType;
  userSearch: string;
}

const LoadingComponent = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color={COLOR.red} />
  </View>
);

const EmptyItemComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyItemText}>{Constants.NO_MOVIES}</Text>
  </View>
);

export const MovieList = ({
  selectedGenre,
  genres,
  userSearch,
}: MovieListProps) => {
  const sectionListRef = useRef<SectionList>(null);

  const {isLoading, sectionData, fetchNextPage, fetchPreviousPage, isFetching} =
    useMovieDetails(selectedGenre, userSearch, sectionListRef);

  const renderItemHandler = useCallback(
    ({item}: {item: MovieDetails}) => (
      <MovieCard
        key={item.id}
        movieImage={item.poster_path}
        movieTitle={item.title}
        movieRating={item.vote_average}
        movieGenreName={fetchGenreName(genres, item)}
        movieDescription={item.overview}
      />
    ),
    [genres],
  );

  const onEndReached = useCallback(() => {
    if (!isFetching) fetchNextPage();
  }, [isFetching, fetchNextPage]);

  const onScrollHandler = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (e.nativeEvent.contentOffset.y === 0 && !isFetching)
        fetchPreviousPage();
    },
    [isFetching, fetchPreviousPage],
  );

  const renderSectionHeader = useCallback(
    ({section}: {section: SectionListData<MovieDetails>}) => (
      <MovieYear year={section.title} />
    ),
    [],
  );

  const renderSectionFooter = useCallback(
    ({section}: {section: SectionListData<MovieDetails>}) =>
      section.data.length === 0 ? <EmptyItemComponent /> : null,
    [],
  );

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!sectionData) return null;

  return (
    <View style={styles.cardView}>
      <SectionList
        sections={sectionData}
        ref={sectionListRef}
        getItemLayout={(_, index) => ({
          length: Constants.MOVIE_CARD_HEIGHT + Constants.MOVIE_CARD_MARGIN,
          offset:
            index * (Constants.MOVIE_CARD_HEIGHT + Constants.MOVIE_CARD_MARGIN),
          index,
        })}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        renderItem={renderItemHandler}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        showsVerticalScrollIndicator={false}
        onScroll={onScrollHandler}
        ListFooterComponent={isFetching ? LoadingComponent : null}
        ListHeaderComponent={isFetching ? LoadingComponent : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    marginHorizontal: 10,
  },
  loaderContainer: {
    height: 20,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    marginLeft: 8,
    height: Constants.EMPTY_CONTENT_HEIGHT,
  },
  emptyItemText: {
    color: COLOR.white,
    fontSize: 18,
  },
});
