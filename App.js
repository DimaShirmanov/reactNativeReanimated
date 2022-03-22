import React, { useEffect } from 'react';
import { Dimensions, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { SvgUri } from 'react-native-svg';

const width = Dimensions.get('screen').width;

export default function App() {
  const offset = useSharedValue(0);
  const scale = useSharedValue(2);
  const finished = useSharedValue(0);

  const reanimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateX: offset.value }]
    }
  }, []);

  const reanimatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      opacity: finished.value
    }
  }, []);

  useEffect(() => {
    scale.value = withSpring(1, {}, () => {
      offset.value = withTiming(width * 0.6, { duration: 1500 }, () => {
        finished.value = withTiming(1, {duration: 2000});
      });
    });
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Animated.View style={[{
        width: 150,
        height: 150,
        alignItems: 'center'
      }, reanimatedStyles]}>
        <SvgUri
          uri={'https://www.svgrepo.com/show/125/car.svg'}
          width={150}
          height={150}
        />
      </Animated.View>
      <Animated.View style={reanimatedTextStyle}>
        <Text style={{fontSize: 30, textAlign: 'center', marginTop: 30}}>Заебись приехали</Text>
      </Animated.View>
    </View>
  );
}