import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const ServiceForm = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { order } = props;
	const imageUrl = 'http://192.168.1.100:8000/storage/' + order.image;

	return (
		<View style={theme.container}>
			<View style={theme.imageCont}>
				<Image
					source={{ uri: imageUrl }}
					style={theme.image}
				/>
			</View>
			<View style={theme.textCont}>
				<Text style={theme.title}>{order.service_name}</Text>
				<Text style={theme.desc}>{order.service_description}</Text>
				<Text style={theme.price}>${order.price}.00</Text>
			</View>
		</View>
	);
};

export default ServiceForm;

const styles = StyleSheet.create({
	container: {
		width: "90%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myColors.blue,
	},
	imageCont: {
		width: "100%",
		aspectRatio: 365 / 193,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		height: "100%",
		aspectRatio: 1,
	},
	textCont: {
		backgroundColor: myColors.blue,
		borderBottomRightRadius: 9,
		borderBottomLeftRadius: 9,
		justifyContent: "space-between",
		padding: 8,
	},
	title: {
		color: myColors.white,
		fontSize: 20,
		fontFamily: "SF-bold",
		padding: 4,
	},
	desc: {
		color: myColors.white,
		fontSize: 12,
		fontFamily: "SF-medium",
		padding: 4,
	},
	price: {
		color: myColors.white,
		fontSize: 12,
		fontFamily: "SF-medium",
		alignSelf: "flex-end",
		padding: 4,
	},
});

const dark = StyleSheet.create({
	container: {
		width: "90%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: myDarkColors.blue,
	},
	imageCont: {
		width: "100%",
		aspectRatio: 365 / 193,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		height: "100%",
		aspectRatio: 1,
	},
	textCont: {
		backgroundColor: myDarkColors.blue,
		borderBottomRightRadius: 9,
		borderBottomLeftRadius: 9,
		justifyContent: "space-between",
		padding: 8,
	},
	title: {
		color: myColors.white,
		fontSize: 20,
		fontFamily: "SF-bold",
		padding: 4,
	},
	desc: {
		color: myColors.white,
		fontSize: 12,
		fontFamily: "SF-medium",
		padding: 4,
	},
	price: {
		color: myColors.white,
		fontSize: 12,
		fontFamily: "SF-medium",
		alignSelf: "flex-end",
		padding: 4,
	},
});

