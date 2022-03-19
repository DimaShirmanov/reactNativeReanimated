import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';

export default function App() {
  return (
    <View style={styles.container}>
      <Tabs/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
