import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TouchableOpacity,
	useWindowDimensions,
	ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Logo from "../Components/Logo";
import myColors from "../utils/myColors";
import axios from "axios";
import { saveBearerToken, getBearerToken, logout } from "../utils/bearer.js";
import Loading from "../Components/Loading.js";

const Splash = ({ navigation, route }) => {
	const { width } = useWindowDimensions();
	const height = width / 8;
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true); // Loading state

	useEffect(() => {
		const checkLogin = async () => {
			const token = await getBearerToken();
			if (token) {
				navigation.navigate("DrawerScreen");
				console.log("user logged in");
				setIsLoading(false);
			} else if (!token) {
				setIsLoading(false);
				console.log("user not logged in");
			}
		};
		checkLogin();
	});

	const navigateToSignup = () => {
		navigation.navigate("Form", { isCreating: true });
	};

	const navigateToLogin = () => {
		navigation.navigate("Form", { isCreating: false });
	};

	if (isLoading) {
		// Render a loading indicator while fetching the token
		return (
			<Loading />
		);
	}

	return (
		<ImageBackground
			source={require("../assets/images/splash-bg.jpg")}
			style={styles.background}
		>
			<View style={styles.main}>
				<Logo width={width * 0.75} height={height * 0.75} />
				<Text style={styles.welcomeText}>
					Welcome to YALLA DONE. Get ready to make your life easier. Get all the
					services you want, whenever you want. Sign up to get started.
				</Text>
				<View style={styles.buttonsView}>
					<TouchableOpacity style={styles.buttons} onPress={navigateToSignup}>
						<Text style={styles.buttonsText}>Sign up</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttons} onPress={navigateToLogin}>
						<Text style={styles.buttonsText}>Sign in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Splash;

const styles = StyleSheet.create({
	main: {
		flex: 1,
		width: "100%",
		justifyContent: "space-around",
		alignItems: "center",
	},
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
	},
	welcomeText: {
		fontFamily: "SF-bold",
		color: "white",
		justifyContent: "center",
		paddingHorizontal: 16,
		textAlign: "center",
		fontSize: 18,
	},
	buttonsView: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	buttons: {
		backgroundColor: "#FFFFFF",
		width: "100%",
		alignItems: "center",
		marginBottom: 16,
		padding: 24,
		borderRadius: 8,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	buttonsText: {
		fontFamily: "SF-bold",
		color: "#2F3D7E",
		fontSize: 18,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#000000",
	},
});
