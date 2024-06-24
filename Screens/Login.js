import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	Modal,
	ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { myColors, myDarkColors } from "../utils/myColors";
import axios from "axios";
import { saveBearerToken, getBearerToken } from "../utils/bearer.js";
import UserContext from "../utils/UserContext.js";
import { Ionicons } from "react-native-vector-icons";
import Popup from "../Components/Popup";
import popupModes from "../utils/PopupModes.js";

const Login = (props) => {
	const { onNavigate, navigateSignup } = props;
	const { saveUser } = useContext(UserContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState({
		email: "",
		//81384086
		password: "",
		// /Qwerty1234
	});
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupContent, setPopupContent] = useState({
		title: "",
		message: "",
		icon: "",
		iconColor: "",
		type: "",
	});

	const onUpdateField = (fieldName, value) => {
		setUser({
			...user,
			[fieldName]: value,
		});
	};

	const handlePost = async (userInfo) => {
		setLoading(true);
		try {
			const userData = {
				identifier: userInfo.email,
				password: userInfo.password,
			};
			console.log(userData.identifier);
			console.log(userData.password);
			console.log(userData);
			const response = await axios.post(
				"http://192.168.1.100:8000/api/auth/login",
				userData
			);

			console.log("Response:", response.data);

			await saveBearerToken(response.data.token);
			await fetchData();
		} catch (err) {
			if (err.response) {
				errorPopup(err.response.data.message);
				// console.error('Error response:', err.response.data);
			} else if (err.request) {
				errorPopup("No response received from the server. Please try again");
				// console.error('Error request:', err.request);
			} else {
				errorPopup("Error in setting up the request. Please try again");
				// console.error('Error message:', err.message);
			}
		} finally {
			setLoading(false);
		}
	};

	const fetchData = async () => {
		try {
			// Retrieve the token
			const token = await getBearerToken();

			// Make the API call with the Authorization header
			const response = await axios.get(
				"http://192.168.1.100:8000/api/profile",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// Extract user data from response
			const userData = response.data.data;

			await saveUser(userData);
			onNavigate();
		} catch (error) {
			console.error("Error fetching data:", error);
			if (error.response) {
				console.error("Status:", error.response.status);
				console.error("Data:", error.response.data);
			}
		} 
	};

	const handleError = (userError) => {
		let message = "";
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

		if (!emailRegex.test(userError.email) && userError.email.length !== 8) {
			message = "Please enter a valid email or phone number";
		} else if (!passwordRegex.test(userError.password)) {
			message =
				"Password must contain at least 8 characters with one capital letter and one number";
		}
		setError(message);
		return message;
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



	const handleSignin = async () => {
		if (handleError(user) === "") {
			try {
				// setUser({
				// 	email: "",
				// 	password: "",
				// });
				setError("");
				handlePost(user);
			} catch (error) {
				// Handle errors from handleSignup if needed
				console.error("Error occurred during login:", error);
			}
		}
	};

	const toggleShowPass = () => {
		setShowPassword(!showPassword);
	};

	const navigateToSignup = () => {
		navigation.navigate() 
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View>
				<View style={styles.formView}>
					<Text style={styles.errorText}>{error}</Text>
					<TextInput
						placeholder="Email or Phone Number"
						placeholderTextColor="rgba(60,60,67,0.3)"
						style={styles.textInput}
						onChangeText={(value) => onUpdateField("email", value)}
						value={user.email}
					/>
					<View style={styles.view}>
						<TextInput
							secureTextEntry={!showPassword}
							placeholder="Password"
							placeholderTextColor="rgba(60,60,67,0.3)"
							style={styles.textInput}
							onChangeText={(value) => onUpdateField("password", value)}
							value={user.password}
						/>
						<TouchableOpacity style={styles.eye} onPress={toggleShowPass}>
							{showPassword ? (
								<Ionicons name="eye" color="gray" size={20} />
							) : (
								<Ionicons name="eye-off" color="gray" size={20} />
							)}
						</TouchableOpacity>
					</View>
				</View>
				{loading ? (
					<ActivityIndicator size="large" color={myColors.white} />
				) : (
					<TouchableOpacity style={styles.signupButton} onPress={handleSignin}>
						<Text style={styles.signupText}>Login</Text>
					</TouchableOpacity>
				)}

				<View>
					<View style={styles.loginView}>
						<Text style={styles.loginMainText}>Don't have an account? </Text>
						<TouchableOpacity style={styles.loginTouchable}onPress={navigateSignup} >
							<Text style={styles.loginText}>Signup</Text>
						</TouchableOpacity>
					</View>
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
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Login;

const styles = StyleSheet.create({
	textInput: {
		width: "100%",
		fontSize: 16,
		borderRadius: 5,
		// marginHorizontal: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		// backgroundColor: "lightgreen",
		fontFamily: "SF",
	},
	formView: {
		width: "100%",
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 8,
		marginVertical: 32,
	},

	signupButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.dirtyWhite,
		borderRadius: 10,
		padding: 14,
		marginHorizontal: 8,
		marginVertical: 40,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	signupText: {
		fontFamily: "SF-bold",
		color: myColors.blue,
		fontSize: 18,
	},

	loginView: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 16,
		height: 20,
	},
	loginMainText: {
		color: "white",
		fontFamily: "SF",
		height: "100%",
		fontSize: 16,
	},
	loginTouchable: {
		borderBottomWidth: 1,
		borderBottomColor: myColors.dirtyWhite,
	},
	loginText: {
		color: "white",
		fontFamily: "SF",
		fontSize: 16,
	},
	errorText: {
		color: "#DD2121",
		fontFamily: "SF",
		// fontSize:,
	},
	view: {
		width: "100%",
	},
	eye: {
		position: "absolute",
		right: 15,
		top: "38%",
	},
});
