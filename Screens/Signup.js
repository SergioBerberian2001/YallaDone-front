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
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import myColors from "../myColors";

const Signup = (props) => {
	const { onNavigate } = props;
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);
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

	const toggleDatePicker = () => {
		setShowPicker(!showPicker);
	};

	const onDateChange = ({ type }, selectedDate) => {
		if (type == "set") {
			const currentDate = selectedDate;
			setDate(currentDate);
			if (Platform.OS === "android") {
				toggleDatePicker();
				setDateOfBirth(currentDate.toDateString());
				user.birthday == currentDate.toDateString();
			}
		} else {
			toggleDatePicker();
		}
	};

	const confirmIOSDate = () => {
		setDateOfBirth(date.toDateString());
		setUser.birthday == date.toDateString();
		toggleDatePicker();
	};
	const handleSignupFirst = () => {
		ToggleModal();
		if (handleError(user) === "") {
			setError("");
		}
	};

	const handleSignupSecond = () => {
		if (handleErrorModal(user) === "") {
			console.log(user);
			// setUser({
			// 	id: "",
			// 	email: "",
			// 	password: "",
			// 	confirmPass: "",
			// 	firstName: "",
			// 	lastName: "",
			// });
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
						<View style={styles.centeredView}>
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
							<Text style={styles.modalText}>Date Of Birth:</Text>
							{showPicker && (
								<DateTimePicker
									mode="date"
									display="spinner"
									value={date}
									onChange={onDateChange}
									style={styles.datePicker}
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
								style={styles.signupButton}
								onPress={handleSignupSecond}
							>
								<Text style={styles.signupText}>Signup</Text>
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
		height: "90%",
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
		color: "black",
		fontFamily: "SF-medium",
		fontSize: 16,
		margin: 8,
		fontSize: 16,
	},
	datePicker: {
		color: "black",
		backgroundColor: "rgba(47,61,126,0.8)",
		borderRadius: 20,
	},
	dateButtonsView: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 8,
	},
	dateCancelButton: {
		backgroundColor: myColors.blue,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		padding: 14,
		marginHorizontal: 8,
		width: "40%",
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	dateCancelText: {
		color: myColors.white,
		fontFamily: "SF",
	},
	dateConfirmButton: {
		backgroundColor: myColors.blue,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		padding: 14,
		width: "40%",
		marginHorizontal: 8,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	dateConfirmText: {
		color: myColors.white,
		fontFamily: "SF",
	},
});
