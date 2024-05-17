import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {React, useEffect} from "react";
import myColors from "../../utils/myColors";
import { saveBearerToken, getBearerToken, logout } from "../../utils/bearer.js";
import axios from "axios";

const MySettings = ({ navigation }) => {

		const fetchData = async () => {
			try {
				// Retrieve the token
				const token = await getBearerToken();

				// Make the API call with the Authorization header
				const response = await axios.get(
					"http://192.168.1.112:8000/api/logout",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
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

		

const handleLogout = () => {
  fetchData();
}
	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleLogout}>
				<Text>Logout</Text>
			</TouchableOpacity>
			<Text>MySettings</Text>
		</View>
	);
};

export default MySettings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		padding: 8,
		backgroundColor: myColors.blue,
	},
});
