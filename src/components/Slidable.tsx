import React, { useRef } from 'react';
import { View, Animated, PanResponder, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type SlideableProps = {
	children: React.ReactElement;
	buttonElement?: React.ReactElement;
	onButtonPress: () => void;
};

const SLIDE_THRESHOLD = -100;

function Slideable({ children, onButtonPress, buttonElement }: SlideableProps) {
	const pan = useRef(new Animated.ValueXY()).current;

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gestureState) => {
				return (
					gestureState.dx < 0 &&
					Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
				);
			},
			onPanResponderMove: (evt, gestureState) => {
				if (gestureState.dx < 0) {
					pan.setValue({ x: gestureState.dx, y: 0 });
				}
			},
			onPanResponderRelease: (_, gestureState) => {
				if (gestureState.dx < SLIDE_THRESHOLD) {
					Animated.timing(pan, {
						toValue: { x: SLIDE_THRESHOLD, y: 0 },
						duration: 300,
						useNativeDriver: false,
					}).start();
					// Trigger button action
					onButtonPress();
					Animated.spring(pan, {
						toValue: { x: 0, y: 0 },
						useNativeDriver: false,
					}).start();
				} else {
					Animated.spring(pan, {
						toValue: { x: 0, y: 0 },
						useNativeDriver: false,
					}).start();
				}
			},
		}),
	).current;

	return (
		<View style={styles.container}>
			<Animated.View
				style={{
					transform: [{ translateX: pan.x }],
					width: '100%',
					zIndex: 1,
				}}
				{...panResponder.panHandlers}>
				{children}
			</Animated.View>
			<TouchableOpacity
				style={styles.buttonWrapper}
				onPress={onButtonPress}>
				{buttonElement}
			</TouchableOpacity>
		</View>
	);
}

export { Slideable, type SlideableProps };

const styles = StyleSheet.create({
	container: {
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		width: '100%',
		position: 'relative',
	},
	buttonWrapper: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		display: 'flex',
		zIndex: 20,
	},
});