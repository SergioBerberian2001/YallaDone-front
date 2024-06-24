import React, { useState, useEffect, useContext, useRef } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	SafeAreaView,
	Button,
	ScrollView,
	Platform,
	KeyboardAvoidingView,
	Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../utils/bearer";
import UserContext from "../utils/UserContext";
import { myColors, myDarkColors } from "../utils/myColors";
import ServiceForm from "../Components/ServiceForm";
import Loading from "../Components/Loading";
import Picker from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from "@react-navigation/native";
import { useMyColorTheme } from "../utils/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const minDate = new Date(Date.now() + 30 * 60 * 1000);
const OrderForm = ({ navigation, route }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { user } = useContext(UserContext);
	const order = route.params;
	const [addresses, setAddresses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [additionalInfo, setAdditionalInfo] = useState("");
	const [newDate, setNewDate] = useState("Set date and time");
	const [time, setTime] = useState();
	const [error, setError] = useState("");
	const pickerRef = useRef();
	const newAddress = {
		address_id: 0,
		name: "",
		district: "",
		city: "",
		street: "",
		building: "",
		floor: "",
		additional_info: "",
		type: "",
		longitude: "",
		latitude: "",
	};

	function open() {
		pickerRef.current.focus();
	}

	function close() {
		pickerRef.current.blur();
	}

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date) => {
		// Remove seconds and timezone information
		const newDate = new Date(date.getTime());
		newDate.setSeconds(0);
		newDate.setMilliseconds(0);

		// Extract formatted date (yyyy-mm-dd)
		const formattedDate = newDate.toISOString().slice(0, 10);

		// Extract formatted time (hh:mm)
		const hours = newDate.getHours() % 24 || 24; // Use 12-hour format (adjust if needed)
		const minutes = newDate.getMinutes().toString().padStart(2, "0"); // Pad with leading zero
		const formattedTime = `${hours}:${minutes}`;

		// Update state variables
		setNewDate(formattedDate);
		setTime(formattedTime); // Assuming you have a state variable called 'time'

		hideDatePicker();
	};

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const token = await getBearerToken();
					const response = await axios.get(
						"http://192.168.1.100:8000/api/UserLocations",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setAddresses(response.data);
					setIsLoading(false);
				} catch (error) {
					console.error("Error fetching data:", error);
					// Handle errors appropriately
				}
			};

			fetchData();
		}, [])
	);

	const navigate = () => {
		navigation.goBack();
	};

	const navigateToCheckout = () => {
		const locationId = selectedAddress.address_id;
		const serviceDate = newDate + " " + time;

		navigation.navigate("Checkout", {
			order,
			locationId,
			serviceDate,
			additionalInfo,
		});
	};

	const handleAddAddress = (paramAddress) => {
		navigation.navigate("AddAddress", { paramAddress, isCreating: true });
	};

	const handleError = () => {
		if (selectedAddress === null) {
			setError("Please fill out address field");
		} else if (newDate === "Set date and time") {
			setError("Please pick a date and time");
		} else {
			setError("");
			navigateToCheckout();
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<KeyboardAvoidingView style={styles.background1} behavior="position">
			<SafeAreaView style={theme.container}>
				<ScrollView>
					<TouchableOpacity
						style={Platform.OS === "ios" ? theme.topView : theme.topViewAndroid}
						onPress={navigate}
					>
						<Ionicons
							name="chevron-back-outline"
							color={myColors.blue}
							size={32}
						/>
						<Text style={theme.topText}>Back</Text>
					</TouchableOpacity>
					<View style={theme.topCard}>
						<ServiceForm order={order} />
					</View>
					<Text style={theme.intro}>
						Please fill out this form to order your service:
					</Text>
					<View style={theme.userInfoCont}>
						<Text style={theme.titles}>
							Name:{" "}
							<Text style={theme.infos}>
								{user.user_name} {user.user_lastname}
							</Text>
						</Text>
						<Text style={theme.titles}>
							Email: <Text style={theme.infos}>{user.email}</Text>
						</Text>
						<Text style={theme.titles}>
							Phone Number: <Text style={theme.infos}>{user.phone_number}</Text>
						</Text>
					</View>
					<Text style={theme.errorText}>{error}</Text>
					<Text style={theme.formTitle}>Address</Text>
					<View style={theme.addressView}>
						<View style={theme.pickerView}>
							<Picker
								style={{
									// Adjust height as needed
									backgroundColor: "#f0f0f0", // Set background color
									borderRadius: 5, // Add border radius
								}}
								placeholder={{ label: "Select your address", value: null }}
								// value={selectedAddress ? selectedAddress.address_id : null}
								onValueChange={(itemValue) => {
									const selected = addresses[itemValue];
									setSelectedAddress(selected);
								}}
								items={addresses.map((address, index) => ({
									label: address.name,
									value: index,
								}))}
								itemStyle={theme.inputIOS} // Apply custom theme
								placeholderStyle={theme.placeholder} // Apply custom theme (optional)
							/>
						</View>
						<TouchableOpacity
							onPress={() => handleAddAddress(newAddress)}
							style={theme.addAddressButton}
						>
							<Text style={theme.addAddressText}>New Address</Text>
						</TouchableOpacity>
					</View>
					<Text style={theme.formTitle}>Date & Time:</Text>
					<View style={theme.dateView}>
						<TouchableOpacity onPress={showDatePicker} style={theme.dateField}>
							<Text style={theme.dateText}>
								{newDate} - {time}{" "}
							</Text>
							<Ionicons
								name="calendar"
								color={isDarkMode ? myDarkColors.blue : myColors.blue}
								size={20}
							/>
						</TouchableOpacity>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="datetime"
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
							themeVariant="light"
							is24Hour={true} // Use false for 12-hour format (optional)
							display="spinner" // Choose 'spinner' or 'calendar' for display style (optional)
							minimumDate={minDate}
						/>
					</View>

					<Text style={theme.formTitle}>Additional Info (Optional)</Text>
					<TextInput
						style={theme.dateField}
						onChangeText={(text) => setAdditionalInfo(text)}
						value={additionalInfo}
						placeholder="Additional Information"
						placeholderTextColor={isDarkMode && myDarkColors.black}
					/>

					<View style={theme.form}></View>

					<TouchableOpacity style={theme.button} onPress={handleError}>
						<Text style={theme.buttonText}>Create Order</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default OrderForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myColors.white,
	},
	background1: {
		flex: 1,
		width: SCREEN_WIDTH,
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	topView: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	topViewAndroid: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		marginTop: "8%",
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.blue,
	},
	topCard: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 16,
	},
	intro: {
		color: myColors.blue,
		fontSize: 16,
		fontFamily: "SF-medium",
		padding: 4,
		paddingHorizontal: 16,
	},
	form: {
		width: "100%",
		paddingHorizontal: 16,
	},
	userInfoCont: {
		width: "100%",
		paddingHorizontal: 16,
	},
	additionalInfoInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 10,
		marginTop: 10,
	},
	pickerView: {
		width: "68%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myColors.blue,
	},
	addressView: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 16,
		justifyContent: "space-between",
	},
	addAddressButton: {
		width: "30%",
		padding: 4,
		marginVertical: 8,

		backgroundColor: myColors.blue,
		borderRadius: 8,
		padding: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	addAddressText: {
		color: myColors.white,
		fontSize: 14,
		fontFamily: "SF-medium",
	},
	titles: {
		color: myColors.blue,
		fontSize: 18,
		fontFamily: "SF-bold",
		paddingVertical: 8,
	},
	infos: {
		color: myColors.black,
		fontSize: 16,
		fontFamily: "SF-medium",
		paddingVertical: 8,
	},
	formTitle: {
		color: myColors.blue,
		fontSize: 16,
		fontFamily: "SF-medium",
		paddingTop: 8,
		paddingHorizontal: 16,
	},
	datePickerView: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 10,
		justifyContent: "space-between",
	},
	dateField: {
		// width: "100%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myColors.blue,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	button: {
		backgroundColor: myColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 24,
		marginHorizontal: 16,
		shadowColor: "#000000",
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 5 },
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
	dateText: {
		fontFamily: "SF",
		color: myColors.blue,
		fontSize: 16,
	},
	inputIOS: {
		fontFamily: "SF",
		color: myColors.blue,
		fontSize: 16,
	},
	placeholder: {
		fontFamily: "SF",
		color: myColors.blue,
		fontSize: 16,
	},
	errorText: {
		fontFamily: "SF-medium",
		color: myColors.red,
		fontSize: 16,
		alignSelf: "center",
		padding: 4,
	},
});
const dark = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myDarkColors.white,
	},
	background1: {
		flex: 1,
		width: SCREEN_WIDTH,
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	topView: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	topViewAndroid: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		marginTop: "8%",
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myDarkColors.blue,
	},
	topCard: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 16,
	},
	intro: {
		color: myDarkColors.blue,
		fontSize: 16,
		fontFamily: "SF-medium",
		padding: 4,
		paddingHorizontal: 16,
	},
	form: {
		width: "100%",
		paddingHorizontal: 16,
	},
	userInfoCont: {
		width: "100%",
		paddingHorizontal: 16,
	},
	additionalInfoInput: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 10,
		marginTop: 10,
	},
	pickerView: {
		width: "68%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myDarkColors.blue,
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myDarkColors.blue,
	},
	addressView: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 16,
		justifyContent: "space-between",
	},
	addAddressButton: {
		width: "30%",
		padding: 4,
		marginVertical: 8,

		backgroundColor: myDarkColors.blue,
		borderRadius: 8,
		padding: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	addAddressText: {
		color: myDarkColors.white,
		fontSize: 14,
		fontFamily: "SF-medium",
	},
	titles: {
		color: myDarkColors.blue,
		fontSize: 18,
		fontFamily: "SF-bold",
		paddingVertical: 8,
	},
	infos: {
		color: myDarkColors.black,
		fontSize: 16,
		fontFamily: "SF-medium",
		paddingVertical: 8,
	},
	formTitle: {
		color: myDarkColors.blue,
		fontSize: 16,
		fontFamily: "SF-medium",
		paddingTop: 8,
		paddingHorizontal: 16,
	},
	datePickerView: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 10,
		justifyContent: "space-between",
	},
	dateField: {
		// width: "100%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 14,
		backgroundColor: myDarkColors.dirtyWhite,
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myDarkColors.blue,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		color: "white",
	},
	button: {
		backgroundColor: myDarkColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 24,
		marginHorizontal: 16,
		shadowColor: "#000000",
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 5 },
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myDarkColors.black,
		fontSize: 16,
	},
	dateText: {
		fontFamily: "SF",
		color: myDarkColors.black,
		fontSize: 16,
	},
	inputIOS: {
		fontFamily: "SF",
		color: myDarkColors.blue,
		fontSize: 16,
	},
	placeholder: {
		fontFamily: "SF",
		color: myDarkColors.blue,
		fontSize: 16,
	},
	errorText: {
		fontFamily: "SF-medium",
		color: myDarkColors.red,
		fontSize: 16,
		alignSelf: "center",
		padding: 4,
	},
});
