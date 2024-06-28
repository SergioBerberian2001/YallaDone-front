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
import { myColors, myDarkColors } from "../../utils/myColors";
import facebook from "../../assets/images/social/facebook.png";
import tiktok from "../../assets/images/social/tiktok.png";
import instagram from "../../assets/images/social/instagram.png";
import { useMyColorTheme } from "../../utils/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const customContent = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
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
		<View style={theme.container}>
			<TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
				<View style={theme.logo}>
					{isDarkMode ? (
						<Logo width={width} height={height} color="#FFFFFF" />
					) : (
						<Logo width={width} height={height} />
					)}
				</View>
			</TouchableOpacity>
			<View style={theme.middleView}>
				<TouchableOpacity
					style={theme.contentContainer}
					onPress={() => props.navigation.navigate("MyAccount")}
				>
					<Text style={theme.titles}>My Account</Text>
					<Text style={theme.descriptions}>
						{" "}
						Here you can see your profile info and edit{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={theme.contentContainer}
					onPress={() => props.navigation.navigate("News")}
				>
					<Text style={theme.titles}>News</Text>
					<Text style={theme.descriptions}>
						{" "}
						Check out our latest news here!{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={theme.contentContainer}
					onPress={() => props.navigation.navigate("Terms")}
				>
					<Text style={theme.titles}>Terms & Conditions</Text>
					<Text style={theme.descriptions}>
						{" "}
						See the full Terms & Conditions of our app{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={theme.contentContainer}
					onPress={() => props.navigation.navigate("AboutUs")}
				>
					<Text style={theme.titles}>About Us</Text>
					<Text style={theme.descriptions}>
						{" "}
						Who is YALLADONE & What do they do?{" "}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={theme.contentContainer}
					onPress={() => props.navigation.navigate("ContactUs")}
				>
					<Text style={theme.titles}>Contact Us</Text>
					<Text style={theme.descriptions}>
						{" "}
						Check out our location and contact information{" "}
					</Text>
				</TouchableOpacity>
			</View>
			<View style={theme.bottomView}>
				<Text style={theme.socialText}>Follow us on social media!</Text>
				<View style={theme.socialView}>
					<TouchableOpacity onPress={handleTikTokPress}>
						<Image source={tiktok} style={theme.socialImage} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleInstagramPress}>
						<Image source={instagram} style={theme.socialImage} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleFacebookPress}>
						<Image source={facebook} style={theme.socialImage} />
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

const dark = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-evenly",
		backgroundColor: myDarkColors.dirtyWhite,
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
		color: myDarkColors.blue,
	},
	contentContainer: {
		borderBottomWidth: 1,
		borderBottomColor: myDarkColors.grey,
		paddingVertical: 24,
	},
	descriptions: {
		fontSize: 10,
		color: myDarkColors.grey,
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
		color: myDarkColors.blue,
		marginBottom: 16,
	},
	socialImage: {
		width: 32,
		height: 32,
		margin: 2,
	},
});
