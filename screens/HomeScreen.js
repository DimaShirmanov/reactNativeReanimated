import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import PlusIcon from '../icons/PlusIcon';


const CIRCLE_HEIGHT = 50;
const BUTTON_WIDTH = 152;
const DURATION = 300;
const COLOR = '#0043C6';

const HomeScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const circle = useSharedValue(0);
    const button = useSharedValue(0);

    const defaultSpringStyles = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${circle.value}deg` }],
        };
    });

    const defaultButtonStyles = useAnimatedStyle(() => {
        return {
            width: withTiming(button.value, {
                duration: DURATION,
            }),
            opacity: withSpring(button.value, {
                duration: DURATION
            }),
        };
    });

    const handlePressButton = () => {
        setIsOpen(prev => !prev);
        circle.value = withSpring(isOpen ? 0 : 90);
        button.value = isOpen ? 0 : BUTTON_WIDTH;
    }

    return (
        <View style={styles.container}>
            <View style={{
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Animated.View style={[styles.button, styles.leftButton, defaultButtonStyles]}>
                    <TouchableOpacity>
                        {isOpen && <Text style={styles.text}>Консультацию</Text>}
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.circle, defaultSpringStyles]}>
                    <TouchableOpacity onPress={handlePressButton}>
                        <PlusIcon width={CIRCLE_HEIGHT} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.button, styles.rightButton, defaultButtonStyles]}>
                    {isOpen && <Text style={styles.text}>Клиента</Text>}
                </Animated.View>
            </View>
        </View>
    )
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        zIndex: 1,
        borderRadius: 44,
        borderColor: '#FFF',
        borderWidth: 4
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        width: BUTTON_WIDTH,
        position: 'absolute',
        bottom: CIRCLE_HEIGHT / 2,
        backgroundColor: COLOR,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightButton: {
        left: '50%',
        borderTopRightRadius: 44,
        borderBottomRightRadius: 44,
        borderLeftColor: '#fff',
        borderLeftWidth: 1,
    },
    leftButton: {
        borderRightColor: '#fff',
        borderRightWidth: 1,
        right: '50%',
        borderTopLeftRadius: 44,
        borderBottomLeftRadius: 44,
    }
});