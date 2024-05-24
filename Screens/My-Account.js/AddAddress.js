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
	ActivityIndicator,
	ScrollView,
	Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../Components/Logo";
import myColors from "../../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { saveBearerToken, getBearerToken, logout } from "../../utils/bearer.js";
import Loading from "../../Components/Loading.js";
import MapView, { Marker } from "react-native-maps";
import MyMap from "../../Components/MyMap.js";

const AddAddress = ({ navigation, route }) => {
	const { paramAddress, isCreating } = route.params;
	const { width } = useWindowDimensions();
	const height = width / 8;
	const marginH = { marginHorizontal: 8 };
	const [isLoading, setIsLoading] = useState(false);
	const [locationInfo, setLocation] = useState({
		address_id: paramAddress.address_id,
		name: paramAddress.name,
		district: paramAddress.district,
		city: paramAddress.city,
		street: paramAddress.street,
		building: paramAddress.building,
		floor: paramAddress.floor,
		additional_info: paramAddress.additional_info,
		type: paramAddress.location_type,
		longitude: paramAddress.longitude,
		latitude: paramAddress.latitude,
	});
	const [initialLocation, setInitialLocation] = useState({
		longitude: paramAddress.longitude,
		latitude: paramAddress.latitude,
	});

	const [selectedType, setSelectedType] = useState(null);

	const handlePress = (type) => {
		setSelectedType(type);
		setLocation((prevLocationInfo) => ({ ...prevLocationInfo, type }));
	};

	const getButtonStyle = (type) => {
		return selectedType === type
			? styles.selectedTypeButton
			: styles.typeButton;
	};

	useEffect(() => {
		handlePress(locationInfo.type);
		getButtonStyle(locationInfo.type);
	}, []);

	const showDeleteConfirmation = () => {
		Alert.alert(
			"Delete Contact",
			"Are you sure you want to delete your account?",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Delete", onPress: () => handleDeleteLocation(locationInfo) },
			]
		);
	};

	const handleUpdateLocation = async (location) => {
		try {
			const token = await getBearerToken();
			const userData = {
				name: location.name,
				district: location.district,
				city: location.city,
				street: location.street,
				building: location.building,
				floor: location.floor,
				additional_info: location.additional_info,
				location_type: location.type,
				longitude: parseFloat(location.longitude), // Convert to number
				latitude: parseFloat(location.latitude),
			};
			console.log(location.address_id);

			const addressId = location.address_id; // Assuming address_id is a number
			const url = `http://192.168.1.112:8000/api/UpdateUserLocation/${addressId}`;

			const response = await axios.put(url, userData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log("Response:", response.data);
			navigate();
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const handleCreateLocation = async (location) => {
		try {
			const token = await getBearerToken();
			const userData = {
				name: location.name,
				district: location.district,
				city: location.city,
				street: location.street,
				building: location.building,
				floor: location.floor,
				additional_info: location.additional_info,
				location_type: location.type,
				longitude: parseFloat(location.longitude),
				latitude: parseFloat(location.latitude),
			};
			console.log(userData);
			const response = await axios.post(
				"http://192.168.1.112:8000/api/createUserLocation",
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("Response:", response.data);
			navigate();
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const handleDeleteLocation = async (location) => {
		try {
			const token = await getBearerToken();

			const addressId = location.address_id; // Assuming address_id is a number
			const url = `http://192.168.1.112:8000/api/DestroyUserLocation/${addressId}`;

			const response = await axios.delete(url,  {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			console.log("Response:", response.data);
			navigate();
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const handleChange = (name, value) => {
		setLocation({ ...locationInfo, [name]: value });
	};

	const navigate = () => {
		// Handle form submission or navigation logic here
		navigation.goBack();
	};

	const updateCoordinates = (latitude, longitude) => {
		setLocation((prevLocationInfo) => ({
			...prevLocationInfo,
			latitude,
			longitude,
		}));
		console.log(longitude);
		console.log(latitude);
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
				<ScrollView style={styles.scroll}>
					<View style={styles.topViewContainer}>
						<TouchableOpacity style={styles.topView} onPress={navigate}>
							<Ionicons
								name="chevron-back-outline"
								color={myColors.white}
								size={32}
							/>
							<Text style={styles.topText}>My Account</Text>
						</TouchableOpacity>

						{!isCreating && (
							<TouchableOpacity
								style={styles.deleteButton}
								onPress={showDeleteConfirmation}
							>
								<Text style={[styles.topText, { color: myColors.white }]}>
									Delete
								</Text>
								<Ionicons
									name="trash-outline"
									color={myColors.white}
									size={20}
								/>
							</TouchableOpacity>
						)}
					</View>

					<Text style={styles.title}>Add New Address</Text>

					<View>
						<MyMap
							updateCoordinates={updateCoordinates}
							initialLocation={initialLocation}
						/>
					</View>

					<View style={styles.typeContainer}>
						<TouchableOpacity
							style={getButtonStyle("Home")}
							onPress={() => handlePress("Home")}
						>
							<Ionicons name="home-outline" color={myColors.blue} size={32} />
							<Text style={styles.typeTitle}>Home</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={getButtonStyle("Work")}
							onPress={() => handlePress("Work")}
						>
							<Ionicons
								name="briefcase-outline"
								color={myColors.blue}
								size={32}
							/>
							<Text style={styles.typeTitle}>Work</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={getButtonStyle("Other")}
							onPress={() => handlePress("Other")}
						>
							<Ionicons
								name="location-outline"
								color={myColors.blue}
								size={32}
							/>
							<Text style={styles.typeTitle}>Other</Text>
						</TouchableOpacity>
					</View>

					<Text style={styles.title}>Address Details</Text>
					<View style={styles.container}>
						<Text style={styles.inputTitle}>Name</Text>
						<TextInput
							style={styles.textInput}
							placeholder="Name"
							onChangeText={(text) => handleChange("name", text)}
							value={locationInfo.name}
						/>
						<Text style={styles.inputTitle}>District</Text>
						<TextInput
							style={styles.textInput}
							placeholder="District"
							onChangeText={(text) => handleChange("district", text)}
							value={locationInfo.district}
						/>
						<Text style={styles.inputTitle}>City</Text>
						<TextInput
							style={styles.textInput}
							placeholder="City"
							onChangeText={(text) => handleChange("city", text)}
							value={locationInfo.city}
						/>
						<Text style={styles.inputTitle}>Street</Text>
						<TextInput
							style={styles.textInput}
							placeholder="Street"
							onChangeText={(text) => handleChange("street", text)}
							value={locationInfo.street}
						/>
						<Text style={styles.inputTitle}>Building</Text>
						<TextInput
							style={styles.textInput}
							placeholder="Building"
							onChangeText={(text) => handleChange("building", text)}
							value={locationInfo.building}
						/>
						<Text style={styles.inputTitle}>Floor</Text>
						<TextInput
							style={styles.textInput}
							placeholder="Floor"
							onChangeText={(text) => handleChange("floor", text)}
							value={locationInfo.floor}
						/>
						<Text style={styles.inputTitle}>
							Additional Information(Optional)
						</Text>
						<TextInput
							style={styles.textInput}
							placeholder="Additional Information"
							onChangeText={(text) => handleChange("additional_info", text)}
							value={locationInfo.additional_info}
						/>

						{isCreating ? (
							<TouchableOpacity
								style={styles.button}
								onPress={() => handleCreateLocation(locationInfo)}
							>
								<Text style={styles.buttonText}>Create New Address </Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								style={styles.button}
								onPress={() => handleUpdateLocation(locationInfo)}
							>
								<Text style={styles.buttonText}>Update Address </Text>
							</TouchableOpacity>
						)}
					</View>
				</ScrollView>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

export default AddAddress;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
		alignItems: "center",
	},
	scroll: {
		flex: 1,
		width: "100%",
	},
	logoView: {
		marginVertical: 40,
	},
	title: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myColors.blue,
		marginVertical: 10,
		alignSelf: "center",
	},
	container: {
		width: "100%",
		paddingHorizontal: 20, // Add padding for better spacing
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
		marginVertical: 16,
		marginBottom: 32,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
	topView: {
		marginLeft: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	topViewContainer: {
		marginTop: 50,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	deleteButton: {
		marginRight: 10,
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
		backgroundColor: myColors.red,
		borderRadius: 25,
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.white,
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
	typeContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	typeButton: {
		backgroundColor: "rgba(255,255,255,0.4)",
		padding: 28,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		aspectRatio: 1,
	},
	selectedTypeButton: {
		backgroundColor: myColors.white,
		padding: 28,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		aspectRatio: 1,
	},
	typeTitle: {
		fontFamily: "SF-medium",
		color: myColors.blue,
	},
	map: {
		width: "90%",
		aspectRatio: 2.5,
		alignSelf: "center",
		borderRadius: 20,
		marginBottom: 10,
	},
});
