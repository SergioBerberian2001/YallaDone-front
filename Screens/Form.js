import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Logo from "../Components/Logo";

const redColor="#FD2121";

const Form = () => {
	const width = 280;
	const height = 35;
	const [error, setError] = useState("");
	const [user, setUser] = useState({
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPass: "",
		birthday: "",
		phoneNumber: "",
	});
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [receiveEmails, setReceiveEmails] = useState(false);

	const handleToggleAcceptTerms = () => {
		setAcceptTerms(!acceptTerms);
	};

	const handleToggleReceiveEmails = () => {
		setReceiveEmails(!receiveEmails);
	};

	const onUpdateField = (fieldName, value) => {
		setUser({
			...user,
			[fieldName]: value,
		});
	};

	const handleError = (userError) => {
		let message = "";
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

		if (!emailRegex.test(userError.email)) {
			message = "Please enter a valid email";
		} else if (userError.phoneNumber.length !== 8) {
			message = "Phone must be at least 8 numbers";
		} else if (!passwordRegex.test(userError.password)) {
			message =
				"Password must contain at least 8 characters with one capital letter and one number";
		} else if (userError.password !== userError.confirmPass) {
			message = "Passwords don't match";
		} else if (userError.lastName.length === 0) {
			message = "Last name can't be empty";
		} else if (userError.lastName.length >= 20) {
			message = "Last name must be shorter than 20 characters";
		} else if (userError.firstName.length === 0) {
			message = "First name can't be empty";
		} else if (userError.firstName.length >= 20) {
			message = "First name must be shorter than 20 characters";
		}
		setError(message);
		return message;
	};

	const handleSignup = () => {
		if (handleError(user) === "") {
			setUser({
				id: "",
				email: "",
				password: "",
				confirmPass: "",
			});
			setError("");
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ImageBackground
				source={require("../assets/images/splash-bg.jpg")}
				style={styles.background}
			>
				<View style={styles.logoView}>
					<Logo width={width} height={height} />
				</View>
				<View style={styles.container}>
					<View style={styles.swapMainContainer}>
						<TouchableOpacity
							style={styles.swapContainerRegister}
							onPress={() => changeForm(true)}
						>
							<Text style={styles.swapText}>Register</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.swapContainerLogin}>
							<Text style={styles.swapText}>Login</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.formView}>
						<Text style={styles.errorText}>{error}</Text>
						<TextInput
							placeholder="Email"
							placeholderTextColor="rgba(60,60,67,0.3)"
							style={styles.textInput}
							onChangeText={(value) => onUpdateField("email", value)}
							value={user.email}
						/>
						<TextInput
							placeholder="Phone Number"
							placeholderTextColor="rgba(60,60,67,0.3)"
							style={styles.textInput}
							onChangeText={(value) => onUpdateField("phoneNumber", value)}
							value={user.phoneNumber}
							keyboardType="numeric"
						/>
						<TextInput
							secureTextEntry
							placeholder="Password"
							placeholderTextColor="rgba(60,60,67,0.3)"
							style={styles.textInput}
							onChangeText={(value) => onUpdateField("password", value)}
							value={user.password}
						/>
						<TextInput
							secureTextEntry
							placeholder="Confirm Password"
							placeholderTextColor="rgba(60,60,67,0.3)"
							style={styles.textInput}
							onChangeText={(value) => onUpdateField("confirmPass", value)}
							value={user.confirmPass}
						/>
					</View>
					<TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
						<Text style={styles.signupText}>Signup</Text>
					</TouchableOpacity>
					<View>
						<View style={styles.radioView}>
							<TouchableOpacity
								style={[
									styles.radiobutton,
									acceptTerms && styles.radioButtonSelected,
								]}
								onPress={handleToggleAcceptTerms}
							/>
							<Text style={styles.radioText}>
								I accept the term of service and the privacy policy
							</Text>
						</View>
						<View style={styles.radioView}>
							<TouchableOpacity
								style={[
									styles.radiobutton,
									receiveEmails && styles.radioButtonSelected,
								]}
								onPress={handleToggleReceiveEmails}
							/>
							<Text style={styles.radioText}>
								I would like to receive emails about news and events
							</Text>
						</View>
						<View style={styles.loginView}>
							<Text style={styles.loginMainText}>
								Already have an account?{" "}
							</Text>
							<TouchableOpacity style={styles.loginTouchable}>
								<Text style={styles.loginText}>Login</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

export default Form;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logoView: {
		marginVertical: 64,
	},
	textInput: {
		width: "100%",
		fontSize: 16,
		borderRadius: 5,
		marginHorizontal: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: "rgba(242,242,247,0.9)",
		fontFamily: "SF",
	},
	formView: {
		width: "100%",
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 8,
	},
	swapMainContainer: {
		flexDirection: "row",
		height: 38,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.2)",
		borderRadius: 10,
		padding: 2,
		marginHorizontal: 8,
		marginBottom: 32,
	},
	swapContainerRegister: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0,0)",
		borderRadius: 8,
		height: "100%",
		marginHorizontal: 1,
	},
	swapContainerLogin: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F2F2F7",
		borderRadius: 8,
		height: "100%",
		marginHorizontal: 1,
	},
	swapText: {
		color: "black",
		fontFamily: "SF-medium",
		fontSize: 16,
	},
	container: {
		width: "100%",
	},
	signupButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(242,242,247,1)",
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
		color: "#2F3D7E",
		fontSize: 18,
	},
	radioView: {
		flexDirection: "row",
		paddingHorizontal: 16,
		marginVertical: 8,
	},
	radiobutton: {
		width: 20,
		height: 20,
		backgroundColor: "#F2F2F7",
		marginRight: 8,
		borderWidth: 2,
		borderRadius: 16,
		borderColor: "#F2F2F7",
	},
	radioText: {
		color: "white",
		fontFamily: "SF",
		fontSize: 16,
	},
	radioButtonSelected: {
		backgroundColor: redColor,
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
		borderBottomColor: "#F2F2F7",
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
