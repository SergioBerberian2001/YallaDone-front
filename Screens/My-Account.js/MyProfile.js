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
	SafeAreaView,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../Components/Logo";
import { myColors, myDarkColors } from "../../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { saveBearerToken, getBearerToken, logout } from "../../utils/bearer.js";
import Loading from "../../Components/Loading.js";
import Popup from "../../Components/Popup.js";
import popupModes from "../../utils/PopupModes.js";

const MyProfile = ({ navigation, route }) => {
	const { width } = useWindowDimensions();
	const height = width / 8;
	const marginH = { marginHorizontal: 8 };
	const [isLoading, setIsLoading] = useState(true);
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupContent, setPopupContent] = useState({
		title: "",
		message: "",
		icon: "",
		iconColor: "",
		type: "",
	});
	const [user, setUser] = useState({
		user_name: "",
		user_lastname: "",
		email: "",
		birthday: "",
		phone_number: "",
		countryCode: "+961",
		bday: "",
		bmonth: "",
		byear: "",
	});
	const [errors, setErrors] = useState({
		user_name: "",
		user_lastname: "",
		email: "",
		phone_number: "",
		bday: "",
		bmonth: "",
		byear: "",
	});

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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getBearerToken();

				const response = await axios.get(
					"http://192.168.1.100:8000/api/profile",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const userData = response.data.data;

				setUser((prevState) => ({
					...prevState,
					user_name: userData.user_name,
					user_lastname: userData.user_lastname,
					email: userData.email,
					phone_number: userData.phone_number.toString(),
					birthday: userData.birthday.toString(),
				}));

				const [byear, bmonth, bday] = userData.birthday.split("-");
				setUser((prevState) => ({
					...prevState,
					bday,
					bmonth,
					byear,
				}));

				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				if (error.response) {
					console.error("Status:", error.response.status);
					console.error("Data:", error.response.data);
				}
			}
		};

		fetchData();
	}, []);

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validatePhoneNumber = (phoneNumber) => {
		const phoneRegex = /^[0-9]{7,15}$/;
		return phoneRegex.test(phoneNumber);
	};

	const handleChangeInfo = async (userInfo) => {
		const {
			user_name,
			user_lastname,
			email,
			phone_number,
			bday,
			bmonth,
			byear,
		} = userInfo;

		let valid = true;
		const newErrors = {
			user_name: "",
			user_lastname: "",
			email: "",
			phone_number: "",
			bday: "",
			bmonth: "",
			byear: "",
		};

		if (!user_name) {
			newErrors.user_name = "First name is required.";
			errorPopup(newErrors.user_name);
			valid = false;
		}

		if (!user_lastname) {
			newErrors.user_lastname = "Last name is required.";
			errorPopup(newErrors.user_lastname);
			valid = false;
		}

		if (!email || !validateEmail(email)) {
			newErrors.email = "Invalid email address.";
			errorPopup(newErrors.email);
			valid = false;
		}

		if (!phone_number || !validatePhoneNumber(phone_number)) {
			newErrors.phone_number = "Invalid phone number.";
			errorPopup(newErrors.phone_number);
			valid = false;
		}

		if (!bday || bday > 31 || !bmonth || bmonth > 12 || !byear) {
			newErrors.bday = !bday ? "Day is required." : "";
			newErrors.bmonth = !bmonth ? "Month is required." : "";
			newErrors.byear = !byear ? "Year is required." : "";
			errorPopup("Please enter a valid date");
			valid = false;
		}

		setErrors(newErrors);

		if (!valid) {
			return;
		}

		try {
			const token = await getBearerToken();
			const userData = {
				user_name: userInfo.user_name,
				user_lastname: userInfo.user_lastname,
				email: userInfo.email,
				phone_number: userInfo.phone_number,
				birthday: `${userInfo.byear}-${userInfo.bmonth}-${userInfo.bday}`,
			};

			const response = await axios.put(
				"http://192.168.1.100:8000/api/profile/updateUser",
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			Alert.alert("Success", "Profile updated successfully!");
			navigate();
		} catch (error) {
			console.error("Error:", error);
			if (error.response) {
				const errorMessage = error.response.data.message;
				errorPopup("Failed to update profile. Please try again.");
			} else {
				errorPopup("Failed to update profile. Please try again.");
			}
		}
	};

	const handleChange = (name, value) => {
		setUser({ ...user, [name]: value });
	};

	const navigate = () => {
		navigation.goBack();
	};

	if (isLoading) {
		return <Loading />;
	}

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
				<Text style={styles.title}>My Profile</Text>
				<View style={styles.container}>
					<Text style={styles.inputTitle}>First Name</Text>
					<TextInput
						style={styles.textInput}
						placeholder="First Name"
						onChangeText={(text) => handleChange("user_name", text)}
						value={user.user_name}
					/>

					<Text style={styles.inputTitle}>Last Name</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Last Name"
						onChangeText={(text) => handleChange("user_lastname", text)}
						value={user.user_lastname}
					/>

					<Text style={styles.inputTitle}>Email</Text>
					<TextInput
						style={styles.textInput}
						placeholder="Email"
						onChangeText={(text) => handleChange("email", text)}
						value={user.email}
					/>

					<Text style={styles.inputTitle}>Phone Number</Text>
					<View style={styles.PhoneView}>
						<TextInput
							style={styles.codeInput}
							placeholder="Code"
							onChangeText={(text) => handleChange("countryCode", text)}
							value={user.countryCode}
							keyboardType="numeric"
							editable={false}
						/>
						<TextInput
							style={styles.numberInput}
							placeholder="Phone Number"
							onChangeText={(text) => handleChange("phone_number", text)}
							value={user.phone_number}
							keyboardType="numeric"
						/>
					</View>

					<Text style={styles.inputTitle}>Birthday</Text>
					<View style={styles.PhoneView}>
						<TextInput
							style={styles.dateInput}
							placeholder="DD"
							onChangeText={(text) => handleChange("bday", text)}
							value={user.bday}
							keyboardType="numeric"
						/>
						<TextInput
							style={[styles.dateInput, marginH]}
							placeholder="MM"
							onChangeText={(text) => handleChange("bmonth", text)}
							value={user.bmonth}
							keyboardType="numeric"
						/>
						<TextInput
							style={styles.dateInput}
							placeholder="YYYY"
							onChangeText={(text) => handleChange("byear", text)}
							value={user.byear}
							keyboardType="numeric"
						/>
					</View>

					<TouchableOpacity
						style={styles.button}
						onPress={() => handleChangeInfo(user)}
					>
						<Text style={styles.buttonText}>Save Changes</Text>
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

export default MyProfile;

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
	PhoneView: {
		flexDirection: "row",
	},
	codeInput: {
		flex: 1,
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		// backgroundColor: "lightgreen",
		fontFamily: "SF",
		marginRight: 8,
	},
	numberInput: {
		flex: 3,
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		// backgroundColor: "lightgreen",
		fontFamily: "SF",
	},
	inputTitle: {
		fontFamily: "SF-bold",
		fontSize: 16,
		color: myColors.white,
	},
	dateInput: {
		flex: 1,
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		// backgroundColor: "lightgreen",
		fontFamily: "SF",
	},
	backgroundLoading: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
});
