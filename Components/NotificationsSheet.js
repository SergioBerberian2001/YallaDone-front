import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	call,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
const NotificationsSheet = (props) => {
	const { onToggle } = props;
	const translateY = useSharedValue(0);

	const context = useSharedValue({ y: 0 });

	const toggleSheet = () => {
		onToggle();
	};

	const gesture = Gesture.Pan()
		.onStart(() => {
			context.value = { y: translateY.value };
		})
		.onUpdate((event) => {
			translateY.value = event.translationY + context.value.y;
			translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
		})
		.onEnd(() => {
			if (translateY.value < -SCREEN_HEIGHT / 1.5) {
				translateY.value = withSpring(MAX_TRANSLATE_Y, { damping: 50 });
			} else
					if (translateY.value > -SCREEN_HEIGHT / 3) {
						translateY.value = withSpring(0, { damping: 50 });
                        // setTimeout(() => {
                        //     toggleSheet();
                        //   }, 2000);
					}
			
		});

	useEffect(() => {
		translateY.value = withSpring(-SCREEN_HEIGHT / 2, { damping: 50 });
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
			</Animated.View>
		</GestureDetector>
	);
};

export default NotificationsSheet;

const styles = StyleSheet.create({
	bottmSheetCont: {
		height: SCREEN_HEIGHT,
		width: "100%",
		backgroundColor: "#ccc",
		position: "absolute",
		top: SCREEN_HEIGHT,
		borderRadius: 25,
	},
	line: {
		width: 75,
		height: 4,
		backgroundColor: "red",
		alignSelf: "center",
		marginVertical: 15,
		borderRadius: 2,
	},
});
