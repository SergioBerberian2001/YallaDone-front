import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { getBearerToken } from "../utils/bearer";
import VisaCard from "./VisaCard";

// Change this to the address of your Laravel backend
const API_URL = "http://192.168.1.100:8000/api";

const StripeApp = (props) => {
	const { onStorePayment } = props;
	const [email, setEmail] = useState();
	const [cardDetails, setCardDetails] = useState();
	const { confirmPayment, loading } = useConfirmPayment();
	console.log(cardDetails);
	const fetchPaymentIntentClientSecret = async () => {
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
			const data = await response.json();
			return { clientSecret: data.clientSecret, error: data.error };
		} catch (error) {
			console.error("Error fetching payment intent client secret:", error);
			return { error: "Failed to fetch payment intent client secret" };
		}
	};

	const handlePayPress = async () => {
		if (!cardDetails?.complete || !email) {
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
				} else if (paymentIntent) {
					Alert.alert("Payment Successful");
                    await onStorePayment();
					console.log("Payment successful:", paymentIntent);
				}
			}
		} catch (e) {
			console.log("Payment error:", e);
			Alert.alert("Payment error", e.message);
		}
	};

	return (
		<View style={styles.container}>
			<VisaCard cardDetails={cardDetails} />
			<TextInput
				autoCapitalize="none"
				placeholder="E-mail"
				keyboardType="email-address"
				onChange={(value) => setEmail(value.nativeEvent.text)}
				style={styles.input}
			/>
			<CardField
				postalCodeEnabled={true}
				placeholders={{
					number: "4242 4242 4242 4242",
				}}
				cardStyle={styles.card}
				style={styles.cardContainer}
				onCardChange={(cardDetails) => setCardDetails(cardDetails)}
			/>
			<Button onPress={handlePayPress} title="Pay" disabled={loading} />
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
		backgroundColor: "#efefef",
		borderRadius: 8,
		fontSize: 16,
		fontFamily: "SF",
		height: 50,
		padding: 10,
	},
	card: {
		backgroundColor: "#efefef",
	},
	cardContainer: {
		height: 50,
		marginVertical: 30,
	},
});
