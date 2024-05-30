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
import VisaCard from "../Components/VisaCard.js";
import StripeApp from "../Components/Stripe";
import { StripeProvider } from "@stripe/stripe-react-native";

const Checkout = ({ navigation, route }) => {
	const order = route.params;
	const [checked, setChecked] = useState("cash");
	// console.log(order)
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
					<Text>Select your method of payement</Text>
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
					<VisaCard />
					<StripeApp />
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
});
