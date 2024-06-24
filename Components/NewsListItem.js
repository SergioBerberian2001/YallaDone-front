import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const NewsListItem = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { news } = props;
	return (
		<View style={theme.container}>
			<Image
				source={require("../assets/images/carousel.jpeg")}
				style={theme.image}
			/>
			<View style={theme.bottomContainer}>
				<View style={theme.titleDate}>
					<Text style={theme.title}>{news.Title}</Text>
					<View style={theme.dateView}>
						<MaterialCommunityIcons
							name="calendar"
							color={myColors.dirtyWhite90}
							size={14}
						/>
						<Text style={theme.date}>{news.news_date}</Text>
					</View>
				</View>
				<Text style={theme.description}>{news.news_description}</Text>
			</View>
		</View>
	);
};

export default NewsListItem;

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		width: SCREEN_WIDTH,
		marginVertical: 8,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	image: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		width: SCREEN_WIDTH,
		height: SCREEN_WIDTH / 3,
		objectFit: "cover",
	},
	bottomContainer: {
		backgroundColor: myColors.blue,
		padding: 8,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	titleDate: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
		paddingVertical:6
	},
	title: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 20,
	},
	dateView: {
		flexDirection: "row",
		alignItems: "center",
	},
	date: {
		fontFamily: "SF",
		color: myColors.dirtyWhite90,
		fontSize: 10,
		marginLeft: 4,
	},
	description: {
		fontFamily: "SF",
		color: myColors.white,
		fontSize: 16,
		lineHeight:20,
		margin:4
	},
});


const dark = StyleSheet.create({
	container: {
		borderRadius: 20,
		width: SCREEN_WIDTH,
		marginVertical: 8,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	image: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		width: SCREEN_WIDTH,
		height: SCREEN_WIDTH / 3,
		objectFit: "cover",
	},
	bottomContainer: {
		backgroundColor: myDarkColors.blue,
		padding: 8,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	titleDate: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 12,
		paddingVertical:6
	},
	title: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 20,
	},
	dateView: {
		flexDirection: "row",
		alignItems: "center",
	},
	date: {
		fontFamily: "SF",
		color: myColors.dirtyWhite90,
		fontSize: 10,
		marginLeft: 4,
	},
	description: {
		fontFamily: "SF",
		color: myColors.white,
		fontSize: 16,
		lineHeight:20,
		margin:4
	},
});
