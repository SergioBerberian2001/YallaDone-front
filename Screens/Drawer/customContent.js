import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	Image,
	Linking,
} from "react-native";
import React from "react";
import Logo from "../../Components/Logo";
import myColors from "../../utils/myColors";
import facebook from "../../assets/images/social/facebook.png";
import tiktok from "../../assets/images/social/tiktok.png";
import instagram from "../../assets/images/social/instagram.png";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const customContent = (props) => {
	const width = SCREEN_WIDTH / 2;
	const height = width / 8;

	const handleInstagramPress = () => {
		Linking.openURL("https://www.instagram.com/");
	};

	const handleTikTokPress = () => {
		Linking.openURL("https://www.tiktok.com/");
	};

	const handleFacebookPress = () => {
		Linking.openURL("https://www.facebook.com/");
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
				<View style={styles.logo}>
					<Logo width={width} height={height} />
				</View>
			</TouchableOpacity>
			<View style={styles.middleView}>
				<TouchableOpacity
					style={styles.contentContainer}
					onPress={() => props.navigation.navigate("MyAccount")}
				>
					<Text style={styles.titles}>My Account</Text>
					<Text style={styles.descriptions}>
						{" "}
						Here you can see you info and edit{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.contentContainer}
					onPress={() => props.navigation.navigate("News")}
				>
					<Text style={styles.titles}>News</Text>
					<Text style={styles.descriptions}>
						{" "}
						Here you can see you info and edit{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.contentContainer}
					onPress={() => props.navigation.navigate("Terms")}
				>
					<Text style={styles.titles}>Terms & Conditions</Text>
					<Text style={styles.descriptions}>
						{" "}
						Here you can see you info and edit{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.contentContainer}
					onPress={() => props.navigation.navigate("AboutUs")}
				>
					<Text style={styles.titles}>About Us</Text>
					<Text style={styles.descriptions}>
						{" "}
						Here you can see you info and edit{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.contentContainer}
					onPress={() => props.navigation.navigate("ContactUs")}
				>
					<Text style={styles.titles}>Contact Us</Text>
					<Text style={styles.descriptions}>
						{" "}
						Here you can see you info and edit{" "}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.bottomView}>
				<Text style={styles.socialText}>Follow us on social media!</Text>
				<View style={styles.socialView}>
					<TouchableOpacity onPress={handleTikTokPress}>
						<Image source={tiktok} style={styles.socialImage} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleInstagramPress}>
						<Image source={instagram} style={styles.socialImage} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleFacebookPress}>
						<Image source={facebook} style={styles.socialImage} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default customContent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		backgroundColor: myColors.dirtyWhite,
	},
	logo: {
		width: "100%",
		alignItems: "center",
		marginVertical: 20,
	},
	middleView: {
		paddingLeft: 16,
	},
	titles: {
		fontSize: 20,
		color: myColors.blue,
	},
	contentContainer: {
		borderBottomWidth: 1,
		borderBottomColor: myColors.grey,
		paddingVertical: 24,
	},
	descriptions: {
		fontSize: 10,
		color: myColors.grey,
	},
	bottomView: {
		width: "100%",
		alignItems: "center",
	},
	socialView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-evenly",
	},
	socialText: {
		fontSize: 12,
		color: myColors.blue,
		marginBottom: 16,
	},
	socialImage: {
		width: 32,
		height: 32,
		margin: 2,
	},
});
