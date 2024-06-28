import React, { useState,useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	Alert,
	TouchableOpacity,
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { getBearerToken } from "../utils/bearer";
import VisaCard from "./VisaCard";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";
import UserContext from "../utils/UserContext";

// Change this to the address of your Laravel backend
const API_URL = "http://192.168.1.100:8000/api";

const StripeApp = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { onHandleServiceForm } = props;
	const { user } = useContext(UserContext);
	const [email, setEmail] = useState(user.email);
	const [cardDetails, setCardDetails] = useState();
	const { confirmPayment, loading } = useConfirmPayment();
	const [isLoadingPayment, setIsLoadingPayment] = useState();
	const fetchPaymentIntentClientSecret = async () => {
		setIsLoadingPayment(true);
		try {
			const token = await getBearerToken();
			const response = await fetch(`${API_URL}/createPaymentIntent`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					service_id: 1,
				}),
			});
	
			// Check if response is OK (status 200-299)
			if (!response.ok) {
				const text = await response.text();
				console.error(`HTTP error! status: ${response.status}, body: ${text}`);
				throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
			}
	
			const data = await response.json();
	
			// Ensure data contains clientSecret
			if (!data.clientSecret) {
				throw new Error('clientSecret is missing in response');
			}
	
			return { clientSecret: data.clientSecret, error: data.error };
		} catch (error) {
			console.error("Error fetching payment intent client secret:", error);
			setIsLoadingPayment(false);
			return { error: "Failed to fetch payment intent client secret" };
		} finally {
			setIsLoadingPayment(false);
		}
	};

	const handlePayPress = async () => {
		setIsLoadingPayment(true);
		if (!cardDetails?.complete || !email) {
			setIsLoadingPayment(false);
			Alert.alert("Please enter complete card details and email");
			return;
		}
		const billingDetails = {
			email: email,
		};
		
		try {
			const { clientSecret, error } = await fetchPaymentIntentClientSecret();
			if (error) {
				Alert.alert("Unable to process payment", error);
				setIsLoadingPayment(false);
			} else if (clientSecret) {
				const { paymentIntent, error: confirmError } = await confirmPayment(
					clientSecret,
					{
						paymentMethodType: "Card",
						paymentMethodData: {
							billingDetails: billingDetails,
						},
					}
				);
				if (confirmError) {
					Alert.alert(`Payment Confirmation Error: ${confirmError.message}`);
					setIsLoadingPayment(false);
				} else if (paymentIntent) {
					await onHandleServiceForm();
					console.log("Payment successful:", paymentIntent);
				}
			}
		} catch (e) {
			console.log("Payment error:", e);
			Alert.alert("Payment error", e.message);
			setIsLoadingPayment(false);
		}
	};

	return (
		<View style={theme.container}>
			<VisaCard cardDetails={cardDetails} />
			<TextInput
				autoCapitalize="none"
				placeholder="E-mail"
				keyboardType="email-address"
				value={email}
				onChange={(value) => setEmail(value.nativeEvent.text)}
				style={theme.input}
				editable={false}
			/>
			<CardField
				postalCodeEnabled={true}
				placeholders={{
					number: "4242 4242 4242 4242",
				}}
				cardStyle={theme.card}
				style={theme.cardContainer}
				onCardChange={(cardDetails) => setCardDetails(cardDetails)}
			/>

			<TouchableOpacity
				style={[isLoadingPayment ? theme.loadingButton : theme.button]}
				onPress={handlePayPress}
				disabled={isLoadingPayment}
			>
				<Text style={theme.buttonText}>Pay With VISA Card</Text>
			</TouchableOpacity>
		</View>
	);
};

export default StripeApp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		margin: 20,
	},
	input: {
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myColors.blue,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		color: myColors.blue,
		fontFamily: "SF",
	},
	card: {
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 14,
		backgroundColor: "#F2F2F7",
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myColors.blue,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	cardContainer: {
		height: 50,
		marginVertical: 20,
		flexDirection: "column",
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
	loadingButton: {
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
		opacity: 0.5,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
});

const dark = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		margin: 20,
	},
	input: {
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		padding: 14,
		backgroundColor: myColors.dirtyWhite90,
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		fontFamily: "SF",
	},
	card: {
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,
		marginHorizontal: 16,
		padding: 14,
		backgroundColor: "#F2F2F7",
		borderWidth: 1,
		borderColor: "#F2F2F7",
		fontFamily: "SF",
		borderRadius: 10,
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	cardContainer: {
		height: 50,
		marginVertical: 20,
		flexDirection: "column",
	},
	button: {
		backgroundColor: myDarkColors.red,
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
	loadingButton: {
		backgroundColor: myDarkColors.red,
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
		opacity: 0.5,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myDarkColors.black,
		fontSize: 16,
	},
});
