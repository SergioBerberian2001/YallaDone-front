// Popup.js
import React from "react";
import {
	Modal,
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Popup = ({ visible, onClose, title, message, icon, iconColor, type }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	return (
		<Modal
			transparent={true}
			animationType="slide"
			visible={visible}
			onRequestClose={onClose}
		>
			<TouchableOpacity style={theme.centeredView} onPress={onClose}>
				<View style={theme.modalView}>
					{icon && <Ionicons name={icon} size={50} color={iconColor} />}
					<Text
						style={[
							theme.modalTitle,
							type == "error"
								? { color: myColors.red }
								: type == "success"
								? { color: "green" }
								: null,
						]}
					>
						{title}
					</Text>

					<Text style={theme.modalMessage}>{message}</Text>
					<TouchableOpacity style={theme.closeButton} onPress={onClose}>
						<Text style={theme.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		</Modal>
	);
};

export default Popup;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		width: SCREEN_WIDTH * 0.8,
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 20,
		fontFamily: "SF-bold",
		marginBottom: 15,
		color: myColors.blue,
	},
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
		fontFamily: "SF-medium",
		color: myColors.blue,
	},
	closeButton: {
		backgroundColor: "#2196F3",
		borderRadius: 5,
		padding: 10,
		elevation: 2,
		shadowColor: "#000000",
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: { width: 2, height: 2 },
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
	},
});


const dark = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		width: SCREEN_WIDTH * 0.8,
		padding: 20,
		backgroundColor: "white",
		borderRadius: 10,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 20,
		fontFamily: "SF-bold",
		marginBottom: 15,
		color: myDarkColors.blue,
	},
	modalMessage: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: "center",
		fontFamily: "SF-medium",
		color: myDarkColors.blue,
	},
	closeButton: {
		backgroundColor: "#2196F3",
		borderRadius: 5,
		padding: 10,
		elevation: 2,
		shadowColor: "#000000",
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: { width: 2, height: 2 },
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
	},
});
