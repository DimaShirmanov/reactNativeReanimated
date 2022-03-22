import React, { useEffect } from 'react';
import { Animated, StyleSheet, Image, Text, View } from 'react-native';
import { faker } from '@faker-js/faker';
import { StatusBar } from 'expo-status-bar';

const ITEMS = Array.from({ length: 30 }, (v, i) => ({
  full_name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar()
}));

const AVATAR_SIZE = 50;
const SPACING = 16;

const ReanimatedItem = ({ index, children, scrollY }) => {
  const [height, setHeight] = React.useState(0);

  const inputRange = [
    -1,
    0,
    height * index,
    height * (index + 2)
  ];

  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0]
  });

  return (
    <Animated.View onLayout={(event) => {
      const { height } = event.nativeEvent.layout
      setHeight(height);
    }} style={[
      { transform: [{ scale }] }
    ]}>
      {children}
    </Animated.View>
  );
}

export default function App() {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <Animated.FlatList
      onScroll={
        Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ],
          { useNativeDriver: true }
        )
      }
      keyExtractor={item => item.full_name}
      data={ITEMS}
      contentContainerStyle={{
        padding: SPACING,
        paddingTop: StatusBar.height || 42
      }}
      renderItem={({ item, index }) => {
        return (
          <ReanimatedItem index={index} scrollY={scrollY}>
            <View style={styles.wrapperItem}>
              <Image style={styles.avatar} soruce={{ uri: item.avatar }} />
              <View>
                <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.full_name}</Text>
                <Text style={{ fontSize: 15, opacity: .6 }}>{item.email}</Text>
              </View>
            </View>
          </ReanimatedItem>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapperItem: {
    flexDirection: 'row',
    padding: SPACING,
    borderRadius: 8,
    borderWidth: 1,
    // SHADOW
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .3,
    shadowRadius: 8,
    marginBottom: SPACING
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 6,
    backgroundColor: 'red',
    marginRight: SPACING / 2
  }
});
