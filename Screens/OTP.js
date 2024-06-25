import React, { useState, useEffect, useRef, useContext } from "react";
import {
	StyleSheet,
	ImageBackground,
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Dimensions,
	ActivityIndicator,
} from "react-native";
import OtpInput from "@twotalltotems/react-native-otp-input";
import Logo from "../Components/Logo";
import { myColors, myDarkColors } from "../utils/myColors";
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

	const [otp, setOtp] = useState("");
	const [timer, setTimer] = useState(0);
	const [resendEnabled, setResendEnabled] = useState(true);
	const [resendAttempts, setResendAttempts] = useState(0);
	const [attempts, setAttempts] = useState(0);
	const [loading, setLoading] = useState(false);
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
			await axios.delete("http://192.168.1.100:8000/api/unverified-users");
		} catch (error) {
			console.error("Error deleting unverified users:", error);
		}
	};

	const handleOTPSending = async () => {
		if (resendAttempts >= 3) {
			await deleteUnverified();
			stopTimer();
			navigation.navigate("Splash");
			return;
		}
		try {
			const token = await getBearerToken();
			await axios.post(
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
			console.error("Error sending OTP:", error);
		}
	};

	const startTimer = () => {
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

	const stopTimer = () => {
		clearInterval(intervalRef.current);
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
		startFiveMinuteTimer();
		logout();
	}, []);

	const handleVerifyOTP = async (otp) => {
		setLoading(true);
		try {
			const VerifyOTP = parseInt(otp);
			const url = `http://192.168.1.100:8000/api/verify-otp/${VerifyOTP}`;

			const response = await axios.post(
				url,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			await saveUser(user);
			await saveBearerToken(token);
			stopTimer(); // Stop the timer after successful verification
			navigateToOnboarding();
		} catch (error) {
			showPopup("OTPError");
			console.error("Error verifying OTP:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleOtpChange = (text) => setOtp(text);

	const handleSubmit = async (code) => {
		setAttempts((prev) => prev + 1);
		await handleVerifyOTP(code);
		if (attempts >= 3) {
			await deleteUnverified();
			navigation.navigate("Splash");
		}
	};

	const handleResend = async () => {
		startTimer();
		await handleOTPSending();
		setResendAttempts((prev) => prev + 1);
	};

	const navigateToOnboarding = () => {
		navigation.navigate("Onboarding", slides);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<ImageBackground
				source={require("../assets/images/splash-bg.jpg")}
				style={styles.container}
			>
				<View style={styles.logo}>
					<Logo width={280} height={35} />
				</View>
				<View style={styles.padding}>
					<Text style={styles.text}>
						We sent you an email containing the 6 number one time password.
						Please enter it below.
					</Text>
					<OtpInput
						value={otp}
						onChangeText={handleOtpChange}
						pinCount={6}
						codeInputFieldStyle={styles.otpInputContainer}
						style={styles.otpInput}
						onCodeFilled={handleSubmit}
					/>
					{loading ? (
						<ActivityIndicator size="large" color={myColors.white} />
					) : (
						<TouchableOpacity
							style={styles.submitButton}
							onPress={() => handleSubmit(otp)}
						>
							<Text style={styles.submitButtonText}>Submit</Text>
						</TouchableOpacity>
					)}
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
		fontFamily: "SF-medium",
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
