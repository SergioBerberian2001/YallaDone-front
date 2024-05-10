import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import React from "react";
import MyAccountButton from "../../Components/MyAccountButton";
import myColors from "../../myColors";

const MyAccount = ({ navigation, route }) => {

  const navigate = (destination) => {
		navigation.navigate(`${destination}`);

	};

	return (
		<SafeAreaView style={styles.container} >
			<Text style={styles.title}>My Account</Text>
			<TouchableOpacity style={styles.button} onPress={() => navigate("MyProfile")}>
				<Text style={styles.text}>MY PROFILE</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate("MyAddresses")}>
				<Text style={styles.text}>MY ADDRESSES</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate("OrdersHistory")}>
				<Text style={styles.text}>ORDERS HISTORY</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate("MyPoints")}>
				<Text style={styles.text}>MY POINTS</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate("ChangePassword")}>
				<Text style={styles.text}>CHANGE PASSWORD</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={() => navigate("MySettings")}>
				<Text style={styles.text}>SETTINGS</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default MyAccount;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: myColors.white,
	},
	title: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myColors.blue,
	},
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
});
