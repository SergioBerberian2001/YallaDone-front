import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../Components/Logo";
import myColors from "../../myColors";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";

const ChangePassword = ({ navigation, route }) => {
	const { width } = useWindowDimensions();
	const height = width / 8;

	const [user, setUser] = useState({
        email:"",
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

    const handleChangePassword = async (userInfo) => {
		try {
			const userData = {
                email : userInfo.email,
				password: userInfo.oldPassword,
				new_password: userInfo.newPassword,
			};
            console.log(userData.email);
			console.log(userData.password);
			console.log(userData.new_password);
			console.log(userData);
			const response = await axios.put(
				"http://192.168.1.112:8000/api/changepassword",
				userData
			);

			console.log("Response:", response.data);
			navigate();
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const handleChange = (name, value) => {
		setUser({ ...user, [name]: value });
	};

	const navigate = () => {
		// Handle form submission or navigation logic here
		navigation.goBack();
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ImageBackground
				source={require("../../assets/images/splash-bg.jpg")}
				style={styles.background}
			>
				<TouchableOpacity style={styles.topView} onPress={navigate}>
					<Ionicons
						name="chevron-back-outline"
						color={myColors.white}
						size={32}
					/>
					<Text style={styles.topText}>My Account</Text>
				</TouchableOpacity>
				<View style={styles.logoView}>
					<Logo width={width/2} height={height/2} />
				</View>
				<Text style={styles.title}>Change Password</Text>
				<View style={styles.container}>
                <TextInput
						style={styles.textInput}
						placeholder="Email"
						secureTextEntry={true} // Make password field hidden
						onChangeText={(text) => handleChange("email", text)}
						value={user.email}
					/>
					<TextInput
						style={styles.textInput}
						placeholder="Old Password"
						secureTextEntry={true} // Make password field hidden
						onChangeText={(text) => handleChange("oldPassword", text)}
						value={user.oldPassword}
					/>
					<TextInput
						style={styles.textInput}
						placeholder="New Password"
						secureTextEntry={true} // Make password field hidden
						onChangeText={(text) => handleChange("newPassword", text)}
						value={user.newPassword}
					/>
					<TextInput
						style={styles.textInput}
						placeholder="Confirm New Password"
						secureTextEntry={true} // Make password field hidden
						onChangeText={(text) => handleChange("confirmPassword", text)}
						value={user.confirmPassword}
					/>
					<TouchableOpacity style={styles.button} onPress={() => handleChangePassword(user)}>
						<Text style={styles.buttonText}>Change Password</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

export default ChangePassword;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
		//   justifyContent: "center",
		alignItems: "center",
	},
	logoView: {
		marginVertical: 40,
	},
	title: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myColors.blue,
	},
	container: {
		width: "100%",
		padding: 20, // Add padding for better spacing
	},
	textInput: {
		width: "100%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		// backgroundColor: "lightgreen",
		fontFamily: "SF",
	},
	button: {
		backgroundColor: myColors.red,
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 12,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
	topView: {
		marginTop: 40,
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.white,
	},
});
