import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BookInfoScreen({ route }) {
  const { bookInfo } = route.params;

  return (
    <View style={styles.container}>
      <Text>Título: {bookInfo.title}</Text>
      <Text>Autor(es): {bookInfo.authors.join(', ')}</Text>
      <Text>Editora: {bookInfo.publisher}</Text>
      <Text>Descrição: {bookInfo.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});