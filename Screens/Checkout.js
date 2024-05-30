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
} from "react-native";
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../utils/bearer";
import UserContext from "../utils/UserContext";
import myColors from "../utils/myColors";
import Loading from "../Components/Loading";
import ServiceItem from "../Components/ServiceItem.js";
import { RadioButton, Provider as PaperProvider } from "react-native-paper";
import StripeApp from "../Components/Stripe";
import { StripeProvider } from "@stripe/stripe-react-native";

const Checkout = ({ navigation, route }) => {
	const { order, formId } = route.params;

	const [checked, setChecked] = useState("cash");

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
			storeOrder(response.data.data.payment_id);
			// navigateToCheckout();
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const storeOrder = async (payment_id) => {
		try {
			const token = await getBearerToken();
			const userData = {
				payment_id: payment_id,
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
			throw error; // Throw the error to be caught by the caller
		}
	};
	const navigate = () => {
		navigation.goBack();
	};

	return (
		<StripeProvider publishableKey="pk_test_51PMAhL07mb77Stj1OD3V96xsfMLd8bmWXNx8InMbwE1hcTkWjTTSHck6OqOVSlgOuOSPh3RhtxOP2s4hm1kDWuby00L073BzaE">
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.scroll}>
					<TouchableOpacity style={styles.topView} onPress={navigate}>
						<Ionicons
							name="chevron-back-outline"
							color={myColors.blue}
							size={32}
						/>
						<Text style={styles.topText}>Back</Text>
					</TouchableOpacity>
					<Text>You ordered {order.service_name}</Text>
					<View style={styles.serviceView}>
						<ServiceItem service={order} />
					</View>
					<Text>Select your method of payement </Text>
					<PaperProvider>
						<View style={styles.RadioContainer}>
							<View style={styles.optionContainer}>
								<RadioButton
									value="cash"
									status={checked === "cash" ? "checked" : "unchecked"}
									onPress={() => setChecked("cash")}
								/>
								<Ionicons name="wallet" color={myColors.blue} size={20} />
								<Text
									style={styles.optionText}
									onPress={() => setChecked("cash")}
								>
									Cash On Delivery
								</Text>
							</View>

							<View style={styles.optionContainer}>
								<RadioButton
									value="visa"
									status={checked === "visa" ? "checked" : "unchecked"}
									onPress={() => setChecked("visa")}
								/>
								<Ionicons name="card" color={myColors.blue} size={20} />
								<Text
									style={styles.optionText}
									onPress={() => setChecked("visa")}
								>
									VISA Card
								</Text>
							</View>

							<View style={styles.optionContainer}>
								<RadioButton
									value="yallacoin"
									status={checked === "yallacoin" ? "checked" : "unchecked"}
									onPress={() => setChecked("yallacoin")}
								/>
								<Image
									source={require("../assets/images/YallaCoin.png")}
									style={styles.yallacoin}
								/>
								<Text
									style={styles.optionText}
									onPress={() => setChecked("yallacoin")}
								>
									Redeem YALLACOINS
								</Text>
							</View>
						</View>
					</PaperProvider>
					{checked === "visa" && <StripeApp onStorePayment={storePayment} />}
					<TouchableOpacity style={styles.button} onPress={storePayment}>
						<Text style={styles.buttonText}>Create Order</Text>
					</TouchableOpacity>
				</ScrollView>
			</SafeAreaView>
		</StripeProvider>
	);
};

export default Checkout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myColors.white,
	},
	topView: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.blue,
	},

	optionContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
	},
	optionText: {
		fontSize: 16,
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
		marginVertical: 12,
		marginHorizontal: 16,
		marginBottom: 24,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
});
