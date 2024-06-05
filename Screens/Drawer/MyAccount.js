import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
} from "react-native";
import { useState } from "react";
import { myColors, myDarkColors } from "../../utils/myColors";
import MySettings from "../My-Account.js/MySettings";
import { useMyColorTheme } from "../../utils/ThemeContext";

const MyAccount = ({ navigation, route }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const [modalVisible, setModalVisible] = useState(false);

	const ToggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const navigate = (destination) => {
		navigation.navigate(`${destination}`);
	};

	return (
		<SafeAreaView style={theme.container}>
			<Text style={theme.title}>My Account</Text>
			<TouchableOpacity
				style={theme.button}
				onPress={() => navigate("MyProfile")}
			>
				<Text style={theme.text}>MY PROFILE</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={theme.button}
				onPress={() => navigate("MyAddresses")}
			>
				<Text style={theme.text}>MY ADDRESSES</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={theme.button}
				onPress={() => navigate("OrdersHistory")}
			>
				<Text style={theme.text}>ORDERS HISTORY</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={theme.button}
				onPress={() => navigate("MyPoints")}
			>
				<Text style={theme.text}>MY POINTS</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={theme.button}
				onPress={() => navigate("ChangePassword")}
			>
				<Text style={theme.text}>CHANGE PASSWORD</Text>
			</TouchableOpacity>
			<TouchableOpacity style={theme.button} onPress={ToggleModal}>
				<Text style={theme.text}>SETTINGS</Text>
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					ToggleModal();
				}}
			>
				<View style={theme.centeredView}>
					<MySettings onToggle={ToggleModal} />
				</View>
			</Modal>
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
	centeredView: {
		height: "40%",
		width: "100%",
		backgroundColor: myColors.white,
		position: "absolute",
		bottom: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,

		// justifyContent: "center",
		// alignItems: "center",
	},
});

const dark = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: myDarkColors.white,
	},
	title: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myDarkColors.blue,
	},
	button: {
		width: "90%",
		aspectRatio: 9 / 2,
		backgroundColor: myDarkColors.blue,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
	},
	text: {
		fontFamily: "SF-bold",
		fontSize: 20,
		color: myDarkColors.black,
	},
	centeredView: {
		height: "40%",
		width: "100%",
		backgroundColor: myDarkColors.white,
		position: "absolute",
		bottom: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,

		// justifyContent: "center",
		// alignItems: "center",
	},
});

