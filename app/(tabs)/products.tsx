import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CardsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Products Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1b3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
}); 