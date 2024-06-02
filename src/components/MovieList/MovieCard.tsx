import React, {memo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {COLOR} from '../../colors';
import {Constants} from '../../constants';
import {optimizeCardLoad} from '../../utils';

interface CardProps {
  movieImage: string;
  movieTitle: string;
  movieRating: number;
  movieDescription: string;
  movieGenreName: string[];
}

const Genre = ({name}: {name: string}) => (
  <Text style={styles.genre}>{name}</Text>
);

const CardComponent = ({
  movieImage,
  movieTitle,
  movieRating,
  movieDescription,
  movieGenreName,
}: CardProps) => (
  <View style={styles.card}>
    <Image
      style={styles.image}
      source={{uri: `${Constants.IMAGE_URL}${movieImage}`}}
    />
    <View style={styles.movieInfoContainer}>
      <Text style={styles.title}>
        {movieTitle} (Rating: {movieRating.toFixed(1)})
      </Text>
      <View style={styles.genreContainer}>
        {movieGenreName.map((name, index) => (
          <Genre name={name} key={index} />
        ))}
      </View>
      <Text numberOfLines={2} style={styles.description}>
        {movieDescription}
      </Text>
    </View>
  </View>
);

const MovieCard = memo(
  CardComponent,
  (prevProps, nextProps) =>
    optimizeCardLoad(prevProps.movieGenreName, nextProps.movieGenreName) &&
    prevProps.movieDescription === nextProps.movieDescription &&
    prevProps.movieImage === nextProps.movieImage &&
    prevProps.movieTitle === nextProps.movieTitle,
);

const styles = StyleSheet.create({
  card: {
    height: Constants.MOVIE_CARD_HEIGHT,
    borderRadius: 4,
    marginBottom: Constants.MOVIE_CARD_MARGIN,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
  },
  movieInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  genre: {
    backgroundColor: COLOR.red,
    color: COLOR.white,
    marginRight: 4,
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 4,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: COLOR.white,
  },
  description: {
    marginTop: 4,
    fontSize: 14,
    color: COLOR.white,
  },
});

export {MovieCard};
