import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OnBoardingContent = ({ item }) => {
	const { isDarkMode } = useMyColorTheme();
	return (
		<View style={[styles.container, { SCREEN_WIDTH }]}>
			<Image
				source={item.image}
				style={[styles.image, { SCREEN_WIDTH, resizeMode: "contain" }]}
			/>

			<View style={{ flex: 0.3 }}>
				<Text style={isDarkMode ? styles.darkText :styles.text}>{item.text}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		width: SCREEN_WIDTH,
		paddingHorizontal: 16,
	},
	image: {
		flex: 0.7,
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
		fontFamily: "SF-medium",
		textAlign: "center",
		color: myColors.blue,
	},
	darkText: {
		fontSize: 20,
		fontFamily: "SF-medium",
		textAlign: "center",
		color: myDarkColors.blue,
	},
});

export default OnBoardingContent;
