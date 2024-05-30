import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	call,
} from "react-native-reanimated";
import myColors from "../utils/myColors";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
const NotificationsSheet = (props) => {
	const { onToggle } = props;
	const translateY = useSharedValue(0);

	const context = useSharedValue({ y: 0 });

	const toggleSheet = () => {
		translateY.value = withSpring(0, { damping: 50 });
		setTimeout(() => {
			onToggle(); // Toggle notification sheet visibility
		}, 1000); // Delay for 1 second (1000 milliseconds)
	};

	const gesture = Gesture.Pan()
	.onEnd(() => {
		if (translateY.value > -SCREEN_HEIGHT / 3) {
			translateY.value = withSpring(0, { damping: 50 });
		}
	});

	useEffect(() => {
		translateY.value = withSpring(-SCREEN_HEIGHT * 0.8, { damping: 50 });
	}, []);

	const rBottomSheetStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[styles.bottmSheetCont, rBottomSheetStyle]}>
				<View style={styles.line}></View>
				<TouchableOpacity onPress={toggleSheet}>
					<Text>Close</Text>
				</TouchableOpacity>
			</Animated.View>
		</GestureDetector>
	);
};

export default NotificationsSheet;

const styles = StyleSheet.create({
	bottmSheetCont: {
		height: SCREEN_HEIGHT,
		width: "100%",
		backgroundColor: myColors.dirtyWhite,
		position: "absolute",
		top: SCREEN_HEIGHT,
		borderRadius: 25,
	},
	line: {
		width: 75,
		height: 4,
		backgroundColor: myColors.blue,
		alignSelf: "center",
		marginVertical: 15,
		borderRadius: 2,
	},
});
