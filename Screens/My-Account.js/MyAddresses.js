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
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../../Components/Logo";
import myColors from "../../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import Loading from "../../Components/Loading";
import { saveBearerToken, getBearerToken, logout } from "../../utils/bearer.js";
import axios from "axios";
import AddressComponent from "../../Components/AddressComponent";
import { useFocusEffect } from "@react-navigation/native";

const MyAddresses = ({ navigation, route }) => {
	const { width } = useWindowDimensions();
	const height = width / 8;
	const [addresses, setAddresses] = useState();
	const [isLoading, setIsLoading] = useState(true);
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

	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const token = await getBearerToken();
					const response = await axios.get(
						"http://192.168.1.112:8000/api/UserLocations",
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
		// Handle form submission or navigation logic here
		navigation.goBack();
	};

	const navigateToForm = (paramAddress) => {
		// Handle form submission or navigation logic here
		navigation.navigate("AddAddress", { paramAddress, isCreating: true });
	};

	const navigateToEditForm = (paramAddress) => {
		// Handle form submission or navigation logic here
		navigation.navigate("AddAddress", { paramAddress, isCreating: false });
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
				<Text style={styles.title}>My Adresses</Text>
				<View style={styles.container}>
					{addresses ? (
						<FlatList
							style={styles.carousel}
							showsVerticalScrollIndicator={false}
							data={addresses}
							keyExtractor={(item) => item.address_id.toString()}
							renderItem={({ item }) => (
								<AddressComponent item={item} onNavigate={navigateToEditForm} />
							)}
						/>
					) : (
						<Text>No Address Yet !</Text>
					)}

					<TouchableOpacity
						style={styles.button}
						onPress={() => navigateToForm(newAddress)}
					>
						<Text style={styles.buttonText}>Add Address</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

export default MyAddresses;

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

		backgroundColor: "rgba(255,255,255,0.4)",
		flexDirection: "row",
		fontFamily: "SF",
		alignItems: "center",
		justifyContent: "space-between",
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
	homeView: {
		padding: 4,
		paddingRight: 8,
	},
	titleText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.white,
	},
	leftContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 14,
	},
	rightContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: myColors.blue,
		height: "100%",
		padding: 14,
		borderTopEndRadius: 8,
		borderBottomEndRadius: 8,
	},
	homeRightView: {
		padding: 4,
		paddingLeft: 8,
	},
});
