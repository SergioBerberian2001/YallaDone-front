import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import myColors from "../utils/myColors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const NewsListItem = (props) => {
	const { news } = props;
	return (
		<View style={styles.container}>
			<Image source={news.image} style={styles.image} />
			<View style={styles.bottomContainer}>
				<View style={styles.titleDate}>
					<Text style={styles.title}>{news.title}</Text>
					<View style={styles.dateView}>
						<MaterialCommunityIcons
							name="calendar"
							color={myColors.dirtyWhite90}
							size={20}
						/>
						<Text style={styles.date}>{news.news_date}</Text>
					</View>
				</View>
				<Text style={styles.description}>{news.description}</Text>
			</View>
		</View>
	);
};

export default NewsListItem;

const styles = StyleSheet.create({
	container: {
		borderRadius: 20,
		width: SCREEN_WIDTH,
        marginVertical:8,
        shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 3, height: 3 },
	},
	image: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
		width: SCREEN_WIDTH,
        height: SCREEN_WIDTH /3 ,
        objectFit:"cover",
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
		fontSize: 12,
        marginLeft:4,
	},
	description: {
		fontFamily: "SF",
		color: myColors.white,
		fontSize: 14,
	},
});