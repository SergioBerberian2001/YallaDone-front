import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { useMyColorTheme } from "../utils/ThemeContext";

const GetIsDarkMode = () => {
	const { isDarkMode } = useMyColorTheme();

	return isDarkMode ? (
		<StatusBar barStyle="light-content" />
	) : (
		<StatusBar barStyle="dark-content" />
	);
};

export default GetIsDarkMode;

const styles = StyleSheet.create({});
