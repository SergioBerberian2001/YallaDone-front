import React, { useState } from "react";
import {
	StyleSheet,
	ImageBackground,
	Image,
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import OtpInput from "@twotalltotems/react-native-otp-input";
import Logo from "../Components/Logo";
import myColors from "../myColors";

const OtpScreen = () => {
	const width = 280;
	const height = 35;
	const [otp, setOtp] = useState("");

	const handleOtpChange = (text) => setOtp(text);

	const handleSubmit = () => {
		// Implement your OTP verification logic here
		console.log("OTP:", otp);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ImageBackground
				source={require("../assets/images/splash-bg.jpg")}
				style={styles.container}
			>
				<View style={styles.logo}>
					<Logo width={width} height={height} />
				</View>
				<View style={styles.padding}>
					<Text style={styles.text}>
						We sent you an email containing the 4 number one time password.
						Please enter it below
					</Text>
					<OtpInput
						value={otp}
						onChangeText={handleOtpChange}
						pinCount={4}
						codeInputFieldStyle={styles.otpInputContainer}
						style={styles.otpInput}
						onCodeFilled={(code) => {
							console.log(`Code is ${code}, you are good to go!`);
						}}
					/>
					<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
						<Text style={styles.submitButtonText}>Submit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.resendLinkButton}>
						<Text style={styles.resendLink}>
							Click here if you didn't receive code
						</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</TouchableWithoutFeedback>
	);
};

export default OtpScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	padding: {
		width: "100%",
		height: "60%",
		paddingHorizontal: 8,
		paddingVertical: 36,
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	otpInput: {
		height: "10%",
		width: "100%",
		paddingHorizontal: 32,
	},
	logo: {
		paddingVertical: 20,
	},
	text: {
		fontSize: 24,
		fontFamily: "SF",
		color: myColors.white,
		textAlign: "center",
		marginHorizontal: 16,
		marginBottom: 10,
	},
	otpInputContainer: {
		backgroundColor: myColors.dirtyWhite90,
		borderRadius: 50,
		width: 70,
		height: 70,
		color: myColors.black,
		fontSize: 20,
		fontFamily: "SF-medium",
	},
	submitButton: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myColors.dirtyWhite,
		borderRadius: 10,
		padding: 14,
		marginHorizontal: 8,
		marginVertical: 20,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	submitButtonText: {
		fontFamily: "SF-bold",
		color: myColors.blue,
		fontSize: 18,
	},
	resendLink: {
		fontSize: 16,
		fontFamily: "SF",
		color: myColors.white,
	},
	resendLinkButton: {
		borderBottomColor: myColors.white,
		borderBottomWidth: 1,
	},
});
