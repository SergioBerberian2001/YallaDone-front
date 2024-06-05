import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Modal,
} from "react-native";
import { useState } from "react";
import myColors from "../../utils/myColors";
import MySettings from "../My-Account.js/MySettings";
import { useTheme } from "../../utils/ThemeContext";

const MyAccount = ({ navigation, route }) => {
	const { isDarkMode } = useTheme();
	const [modalVisible, setModalVisible] = useState(false);

	const ToggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const navigate = (destination) => {
		navigation.navigate(`${destination}`);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>My Account</Text>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigate("MyProfile")}
			>
				<Text style={styles.text}>MY PROFILE</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigate("MyAddresses")}
			>
				<Text style={styles.text}>MY ADDRESSES</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigate("OrdersHistory")}
			>
				<Text style={styles.text}>ORDERS HISTORY</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigate("MyPoints")}
			>
				<Text style={styles.text}>MY POINTS</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigate("ChangePassword")}
			>
				<Text style={styles.text}>CHANGE PASSWORD</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button} onPress={ToggleModal}>
				<Text style={styles.text}>SETTINGS</Text>
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
				<View style={styles.centeredView}>
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
		height: "30%",
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
