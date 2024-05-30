import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
} from "react-native";
import React from "react";
import splashBg from "../../assets/images/splash-bg.jpg";
import myColors from "../../utils/myColors";

const AboutUs = () => {
	return (
		<ImageBackground source={splashBg} style={styles.background}>
			<ScrollView style={styles.scrollView}>
				<Text style={styles.title}> About Us </Text>
				<View style={styles.descriptionContainer}>
					<Text style={styles.description}>
						{" "}
						Our project is aimed at revolutionizing the transportation and
						automotive service sector through a comprehensive mobile
						application. In a fast-paced world where time is a luxury,
						individuals often struggle to find the time for essential car
						maintenance and encounter difficulties in securing emergency
						transportation. Our app serves as a one-stop solution, offering
						on-demand services ranging from mechanic visits and oil changes to
						emergency rides and valet parking. By seamlessly connecting users
						with qualified service providers and drivers, we aim to alleviate
						the burden of car-related tasks and enhance overall convenience.
						Through this initiative, we anticipate fostering greater efficiency
						in car maintenance and ensuring timely assistance during
						transportation emergencies, ultimately improving the overall
						mobility experience for users.Through this initiative, we anticipate
						fostering greater efficiency in car maintenance and ensuring timely
						assistance during transportation emergencies, ultimately improving
						the overall mobility experience for users.{" "}
					</Text>
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

export default AboutUs;

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
		padding: 8,
	},
	title: {
		alignSelf: "center",
		fontFamily: "SF-medium",
		color: myColors.blue,
		fontSize: 24,
		margin: 16,
	},
	description: {
		fontFamily: "SF",
		color: myColors.white,
		fontSize: 20,
	},
	descriptionContainer: {
		backgroundColor: "rgba(47,61,126,0.6)",
		padding: 8,
		borderRadius: 10,
	},
});
