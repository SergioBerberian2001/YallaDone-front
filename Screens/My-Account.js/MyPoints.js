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
	Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Logo from "../../Components/Logo";
import { myColors, myDarkColors } from "../../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { getBearerToken } from "../../utils/bearer.js";
import Popup from "../../Components/Popup";
import popupModes from "../../utils/PopupModes.js";
import Loading from "../../Components/Loading.js";

const MyPoints = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const height = width / 8;
	const [isLoading, setIsLoading] = useState(false);
	const [userPoints, setUserPoints] = useState(0);
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupContent, setPopupContent] = useState({
		title: "",
		message: "",
		icon: "",
		iconColor: "",
		type: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getBearerToken();

				const response = await axios.get(
					"http://192.168.1.100:8000/api/getUserPoints",
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const userData = response.data;
				setUserPoints(response.data.points);

				// setUserPoints()
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

	const navigate = () => {
		navigation.goBack();
	};

	const navigateToCategories = () => {
		navigation.navigate("AllCategories");
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
				<Text style={styles.title}>My YALLACOINS</Text>
				<View style={styles.container}>
					<View style={styles.section}>
						<Text style={styles.midText}>You Have</Text>
						<Text style={styles.midText}>{userPoints}</Text>
						<Text style={styles.midText}>YALLACOINS</Text>
					</View>
					<View>
						<Text style={styles.midText}>
							order new services so you can get points to be redeemed with a
							service of your choice
						</Text>
					</View>
					<View style={styles.section}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => navigateToCategories()}
						>
							<Text style={styles.buttonText}>REDEEM YALLACOINS</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonWhite}
							onPress={() => navigate()}
						>
							<Text style={styles.buttonTextWhite}>Order History</Text>
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
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

export default MyPoints;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
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
		height: "80%",
		padding: 20,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	textInput: {
		width: "100%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		fontFamily: "SF",
	},
	button: {
		backgroundColor: myColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 12,
		width: "100%",
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
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
	errorText: {
		color: "red",
		fontSize: 14,
		marginVertical: 4,
	},
	buttonWhite: {
		backgroundColor: myColors.dirtyWhite,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 12,
		width: "100%",
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	buttonTextWhite: {
		fontFamily: "SF-bold",
		color: myColors.blue,
		fontSize: 16,
	},
	midText: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myColors.white,
		padding: 8,
		textAlign: "center",
	},
	section: {
		width: "100%",
		alignItems: "center",
	},
});
