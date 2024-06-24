import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	KeyboardAvoidingView,
	Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Logo from "../Components/Logo";
import Signup from "./Signup";
import Login from "./Login";
import { myColors, myDarkColors } from "../utils/myColors";
import slides from "../assets/data/slides";
import { CommonActions } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const Form = ({ navigation, route }) => {
	const width = 280;
	const height = 35;
	const slidesInfo = slides;
	const { isCreating } = route.params;
	const [isSigningUp, setIsSigningUp] = useState(true);
	useEffect(() => {
		setIsSigningUp(isCreating);
	}, []);

	const handleIsSigningUp = () => {
		setIsSigningUp(true);
	};
	const handleIsSigningIn = () => {
		setIsSigningUp(false);
	};

	const navigateToOTP = (user, token) => {
		// setIsSigningUp(true),
		// navigation.navigate("Form");

		navigation.navigate("OTP", { user, token });
	};

	const navigateToHome = () => {
		// setIsSigningUp(true),
		// navigation.navigate("Form");
	
		navigation.dispatch(
			CommonActions.reset({
			  index: 0,
			  routes: [
				{ name: 'DrawerScreen' },
			  ],
			})
		  );
	};


	return (
		<KeyboardAvoidingView style={styles.background1} behavior="padding">
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<ImageBackground
					source={require("../assets/images/splash-bg.jpg")}
					style={styles.background}
				>
					<View style={styles.logoView}>
						<Logo width={width} height={height} />
					</View>
					<View style={styles.container}>
						{isSigningUp ? (
							<View style={styles.swapMainContainer}>
								<TouchableOpacity
									style={styles.swapContainerOn}
									onPress={handleIsSigningUp}
								>
									<Text style={styles.swapText}>Register</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.swapContainerOff}
									onPress={handleIsSigningIn}
								>
									<Text style={styles.swapText}>Login</Text>
								</TouchableOpacity>
							</View>
						) : (
							<View style={styles.swapMainContainer}>
								<TouchableOpacity
									style={styles.swapContainerOff}
									onPress={handleIsSigningUp}
								>
									<Text style={styles.swapText}>Register</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.swapContainerOn}
									onPress={handleIsSigningIn}
								>
									<Text style={styles.swapText}>Login</Text>
								</TouchableOpacity>
							</View>
						)}
						{isSigningUp ? (
							<Signup onNavigate={navigateToOTP} navigateLogin={handleIsSigningIn} />
						) : (
							<Login onNavigate={navigateToHome} navigateSignup={handleIsSigningUp} />
						)}
					</View>
				</ImageBackground>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default Form;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: SCREEN_WIDTH,
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	background1: {
		flex: 1,
		width: SCREEN_WIDTH,
		alignItems: "center",
	},
	logoView: {
		marginVertical: 64,
	},

	swapMainContainer: {
		flexDirection: "row",
		height: 38,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.blue,
		borderRadius: 10,
		padding: 2,
		marginHorizontal: 8,
		marginBottom: 32,
	},
	swapContainerOn: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.4)",
		borderRadius: 8,
		height: "100%",
		marginHorizontal: 1,
	},
	swapContainerOff: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0,0)",
		borderRadius: 8,
		height: "100%",
		marginHorizontal: 1,
	},
	swapText: {
		color: myColors.dirtyWhite,
		fontFamily: "SF-medium",
		fontSize: 16,
	},
	container: {
		width: "100%",
	},
});
