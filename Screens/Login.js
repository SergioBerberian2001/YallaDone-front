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
} from "react-native";
import React, { useState, useContext } from "react";
import myColors from "../utils/myColors";
import axios from "axios";
import { saveBearerToken, getBearerToken } from "../utils/bearer.js";
import UserContext from "../utils/UserContext.js";

const Login = (props) => {
	const { onNavigate } = props;
	const { saveUser } = useContext(UserContext);
	const [error, setError] = useState("");
	const [user, setUser] = useState({
		email: "81384086",
		password: "Qwerty1234",
	});

	const onUpdateField = (fieldName, value) => {
		setUser({
			...user,
			[fieldName]: value,
		});
	};

	const handlePost = async (userInfo) => {
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
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
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
				console.error("Error occurred during signup:", error);
			}
		}
	};

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

					<TextInput
						secureTextEntry
						placeholder="Password"
						placeholderTextColor="rgba(60,60,67,0.3)"
						style={styles.textInput}
						onChangeText={(value) => onUpdateField("password", value)}
						value={user.password}
					/>
				</View>
				<TouchableOpacity style={styles.signupButton} onPress={handleSignin}>
					<Text style={styles.signupText}>Login</Text>
				</TouchableOpacity>
				<View>
					<View style={styles.loginView}>
						<Text style={styles.loginMainText}>Don't have an account? </Text>
						<TouchableOpacity style={styles.loginTouchable}>
							<Text style={styles.loginText}>Signup</Text>
						</TouchableOpacity>
					</View>
				</View>
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
		marginHorizontal: 8,
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
});
