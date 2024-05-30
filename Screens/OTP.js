import React, { useState, useEffect, useRef,useContext } from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Dimensions,
} from "react-native";
import OtpInput from "@twotalltotems/react-native-otp-input";
import Logo from "../Components/Logo";
import myColors from "../utils/myColors";
import slides from "../assets/data/slides";
import { getBearerToken, logout, saveBearerToken } from "../utils/bearer";
import axios from "axios";
import Popup from "../Components/Popup";
import popupModes from "../utils/PopupModes";
import UserContext from "../utils/UserContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const OtpScreen = ({ navigation, route }) => {
	const { user, token } = route.params;
	const { saveUser } = useContext(UserContext);
	// console.log(token);
	const width = 280;
	const height = 35;
	const slidesInfo = slides;
	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(0);
	const [resendEnabled, setResendEnabled] = useState(true);
	const [resendAttempts, setResendAttempts] = useState(0);
	const [attempts, setAttempts] = useState(0);
	const intervalRef = useRef(null);
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupData, setPopupData] = useState({});

	const showPopup = (mode) => {
		setPopupData(popupModes[mode]);
		setPopupVisible(true);
	};

	const handleClosePopup = () => {
		setPopupVisible(false);
	};

	const deleteUnverified = async () => {
		try {
			const response = await axios.delete(
				"http://192.168.1.100:8000/api/unverified-users"
			);
			// console.log(response.data);
		} catch (error) {
			console.error("Error fetching data:", error);
			if (error.response) {
				console.error("Status:", error.response.status);
				console.error("Data:", error.response.data);
			}
			console.log(mydata);
		}
	};

	const handleOTPSending = async () => {
		if (resendAttempts >= 3) {
			await deleteUnverified();
			navigation.navigate("Splash");
			return;
		}
		try {
			const token = await getBearerToken();

			const response = await axios.post(
				"http://192.168.1.100:8000/api/generate-otp",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

		} catch (error) {
			if (error.response) {
				console.error("Error Response Data:", error.response.data);
				console.error("Error Response Status:", error.response.status);
				console.error("Error Response Headers:", error.response.headers);
			} else if (error.request) {
				console.error("Error Request Data:", error.request);
			} else {
				console.error("Error Message:", error.message);
			}
			console.error("Error Config:", error.config);
		}
	};

	const startTimer = async () => {
		setResendEnabled(false);
		setTimer(30);
		clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setTimer((prev) => {
				if (prev === 1) {
					clearInterval(intervalRef.current);
					setResendEnabled(true);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	};

	const startFiveMinuteTimer = () => {
		const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

		setTimeout(() => {
			deleteUnverified();
			navigation.navigate("Splash");
		}, fiveMinutes);
	};

	useEffect(() => {
		handleOTPSending();
		// return () => clearInterval(intervalRef.current);
		logout();
		startFiveMinuteTimer();
	}, []);

	const handleVerifyOTP = async (otp) => {
		try {
			const paramToken = token;
			const VerifyOTP = parseInt(otp);
			const url = `http://192.168.1.100:8000/api/verify-otp/${VerifyOTP}`;

			const response = await axios.post(
				url,
				{},
				{
					headers: {
						Authorization: `Bearer ${paramToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			await saveUser(user);
			await saveBearerToken(token);
			navigateToOnboarding();
			console.log("Response:", response.data);
		} catch (error) {
			console.error("Error:", error);
			if (error.response) {
				showPopup("OTPError");
				console.error("Error Response Data:", error.response.data);
				console.error("Error Response Status:", error.response.status);
				console.error("Error Response Headers:", error.response.headers);
			} else if (error.request) {
				console.error("Error Request Data:", error.request);
			} else {
				console.error("Error Message:", error.message);
			}
		}
	};
	const handleOtpChange = (text) => setOtp(text);

	const handleSubmit = async (code) => {
		setAttempts((prev) => prev + 1);
		await handleVerifyOTP(code);
		if (attempts >= 3) {
			await deleteUnverified();
			navigation.navigate("Splash");
			return;
		}
	};

	const handleResend = async () => {
		startTimer();
		await handleOTPSending();
		setResendAttempts((prev) => prev + 1);
	};

	const navigateToOnboarding = () => {
		navigation.navigate("Onboarding", slidesInfo);
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
						We sent you an email containing the 6 number one time password.
						Please enter it below
					</Text>
					<OtpInput
						value={otp}
						onChangeText={handleOtpChange}
						pinCount={6}
						codeInputFieldStyle={styles.otpInputContainer}
						style={styles.otpInput}
						onCodeFilled={(code) => {
							handleSubmit(code);
						}}
					/>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={() => handleSubmit(otp)}
					>
						<Text style={styles.submitButtonText}>Submit</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							resendEnabled
								? styles.resendLinkButton
								: styles.resendDisabledButton,
						]}
						onPress={handleResend}
						disabled={!resendEnabled}
					>
						<Text style={styles.resendLink}>
							{resendEnabled
								? "Click here to resend the OTP"
								: `Resend OTP in ${timer} seconds`}
						</Text>
					</TouchableOpacity>
				</View>
				<Popup
					visible={popupVisible}
					onClose={handleClosePopup}
					title={popupData.title}
					message={popupData.message}
					icon={popupData.icon}
					iconColor={popupData.iconColor}
					type={popupData.type}
				/>
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
		width: SCREEN_WIDTH / 6,
		aspectRatio: 1,
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
	resendDisabledButton: {
		borderBottomColor: myColors.white,
		borderBottomWidth: 0,
		opacity: 0.5,
	},
});
