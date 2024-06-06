import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const MyAccountButton = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { text } = props;
	return (
		<TouchableOpacity style={isDarkMode ? styles.darkButton : styles.button}>
			<Text style={isDarkMode ? styles.darkText :styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

export default MyAccountButton;

const styles = StyleSheet.create({
	button: {
		width: "90%",
		aspectRatio: 9 / 2,
		backgroundColor: myColors.blue,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
	text: {
		fontFamily: "SF-bold",
		fontSize: 20,
		color: myColors.white,
	},
	darkButton: {
		width: "90%",
		aspectRatio: 9 / 2,
		backgroundColor: myDarkColors.blue,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
	darkText: {
		fontFamily: "SF-bold",
		fontSize: 20,
		color: myDarkColors.white,
	},
});
