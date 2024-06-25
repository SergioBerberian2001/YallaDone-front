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
	Image,
	Alert,
	Platform,
	KeyboardAvoidingView,
	Dimensions,
} from "react-native";
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../utils/bearer";
import UserContext from "../utils/UserContext";
import { myColors, myDarkColors } from "../utils/myColors";
import Loading from "../Components/Loading";
import ServiceItem from "../Components/ServiceItem.js";
import { RadioButton, Provider as PaperProvider } from "react-native-paper";
import StripeApp from "../Components/Stripe";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useMyColorTheme } from "../utils/ThemeContext.js";
import { useNotificationSettings } from "../utils/NotificationContext.js";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const Checkout = ({ navigation, route }) => {
	const { isDarkMode } = useMyColorTheme();
	const { notificationsEnabled } = useNotificationSettings();
	const theme = isDarkMode ? dark : styles;
	const { order, locationId, serviceDate, additionalInfo } = route.params;
	const [loadingPayment, setLoadingPayment] = useState(false);
	const [formId, setFormId] = useState();
	const [paymentId, setPaymentId] = useState();
	const [checked, setChecked] = useState("cash");

	const navigateToHome = () => {
		navigation.navigate("DrawerScreen");
	};

	const handleSendNotification = async () => {
		try {
			const userData = {
				appId: 22079,
				appToken: "0SHDEOFDqVbkGIJv1q31GU",
				title: "Order Successful",
				body: "You successfully ordered " + order.service_name,
				dateSent: Date.now(),
			};
			const response = await axios.post(
				"https://app.nativenotify.com/api/notification",
				userData
			);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const HandleServiceForm = async () => {
		setLoadingPayment(true);
		try {
			const token = await getBearerToken();
			const userData = {
				location_id: locationId,
				service_date: serviceDate,
				additional_info: additionalInfo,
				service_id: order.service_id,
			};
			const response = await axios.post(
				"http://192.168.1.100:8000/api/StoreUserServiceForm",
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("Response:", response.data);
			console.log(response.data.data.form_id);
			const formid = response.data.data.form_id;
			setFormId(formid);
			const paymentid = await storePayment(); // Return payment ID from storePayment
			await storeOrder(formid, paymentid); // Pass IDs directly
			Alert.alert("Order Successful");
			if (notificationsEnabled) {
				await handleSendNotification();
			}

			navigateToHome();
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setLoadingPayment(false);
		}
	};

	const storePayment = async () => {
		try {
			const token = await getBearerToken();
			const userData = {
				type: checked,
				service_id: order.service_id,
			};
			console.log(userData);
			const response = await axios.post(
				"http://192.168.1.100:8000/api/storePayment",
				userData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("Response:", response.data);
			console.log(response.data.data.payment_id);
			const paymentid = response.data.data.payment_id;
			setPaymentId(paymentid);
			return paymentid; // Return the payment ID
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	};

	const storeOrder = async (formId, paymentId) => {
		try {
			const token = await getBearerToken();
			const userData = {
				payment_id: paymentId,
				form_id: formId,
			};
			console.log(userData);
			const response = await axios.post(
				"http://192.168.1.100:8000/api/storeOrder",
				userData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Response:", response.data);
			console.log("YallaDone");

			// navigateToCheckout();
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	};

	const handleYallacoinPayement = async () => {
		try {
			const token = await getBearerToken();
			const userData = {
				service_id: order.service_id,
			};
			console.log(userData);
			const response = await axios.post(
				"http://192.168.1.100:8000/api/yallacoinPay",
				userData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("Response:", response.data);
			console.log("payed with yallacoins");
			await HandleServiceForm();
		} catch (error) {
			console.error("Error:", error);
			throw error;
		}
	};

	const navigate = () => {
		navigation.goBack();
	};

	return (
		<StripeProvider publishableKey="pk_test_51PMAhL07mb77Stj1OD3V96xsfMLd8bmWXNx8InMbwE1hcTkWjTTSHck6OqOVSlgOuOSPh3RhtxOP2s4hm1kDWuby00L073BzaE">
			<KeyboardAvoidingView style={theme.background1} behavior="position">
				<SafeAreaView style={theme.container}>
					<ScrollView style={theme.scroll}>
						<TouchableOpacity
							style={
								Platform.OS === "ios" ? theme.topView : theme.topViewAndroid
							}
							onPress={navigate}
						>
							<Ionicons
								name="chevron-back-outline"
								color={isDarkMode ? myDarkColors.blue : myColors.blue}
								size={32}
							/>
							<Text style={theme.topText}>Back</Text>
						</TouchableOpacity>
						<Text style={theme.title}>
							You ordered our {order.service_name} service
						</Text>
						<View style={theme.serviceView}>
							<ServiceItem service={order} />
						</View>
						<Text style={theme.title}>Select your method of payment</Text>
						<PaperProvider>
							<View style={theme.RadioContainer}>
								<View style={theme.optionContainer}>
									<RadioButton
										value="cash"
										status={checked === "cash" ? "checked" : "unchecked"}
										color={myColors.red}
									/>
									<TouchableOpacity
										style={theme.optionTouchable}
										onPress={() => setChecked("cash")}
									>
										<Ionicons
											name="wallet"
											color={isDarkMode ? myDarkColors.blue : myColors.blue}
											size={20}
										/>
										<Text style={theme.optionText}>Cash On Delivery</Text>
									</TouchableOpacity>
								</View>

								<View style={theme.optionContainer}>
									<RadioButton
										value="visa"
										status={checked === "visa" ? "checked" : "unchecked"}
										color={myColors.red}
									/>
									<TouchableOpacity
										style={theme.optionTouchable}
										onPress={() => setChecked("visa")}
									>
										<Ionicons
											name="card"
											color={isDarkMode ? myDarkColors.blue : myColors.blue}
											size={20}
										/>
										<Text style={theme.optionText}>VISA Card</Text>
									</TouchableOpacity>
								</View>

								<View style={theme.optionContainer}>
									<RadioButton
										value="yallacoin"
										status={checked === "yallacoin" ? "checked" : "unchecked"}
										color={myColors.red}
									/>
									<TouchableOpacity
										style={theme.optionTouchable}
										onPress={() => setChecked("yallacoin")}
									>
										<Image
											source={require("../assets/images/YallaCoin.png")}
											style={theme.yallacoin}
										/>
										<Text style={theme.optionText}>Redeem YALLACOINS</Text>
									</TouchableOpacity>
								</View>
							</View>
						</PaperProvider>
						{checked === "visa" && (
							<StripeApp onHandleServiceForm={HandleServiceForm} />
						)}
						{checked !== "visa" && (
							<TouchableOpacity
								style={[loadingPayment ? theme.loadingButton : theme.button]}
								onPress={
									checked === "cash"
										? HandleServiceForm
										: handleYallacoinPayement
								}
								disabled={loadingPayment}
							>
								<Text style={theme.buttonText}>
									{checked === "cash"
										? "Pay With Cash On Delivery"
										: "Pay With YALLACOINS"}
								</Text>
							</TouchableOpacity>
						)}
					</ScrollView>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</StripeProvider>
	);
};

export default Checkout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myColors.white,
	},
	background1: {
		flex: 1,
		width: SCREEN_WIDTH,
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

	optionContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
	},
	optionTouchable: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#cccccc",
		marginLeft: 16,
		width: "100%",
		paddingVertical: 8,
	},
	optionText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		paddingHorizontal: 8,
		color: myColors.blue,
	},
	yallacoin: {
		width: 20,
		height: 20,
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
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	loadingButton: {
		backgroundColor: myColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 24,
		marginHorizontal: 16,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
		opacity: 0.5,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
	title: {
		margin: 8,
		marginHorizontal: 16,
		fontFamily: "SF-bold",
		color: myColors.blue,
		fontSize: 16,
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

	optionContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
	},
	optionTouchable: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#cccccc",
		marginLeft: 16,
		width: "100%",
		paddingVertical: 8,
	},
	optionText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		paddingHorizontal: 8,
		color: myDarkColors.black,
	},
	yallacoin: {
		width: 20,
		height: 20,
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
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	loadingButton: {
		backgroundColor: myDarkColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 24,
		marginHorizontal: 16,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
		opacity: 0.5,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myDarkColors.black,
		fontSize: 16,
	},
	title: {
		margin: 8,
		marginHorizontal: 16,
		fontFamily: "SF-bold",
		color: myDarkColors.black,
		fontSize: 16,
	},
});
