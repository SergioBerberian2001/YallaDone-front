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
import React, { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

const redColor = "#FD2121";

const Signup = (props) => {
	const width = 280;
	const height = 35;
	const { onNavigate } = props;
	const [error, setError] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [user, setUser] = useState({
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPass: "",
		birthday: "",
		birthmonth: "",
		birthyear: "",
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
		} else if (acceptTerms == false) {
			message = "You must accept the Terms and Conditions";
		}
		setError(message);
		return message;
	};

	const handleErrorModal = (userError) => {
		let message = "";
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
		if (userError.firstName.length === 0) {
			message = "First name can't be empty";
		} else if (userError.lastName.length === 0) {
			message = "Last name can't be empty";
		} else if (userError.firstName.length >= 20) {
			message = "First name must be shorter than 20 characters";
		} else if (userError.lastName.length >= 20) {
			message = "Last name must be shorter than 20 characters";
		}
		setError(message);
		return message;
	};

	const ToggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const handleSignupFirst = () => {
		if (handleError(user) === "") {
			setError("");
			ToggleModal();
		}
	};

	const handleSignupSecond = () => {
		if (handleErrorModal(user) === "") {
			setUser({
				id: "",
				email: "",
				password: "",
				confirmPass: "",
				firstName: "",
				lastName: "",
			});
			setError("");
			ToggleModal();
			onNavigate();
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View>
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
				<TouchableOpacity
					style={styles.signupButton}
					onPress={handleSignupFirst}
				>
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
						<Text style={styles.loginMainText}>Already have an account? </Text>
						<TouchableOpacity style={styles.loginTouchable}>
							<Text style={styles.loginText}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						ToggleModal();
					}}
				>
					<TouchableWithoutFeedback
						onPress={Keyboard.dismiss}
						accessible={false}
					>
						<GestureHandlerRootView style={styles.centeredView}>
							<Swipeable
								onSwipeableClose={ToggleModal}
								style={styles.centeredView}
							>
								{/* <TouchableOpacity style={styles.swipe}>
								<Text>------</Text>
							</TouchableOpacity> */}
								<Text style={styles.modalText}>Please give us your name:</Text>
								<TextInput
									placeholder="First Name"
									placeholderTextColor="rgba(60,60,67,0.3)"
									style={styles.textInput}
									onChangeText={(value) => onUpdateField("firstName", value)}
									value={user.firstName}
								/>
								<TextInput
									placeholder="Last Name"
									placeholderTextColor="rgba(60,60,67,0.3)"
									style={styles.textInput}
									onChangeText={(value) => onUpdateField("lastName", value)}
									value={user.lastName}
								/>
								<Text style={styles.modalText}>Birthday:</Text>
								<View style={styles.dateView}>
									<View style={styles.dateChild}>
										<TextInput
											placeholder="DD"
											placeholderTextColor="rgba(60,60,67,0.3)"
											style={styles.textInput}
											onChangeText={(value) => onUpdateField("birthday", value)}
											value={user.birthday}
											keyboardType="numeric"
										/>
									</View>
									<View>
										<TextInput
											placeholder="MM"
											placeholderTextColor="rgba(60,60,67,0.3)"
											style={styles.textInput}
											onChangeText={(value) =>
												onUpdateField("birthmonth", value)
											}
											value={user.birthmonth}
											keyboardType="numeric"
										/>
									</View>
									<View>
										<TextInput
											placeholder="YYYY"
											placeholderTextColor="rgba(60,60,67,0.3)"
											style={styles.textInput}
											onChangeText={(value) =>
												onUpdateField("birthyear", value)
											}
											value={user.birthyear}
											keyboardType="numeric"
										/>
									</View>
								</View>
								<Text style={styles.errorText}>{error}</Text>
								<TouchableOpacity
									style={styles.signupButton}
									onPress={handleSignupSecond}
								>
									<Text style={styles.signupText}>Signup</Text>
								</TouchableOpacity>
							</Swipeable>
						</GestureHandlerRootView>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Signup;

const styles = StyleSheet.create({
	textInput: {
		width: "100%",
		fontSize: 16,
		borderRadius: 5,
		marginHorizontal: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: "rgba(242,242,247,0.9)",
		// backgroundColor: "lightgreen",
		fontFamily: "SF",
	},
	formView: {
		width: "100%",
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 8,
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
	centeredView: {
		height: "90%",
		width: "100%",
		backgroundColor: "#FFFFFF",
		position: "absolute",
		bottom: 0,
		padding: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,

		// justifyContent: "center",
		// alignItems: "center",
	},
	swipe: {
		backgroundColor: "blue",
		width: "100%",
		height: 40,
	},
	dateView: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
	},
	dateChild: {},
	modalText: {
		color: "black",
		fontFamily: "SF",
		fontSize: 16,
		margin: 8,
		fontSize: 16,
	},
});
