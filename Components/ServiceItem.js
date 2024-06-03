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
import myColors from "../utils/myColors";

const windowWidth = Dimensions.get("window").width;
const ServiceItem = (props) => {
	const { service } = props;

	return (
		<View style={styles.shadowView}>
			<View style={styles.main}>
				<View style={styles.imageView}>
					<Image
						source={require("../assets/images/service-image.png")}
						style={styles.image}
					/>
				</View>
				<View style={styles.contentView}>
					<View style={styles.row}>
						<Text style={styles.title}>{service.service_name}</Text>
						<Text style={styles.price}>$ {service.price}</Text>
					</View>
					<Text style={styles.description}>{service.service_description}</Text>
					<View style={styles.row}></View>
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
		elevation:10,
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
		fontSize: 12,
	},
});
