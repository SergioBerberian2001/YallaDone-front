import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import myColors from "../utils/myColors";

const ToggleButton = ({ initialValue = false, onToggle }) => {
	const [isEnabled, setIsEnabled] = useState(initialValue);

	const handleToggle = () => {
		const newValue = !isEnabled;
		setIsEnabled(newValue);
		if (onToggle) {
			onToggle(newValue);
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
			/>
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
	},
	circleDisabled: {
		backgroundColor: "grey",
		alignSelf: "flex-start",
	},
});

export default ToggleButton;
