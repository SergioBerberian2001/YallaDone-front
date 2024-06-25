import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const windowWidth = Dimensions.get("window").width;
const ServiceItem = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { service } = props;
	const imageUrl = 'http://192.168.1.100:8000/storage/' + service.image;

	return (
		<View style={theme.shadowView}>
			<View style={theme.main}>
				<View style={theme.imageView}>
					<Image
						source={{ uri: imageUrl }}
						style={theme.image}
					/>
				</View>
				<View style={theme.contentView}>
					<View style={theme.row}>
						<Text style={theme.title}>{service.service_name}</Text>
						<Text style={theme.price}>$ {service.price}</Text>
					</View>
					<Text style={theme.description}>{service.service_description}</Text>
					<View style={theme.row}></View>
				</View>
			</View>
		</View>
	);
};

export default ServiceItem;

const styles = StyleSheet.create({
	shadowView: {
		shadowColor: "#cccccc",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 2, height: 2 },
		margin: 16,
		elevation: 10,
	},
	main: {
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 20,
		borderColor: "white",

		width: "100%",
		aspectRatio: 2.5,
		backgroundColor: "white",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	imageView: {
		height: "100%",
		width: "40%",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	contentView: {
		height: "100%",
		width: "60%",
		justifyContent: "space-around",
		paddingRight: 8,
	},
	title: {
		fontFamily: "SF-bold",
		fontSize: 16,
	},
	price: {
		fontFamily: "SF-medium",
		fontSize: 16,
	},
	description: {
		fontFamily: "SF",
		fontSize: 14,
	},
});

const dark = StyleSheet.create({
	shadowView: {
		// shadowColor: "#cccccc",
		// shadowOpacity: 0.5,
		// shadowRadius: 5,
		// shadowOffset: { width: 2, height: 2 },
		margin: 16,
		// elevation: 10,
	},
	main: {
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 20,
		borderColor: myDarkColors.dirtyWhite,

		width: "100%",
		aspectRatio: 2.5,
		backgroundColor: myDarkColors.dirtyWhite,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	imageView: {
		height: "100%",
		width: "40%",
		alignItems: "center",
		justifyContent: "center",
		padding: 8,
	},
	image: {
		width: "100%",
		aspectRatio: 1,
	},
	contentView: {
		height: "100%",
		width: "60%",
		justifyContent: "space-around",
		paddingRight: 8,
	},
	title: {
		fontFamily: "SF-bold",
		fontSize: 16,
		color: myDarkColors.black
	},
	price: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myDarkColors.black
	},
	description: {
		fontFamily: "SF",
		fontSize: 14,
		color: myDarkColors.black
	},
});
