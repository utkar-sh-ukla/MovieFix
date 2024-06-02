import React, {memo, useContext} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Genre} from './Genre';
import {CategoriesType} from '../../interface';
import {GenreContext} from '../../context/GenreContext';

interface CategoriesProps {
  categories: CategoriesType;
}

export const GenreList = memo(({categories}: CategoriesProps) => {
  const {selectedGenre} = useContext(GenreContext);

  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {categories.map(({id, name}) => (
        <Genre
          key={id}
          categoryId={id}
          isGenreSelected={selectedGenre.includes(id)}
          categoryName={name}
        />
      ))}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    maxHeight: 50,
    marginHorizontal: 20,
  },
});
