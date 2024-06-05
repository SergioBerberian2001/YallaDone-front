import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import myColors from "../../utils/myColors";
import { saveBearerToken, getBearerToken, logout } from "../../utils/bearer.js";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ToggleButton from "../../Components/ToggleButton.js";
import Loading from "../../Components/Loading.js";
import UserContext from "../../utils/UserContext.js";
import { useTheme } from "../../utils/ThemeContext"; // Import useTheme hook

const MySettings = (props) => {
	const { user, clearUser } = useContext(UserContext);
	const { onToggle } = props;
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(false);
	const { isDarkMode, toggleTheme } = useTheme(); // Use useTheme hook

	const logoutAxios = async () => {
		try {
			const token = await getBearerToken();
			const response = await axios.get("http://192.168.1.100:8000/api/logout", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			await logout();
			navigation.navigate("Splash");
		} catch (error) {
			console.error("Error fetching data:", error);
			if (error.response) {
				console.error("Status:", error.response.status);
				console.error("Data:", error.response.data);
			}
		}
	};

	const deleteAccount = async () => {
		try {
			const token = await getBearerToken();
			const response = await axios.delete(
				"http://192.168.1.100:8000/api/DestroyUser",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			clearUser();
			await logout();
			navigation.navigate("Splash");
		} catch (error) {
			console.error("Error fetching data:", error);
			if (error.response) {
				console.error("Status:", error.response.status);
				console.error("Data:", error.response.data);
			}
		}
	};

	const handleLogoutFront = async () => {
		await logout();
		navigation.navigate("Splash");
	};

	const handleLogout = () => {
		try {
			clearUser();
			logoutAxios();
			handleLogoutFront();
		} catch (error) {
			clearUser();
			handleLogoutFront();
		}
	};

	const toggleModal = () => {
		onToggle();
	};

	const showDeleteConfirmation = () => {
		Alert.alert(
			"Delete Contact",
			"Are you sure you want to delete your account?",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Delete", onPress: deleteAccount },
			]
		);
	};

	const switchTheme = () => {
		toggleTheme(); // Toggle theme
		// console.log("Current theme:", isDarkMode ? "dark" : "light"); // Log current theme
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<View style={styles.topRow}>
				<TouchableOpacity onPress={toggleModal}>
					<Text style={styles.text}>Close</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.row}>
				<Text style={styles.text}>Turn Off Notifications</Text>
				<ToggleButton
					label="Turn Off Notifications"
					onToggle={(value) => console.log(hello)}
				/>
			</View>
			<View style={styles.row}>
				<Text style={styles.text}>Switch Theme</Text>
				<ToggleButton
					label="Switch Theme"
					onToggle={switchTheme} // Call switchTheme function
				/>
			</View>
			<View style={styles.row}>
				<TouchableOpacity onPress={handleLogout}>
					<Text style={styles.text}>Log Out</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.BottomRow}>
				<TouchableOpacity onPress={showDeleteConfirmation}>
					<Text style={[styles.text, { color: "red" }]}>Delete account</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default MySettings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		alignItems: "flex-start",
		backgroundColor: myColors.dirtyWhite,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	topRow: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "flex-end",
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	row: {
		flex: 0.2,
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		width: "100%",
		borderBottomColor: "rgba(0,0,0,0.3)",
		alignItems: "center",
		padding: 16,
	},
	BottomRow: {
		flex: 0.2,
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		padding: 16,
	},
	text: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.blue,
	},
});
