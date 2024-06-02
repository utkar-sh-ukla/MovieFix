import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {COLOR} from '../../colors';
import {Constants} from '../../constants';

interface SearchBarProps {
  userSearch: string;
  setUserSearch: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchBar = ({userSearch, setUserSearch}: SearchBarProps) => {
  const handleChangedValue = (value: string) => {
    setUserSearch(value);
  };
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={handleChangedValue}
        value={userSearch}
        placeholder={Constants.PLACEHOLDER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    flex: 1,
    borderRadius: 4,
    padding: 10,
    color: COLOR.primary,
    backgroundColor: COLOR.white,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 25,
    marginVertical: 20,
  },
});
