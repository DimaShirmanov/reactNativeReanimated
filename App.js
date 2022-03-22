import { PanGestureHandler } from 'react-native-gesture-handler';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const SIZE = 100.0;
const COLOR = '#0000FF';

export default function App() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const [x, y] = [translateX.value, translateY.value];
      const warningX = width / 2 - SIZE / 2;
      const warningY = height / 2 - SIZE;
      if (x > warningX || x < -(warningX)) {
        translateX.value = withSpring(x > 0 ? x - SIZE : x + SIZE);
      }

      if (y > warningY || y < -(warningY)) {
        translateY.value = withSpring(y > 0 ? y - SIZE : y + SIZE);
      }
    }
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    }
  }, []);

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.square, reanimatedStyle]} />
      </PanGestureHandler>
      <View style={styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    zIndex: 1,
    width: SIZE,
    height: SIZE,
    backgroundColor: COLOR,
    borderRadius: 20
  },
  circle: {
    position: 'absolute',
    width: width,
    height: height / 2,
    borderWidth: 4,
    borderColor: COLOR,
    borderRadius: 1000,
  }
});
