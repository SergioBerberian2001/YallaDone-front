import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	ScrollView,
} from "react-native";
import React from "react";
import splashBg from "../../assets/images/splash-bg.jpg";
import { myColors } from "../../utils/myColors";

const AboutUs = () => {
	return (
		<ImageBackground source={splashBg} style={styles.background}>
			<ScrollView style={styles.scrollView}>
				<Text style={styles.title}>About Us</Text>
				<View style={styles.descriptionContainer}>
					<Text style={styles.sectionTitle}>Welcome to YallaDone!</Text>
					<Text style={styles.description}>
						At YallaDone, we are committed to transforming the way you manage
						your daily tasks by offering a comprehensive and innovative mobile
						application that delivers on-demand services directly to your
						fingertips. Our goal is to save you time, enhance convenience, and
						improve the quality of life through seamless and efficient service
						delivery.
					</Text>
					<Text style={styles.sectionTitle}>Our Vision</Text>
					<Text style={styles.description}>
						To become the leading provider of on-demand services, known for our
						commitment to efficiency, convenience, and customer satisfaction.
					</Text>
					<Text style={styles.sectionTitle}>Our Mission</Text>
					<Text style={styles.description}>
						YallaDone is dedicated to revolutionizing the service industry by
						providing a seamless platform for accessing a diverse range of
						on-demand services. Our mission is to empower individuals to reclaim
						their time and enhance their daily lives through innovative
						technology and exceptional service delivery. We are committed to
						delivering unparalleled convenience, efficiency, and reliability to
						our users, ensuring that their essential needs are met promptly and
						effectively. By connecting users with qualified service providers
						across various domains, we strive to streamline tasks, alleviate
						burdens, and ultimately improve the quality of life for our
						customers. At YallaDone, we believe that every moment matters, and
						our mission is to make every moment count by simplifying and
						enhancing the way people engage with essential services.
					</Text>
					<Text style={styles.sectionTitle}>Our Services</Text>
					<Text style={styles.description}>
						YallaDone offers a wide range of services designed to meet the
						diverse needs of our users, including:
					</Text>
					<Text style={styles.listItem}>
						- Automotive Maintenance: From mechanic visits and oil changes to
						emergency rides, we ensure your vehicle is always in top condition.
					</Text>
					<Text style={styles.listItem}>
						- Non-Automotive Services: Whether you need paperwork assistance,
						item delivery, or transportation via taxi or personal driver,
						YallaDone has you covered.
					</Text>
					<Text style={styles.description}>
						Our platform seamlessly connects you with qualified service
						providers, ensuring that every task is handled with the utmost care
						and professionalism.
					</Text>
					<Text style={styles.sectionTitle}>Our Commitment</Text>
					<Text style={styles.description}>
						We are dedicated to providing a user-friendly experience that
						prioritizes customer satisfaction. Our easy-to-use app is designed
						with you in mind, ensuring a hassle-free process from booking to
						service completion. Our team of experienced professionals and robust
						partnerships with service providers enable us to continually enhance
						the value proposition we offer to our customers.
					</Text>
					<Text style={styles.sectionTitle}>Our Team</Text>
					<Text style={styles.description}>
						YallaDone is driven by a passionate team of experts in technology,
						project management, and customer service. Co-founders Sergio
						Berberian and Paul Abou Zeidan bring years of experience and a
						shared vision to lead our company towards excellence. Together, we
						are committed to making YallaDone the go-to destination for
						on-demand services.
					</Text>
					<Text style={styles.sectionTitle}>Why Choose YallaDone?</Text>
					<Text style={styles.listItem}>
						- Comprehensive Service Range: Access a wide array of services all
						in one place.
					</Text>
					<Text style={styles.listItem}>
						- Convenience: Book services on-demand, whenever and wherever you
						need them.
					</Text>
					<Text style={styles.listItem}>
						- Reliability: Trust in our vetted and qualified service providers
						to deliver exceptional results.
					</Text>
					<Text style={styles.listItem}>
						- Efficiency: Save time and reduce stress with our streamlined
						process and user-friendly app.
					</Text>
					<Text style={styles.description}>
						Join us in revolutionizing the service industry and experience the
						convenience and efficiency of YallaDone. Your time is valuable—let
						us help you make the most of it.
					</Text>
					<Text style={styles.description}>
						For more information, visit our website or download the YallaDone
						app today. Thank you for choosing YallaDone!
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
		marginVertical: 16,
	},
	sectionTitle: {
		fontFamily: "SF-medium",
		color: myColors.white,
		fontSize: 20,
		marginVertical: 8,
	},
	description: {
		fontFamily: "SF",
		color: myColors.white,
		fontSize: 16,
		marginVertical: 4,
		paddingHorizontal: 4,
	},
	listItem: {
		fontFamily: "SF",
		color: myColors.white,
		fontSize: 16,
		marginVertical: 2,
		paddingHorizontal: 4,
		paddingLeft: 8,
	},
	descriptionContainer: {
		backgroundColor: "rgba(47,61,126,0.6)",
		padding: 16,
		borderRadius: 10,
		paddingBottom: 50,
	},
});
