import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header} from '../components/Header';
import {GenreList} from '../components/GenreList';
import {COLOR} from '../colors';
import {MovieList} from '../components/MovieList';
import {GenreContext} from '../context/GenreContext';
import {useGenreData} from '../hooks/useGenreData';
import {SearchBar} from '../components/SearchBar';

export const HomeScreen = () => {
  const genres = useGenreData();
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);
  const [userSearch, setUserSearch] = useState<string>('');

  return (
    <GenreContext.Provider value={{selectedGenre, setSelectedGenre}}>
      <View style={styles.root}>
        <View style={styles.card}>
          <Header />
          <GenreList categories={genres} />
          <SearchBar userSearch={userSearch} setUserSearch={setUserSearch} />
        </View>
        <MovieList
          genres={genres}
          selectedGenre={selectedGenre}
          userSearch={userSearch}
        />
      </View>
    </GenreContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLOR.primary,
  },
  card: {
    backgroundColor: COLOR.gray,
  },
});
