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
	Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../Components/Logo";
import myColors from "../../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { getBearerToken } from "../../utils/bearer.js";
import Popup from "../../Components/Popup";
import popupModes from "../../utils/PopupModes.js";

const ChangePassword = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const height = width / 8;

	const [user, setUser] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupContent, setPopupContent] = useState({
		title: "",
		message: "",
		icon: "",
		iconColor: "",
		type: "",
	});

	const validatePassword = (password) => {
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
		return passwordRegex.test(password);
	};

	const errorPopup = (errorMessage) => {
		setPopupContent({
			title: "Error",
			message: errorMessage,
			icon: "alert-circle",
			iconColor: myColors.red,
			type: "error",
		});
		setPopupVisible(true);
	};

	const showPopup = (mode) => {
		setPopupContent(popupModes[mode]);
		setPopupVisible(true);
	};
	const handleChangePassword = async (userInfo) => {
		const { oldPassword, newPassword, confirmPassword } = userInfo;

		let valid = true;
		const newErrors = {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		};

		if (!validatePassword(newPassword)) {
			newErrors.newPassword =
				"Password must contain 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long.";
			errorPopup(newErrors.newPassword);

			valid = false;
		}

		if (newPassword !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match.";
			errorPopup(newErrors.confirmPassword);
			valid = false;
		}

		if (user.oldPassword === "") {
			newErrors.oldPassword = "Please fill out old Password field";
			errorPopup(newErrors.oldPassword);
			valid = false;
		}

		setErrors(newErrors);

		if (!valid) {
			return;
		}

		try {
			const token = await getBearerToken();
			const userData = {
				old_password: oldPassword,
				new_password: newPassword,
			};

			const response = await axios.put(
				"http://192.168.1.100:8000/api/updatePassword",
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			Alert.alert("Success", "Password changed successfully!");
			navigate();
		} catch (error) {
			if (error.response && error.response.status === 401) {
				const errorMessage = error.response.data.message;
				if (errorMessage === "Old password is incorrect") {
					errorPopup("Old password is incorrect");
				} else {
					errorPopup("Validation error or other issue.");
				}
			} else {
				errorPopup("Failed to change password. Please try again.");
			}

			setPopupVisible(true);
		}
	};

	const handleChange = (name, value) => {
		setUser({ ...user, [name]: value });
	};

	const navigate = () => {
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
					<Logo width={width / 2} height={height / 2} />
				</View>
				<Text style={styles.title}>Change Password</Text>
				<View style={styles.container}>
					<TextInput
						style={styles.textInput}
						placeholder="Old Password"
						secureTextEntry={true}
						onChangeText={(text) => handleChange("oldPassword", text)}
						value={user.oldPassword}
					/>

					<TextInput
						style={styles.textInput}
						placeholder="New Password"
						secureTextEntry={true}
						onChangeText={(text) => handleChange("newPassword", text)}
						value={user.newPassword}
					/>

					<TextInput
						style={styles.textInput}
						placeholder="Confirm New Password"
						secureTextEntry={true}
						onChangeText={(text) => handleChange("confirmPassword", text)}
						value={user.confirmPassword}
					/>

					<TouchableOpacity
						style={styles.button}
						onPress={() => handleChangePassword(user)}
					>
						<Text style={styles.buttonText}>Change Password</Text>
					</TouchableOpacity>
				</View>

				<Popup
					visible={popupVisible}
					onClose={() => setPopupVisible(false)}
					title={popupContent.title}
					message={popupContent.message}
					icon={popupContent.icon}
					iconColor={popupContent.iconColor}
					type={popupContent.type}
				/>
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
		padding: 20,
	},
	textInput: {
		width: "100%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		fontFamily: "SF",
	},
	button: {
		backgroundColor: myColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
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
	errorText: {
		color: "red",
		fontSize: 14,
		marginVertical: 4,
	},
});
