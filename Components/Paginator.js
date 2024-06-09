import {
	StyleSheet,
	Text,
	View,
	Animated,
	useWindowDimensions,
} from "react-native";
import React from "react";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const Paginator = ({ data, scrollX }) => {
	const { isDarkMode } = useMyColorTheme();
	const { width } = useWindowDimensions();
	return (
		<View style={styles.container}>
			{data.map((_, i) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: "clamp",
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.3, 1, 0.3],
					extrapolate: "clamp",
				});

				return (
					<Animated.View
						style={[isDarkMode ? styles.darkDot : styles.dot, { width: dotWidth, opacity }]}
						key={i.toString()}
					/>
				);
			})}
		</View>
	);
};

export default Paginator;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 64,
		justifyContent: "center",
		alignItems: "center",
	},
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: myColors.blue,
		marginHorizontal: 8,
	},
	darkDot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: myDarkColors.blue,
		marginHorizontal: 8,
	},
});
