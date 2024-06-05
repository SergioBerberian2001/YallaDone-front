import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	TextInput,
	Alert,
} from "react-native";
import React, { useState } from "react";
import splashBg from "../../assets/images/splash-bg.jpg";
import { myColors, myDarkColors } from "../../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../../utils/bearer";
import axios from "axios";

const ContactUs = () => {
	const [feedback, setFeedback] = useState("");

	const handleSubmit = async (feed) => {
		try {
			const token = await getBearerToken();
			const userData = {
				body: feed,
			};
			console.log(feed);
			const response = await axios.post(
				"http://192.168.1.100:8000/api/send",
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log("Response:", response.data);
			handleFeedbackSubmit();
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const showDeleteConfirmation = async () => {
		Alert.alert("Email Sent ", "Thank You For Contacting us!", [
			{ text: "Done", style: "done" },
		]);
	};

	const handleFeedbackSubmit = async () => {
		await showDeleteConfirmation();
		setFeedback("");
	};

	return (
		<ImageBackground source={splashBg} style={styles.background}>
			<ScrollView style={styles.scrollView}>
				<Text style={styles.title}>Our Head Office</Text>
				<Text style={styles.location}>Zahle Boulevard,</Text>
				<Text style={styles.location}>Manara bldg - 2nd floor</Text>
				<Text style={styles.title}>Contact Details</Text>
				<TouchableOpacity style={styles.contactView}>
					<View>
						<Text style={styles.contactTitle}>Customer Service</Text>
						<Text style={styles.contactDesc}>08 987 987</Text>
					</View>
					<Ionicons name="call" color={myColors.white} size={32} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.contactView}>
					<View>
						<Text style={styles.contactTitle}>Our Website</Text>
						<Text style={styles.contactDesc}>https://www.Yalladone.com.lb</Text>
					</View>
					<Ionicons name="call" color={myColors.white} size={32} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.contactView}>
					<View>
						<Text style={styles.contactTitle}>Email us</Text>
						<Text style={styles.contactDesc}>
							customerservice@yalladone.com
						</Text>
					</View>
					<Ionicons name="call" color={myColors.white} size={32} />
				</TouchableOpacity>
				<Text style={styles.titleBottom}>Send us your feedback</Text>
				<TextInput
					style={styles.feedbackInput}
					placeholder="Please enter your feedback ... "
					placeholderTextColor={myColors.lightGray}
					value={feedback}
					onChangeText={setFeedback}
					multiline
				/>
				<TouchableOpacity
					style={styles.submitButton}
					onPress={() => handleSubmit(feedback)}
				>
					<Text style={styles.submitButtonText}>Submit Feedback</Text>
				</TouchableOpacity>
			</ScrollView>
		</ImageBackground>
	);
};

export default ContactUs;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	scrollView: {
		flex: 1,
		width: "100%",
		padding: 16,
	},
	title: {
		fontFamily: "SF-medium",
		color: myColors.blue,
		fontSize: 24,
		marginVertical: 16,
		fontFamily: "SF-bold",
	},
	descriptionContainer: {
		backgroundColor: "rgba(47,61,126,0.6)",
		padding: 8,
		borderRadius: 10,
	},
	feedbackInput: {
		width: "100%",
		backgroundColor: myColors.dirtyWhite90,
		aspectRatio: 2.5,
		padding: 16,
		fontFamily: "SF-medium",
		borderRadius: 8,
	},
	submitButton: {
		backgroundColor: myColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 12,
		marginBottom: 32,
	},
	submitButtonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
	location: {
		fontSize: 14,
		color: myColors.white,
		fontFamily: "SF-medium",
		textDecorationLine: "underline",
	},
	contactView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		padding: 16,
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.3)",
		marginVertical: 8,
		borderRadius: 10,
	},
	contactTitle: {
		fontFamily: "SF-bold",
		color: myColors.blue,
		fontSize: 16,
	},
	contactDesc: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
	titleBottom: {
		fontFamily: "SF-medium",
		color: myColors.white,
		fontSize: 24,
		marginVertical: 16,
		fontFamily: "SF-bold",
	},
});
