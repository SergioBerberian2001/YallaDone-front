import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";
import { useNotificationSettings } from "../utils/NotificationContext.js";
import { Ionicons } from "react-native-vector-icons";

const ToggleButton = ({
	initialValue = false,
	onToggle,
	isTheme,
	isNotification,
}) => {
	const { isDarkMode } = useMyColorTheme();
	const { notificationsEnabled } = useNotificationSettings();
	const [isEnabled, setIsEnabled] = useState(initialValue);
	useEffect(() => {
		if (isDarkMode && isTheme) {
			setIsEnabled(isDarkMode);
		}
		if (notificationsEnabled && isNotification) {
			setIsEnabled(notificationsEnabled);
		}
	}, []);
	const handleToggle = () => {
		const newValue = !isEnabled;
		setIsEnabled(newValue);
		if (onToggle) {
			onToggle(newValue);
		}
	};

	const handleIcon = () => {
		if (isTheme) {
			return true;
		}
	};

	return (
		<TouchableOpacity
			style={[styles.button, isEnabled ? styles.enabled : styles.disabled]}
			onPress={handleToggle}
		>
			<View
				style={[
					styles.circle,
					isEnabled ? styles.circleEnabled : styles.circleDisabled,
				]}
			>
				{isTheme && (
					<Ionicons
						name={isDarkMode ? "moon" : "sunny"}
						color={isDarkMode ? "gray" : "white"}
						size={16}
					/>
				)}

				{isNotification && (
					<Ionicons
						name={notificationsEnabled ? "notifications" : "notifications-off"}
						color={notificationsEnabled ? "gray" : "white"}
						size={16}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 2,
		borderRadius: 200,
		width: 50,
	},
	enabled: {
		backgroundColor: "red",
		justifyContent: "flex-end",
	},
	disabled: {
		backgroundColor: "rgba(0,0,0,0.1)",
	},
	label: {
		fontSize: 16,
		color: "white",
	},
	circle: {
		width: 25,
		height: 25,
		borderRadius: 30,
	},
	circleEnabled: {
		backgroundColor: "white",
		alignSelf: "flex-end",
		alignItems: "center",
		justifyContent: "center",
	},
	circleDisabled: {
		backgroundColor: "grey",
		alignSelf: "flex-start",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ToggleButton;
