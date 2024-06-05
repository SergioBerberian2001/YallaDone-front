import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	Modal,
	Pressable,
	Platform,
	KeyboardAvoidingView,
	Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { myColors, myDarkColors } from "../utils/myColors";
import axios from "axios";
import { saveBearerToken, getBearerToken, logout } from "../utils/bearer.js";
import { Ionicons } from "react-native-vector-icons";
// import { differenceInYears } from 'date-fns';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const Signup = (props) => {
	const { onNavigate } = props;
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [error, setError] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [user, setUser] = useState({
		user_name: "",
		user_lastname: "",
		email: "",
		password: "",
		confirmPass: "",
		birthday: "",
		phone_number: "",
	});
	const [acceptTerms, setAcceptTerms] = useState(false);
	const [receiveEmails, setReceiveEmails] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [apiResponse, setApiResponse] = useState([]);
	const [loadingError, setLoadingError] = useState(false);

	const handleSignup = async (userInfo) => {
		try {
			const userData = {
				user_name: userInfo.user_name,
				user_lastname: userInfo.user_lastname,
				email: userInfo.email,
				birthday: userInfo.birthday,
				phone_number: userInfo.phone_number,
				password: userInfo.password,
			};

			const response = await axios.post(
				"http://192.168.1.100:8000/api/auth/register",
				userData
			);

			// Handle success response here
			await saveBearerToken(response.data.token);
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

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
		} else if (userError.phone_number.length !== 8) {
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
		if (userError.user_name.length === 0) {
			message = "First name can't be empty";
		} else if (userError.user_lastname.length === 0) {
			message = "Last name can't be empty";
		} else if (userError.user_name.length >= 20) {
			message = "First name must be shorter than 20 characters";
		} else if (userError.user_lastname.length >= 20) {
			message = "Last name must be shorter than 20 characters";
		}
		setError(message);
		return message;
	};

	const ToggleModal = () => {
		setModalVisible(!modalVisible);
	};

	const toggleDatePicker = () => {
		setShowPicker(!showPicker);
	};

	const onDateChange = ({ type }, selectedDate) => {
		if (type === "set") {
			const currentDate = selectedDate || date;
			setDate(currentDate);
			if (Platform.OS === "android") {
				toggleDatePicker();
				const formattedDate = currentDate.toISOString().split("T")[0];
				setDateOfBirth(formattedDate);
				setUser((prevUser) => ({
					...prevUser,
					birthday: formattedDate,
				}));
			}
		} else {
			toggleDatePicker();
		}
	};

	const confirmIOSDate = () => {
		const formattedDate = date.toISOString().split("T")[0];
		setDateOfBirth(formattedDate);
		setUser((prevUser) => ({ ...prevUser, birthday: formattedDate }));
		toggleDatePicker();
	};

	const handleSignupFirst = () => {
		if (handleError(user) === "") {
			setError("");
			ToggleModal();
		}
	};

	const handleSignupSecond = async () => {
		if (handleErrorModal(user) === "") {
			try {
				// Assuming handleSignup is an async function
				await handleSignup(user);
				newToken = await getBearerToken();
				onNavigate(user, newToken);
				console.log(user);
				setUser({
					id: "",
					email: "",
					password: "",
					confirmPass: "",
					user_name: "",
					user_lastname: "",
				});
				setError("");
				ToggleModal();
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
							onChangeText={(value) => onUpdateField("phone_number", value)}
							value={user.phone_number}
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
							<Text style={styles.loginMainText}>
								Already have an account?{" "}
							</Text>
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
							<View style={styles.centeredView}>
								<TouchableOpacity style={styles.topView} onPress={ToggleModal}>
									<Ionicons
										name="chevron-back-outline"
										color={myColors.blue}
										size={24}
									/>
									<Text style={styles.topText}>Back</Text>
								</TouchableOpacity>
								<Text style={styles.modalText}>Please give us your name:</Text>
								<TextInput
									placeholder="First Name"
									placeholderTextColor="rgba(60,60,67,0.3)"
									style={styles.textInput}
									onChangeText={(value) => onUpdateField("user_name", value)}
									value={user.user_name}
								/>
								<TextInput
									placeholder="Last Name"
									placeholderTextColor="rgba(60,60,67,0.3)"
									style={styles.textInput}
									onChangeText={(value) =>
										onUpdateField("user_lastname", value)
									}
									value={user.user_lastname}
								/>
								<Text style={styles.modalText}>Date Of Birth:</Text>
								{showPicker && (
									<DateTimePicker
										mode="date"
										display="spinner"
										value={date}
										onChange={onDateChange}
										style={styles.datePicker}
										themeVariant="light"
									/>
								)}
								{showPicker && Platform.OS === "ios" && (
									<View style={styles.dateButtonsView}>
										<TouchableOpacity
											onPress={toggleDatePicker}
											style={styles.dateCancelButton}
										>
											<Text style={styles.dateCancelText}>Cancel</Text>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={confirmIOSDate}
											style={styles.dateConfirmButton}
										>
											<Text style={styles.dateConfirmText}>Confirm</Text>
										</TouchableOpacity>
									</View>
								)}

								{!showPicker && (
									<Pressable onPress={toggleDatePicker}>
										<TextInput
											style={styles.textInput}
											placeholder="Birthday"
											value={dateOfBirth}
											onChangeText={setDateOfBirth}
											placeholderTextColor="rgba(60,60,67,0.3)"
											editable={false}
											onPressIn={toggleDatePicker}
										></TextInput>
									</Pressable>
								)}

								<Text style={styles.errorText}>{error}</Text>
								<TouchableOpacity
									style={styles.signup2Button}
									onPress={handleSignupSecond}
								>
									<Text style={styles.signup2Text}>Signup</Text>
								</TouchableOpacity>
							</View>
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
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		// backgroundColor: "lightgreen",
		fontFamily: "SF",
	},
	background: { 
		flex: 1,
		width: SCREEN_WIDTH,
		opacity: 1,
		alignItems: "center",
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
	radioView: {
		flexDirection: "row",
		paddingHorizontal: 16,
		marginVertical: 8,
	},
	radiobutton: {
		width: 20,
		height: 20,
		backgroundColor: myColors.dirtyWhite,
		marginRight: 8,
		borderWidth: 2,
		borderRadius: 16,
		borderColor: myColors.dirtyWhite,
	},
	radioText: {
		color: myColors.white,
		fontFamily: "SF",
		fontSize: 16,
	},
	radioButtonSelected: {
		backgroundColor: myColors.red,
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
		color: myColors.white,
		fontFamily: "SF",
		height: "100%",
		fontSize: 16,
	},
	loginTouchable: {
		borderBottomWidth: 1,
		borderBottomColor: myColors.dirtyWhite,
	},
	loginText: {
		color: myColors.white,
		fontFamily: "SF",
		fontSize: 16,
	},
	errorText: {
		color: "#DD2121",
		fontFamily: "SF",
		// fontSize:,
	},
	centeredView: {
		height: "80%",
		width: "100%",
		backgroundColor: myColors.white,
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

	modalText: {
		color: myColors.blue,
		fontFamily: "SF-bold",
		fontSize: 16,
		margin: 8,
	},
	datePicker: {
		color: "black",
		// backgroundColor: "rgba(47,61,126,0.8)",
		// borderRadius: 20,
	},
	dateButtonsView: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 8,
	},
	dateCancelButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		padding: 14,
		marginHorizontal: 8,
		width: "40%",
	},
	dateCancelText: {
		color: myColors.blue,
		fontFamily: "SF-bold",
		fontSize: 16,
	},
	dateConfirmButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		padding: 14,
		width: "40%",
		marginHorizontal: 8,
	},
	dateConfirmText: {
		color: myColors.blue,
		fontFamily: "SF-bold",
		fontSize: 16,
	},
	signup2Button: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.blue,
		borderRadius: 10,
		padding: 14,
		marginHorizontal: 8,
		marginVertical: 40,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	signup2Text: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 18,
	},
	topView: {
		margin: 10,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
		width:"30%"
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.blue,
	},
});
