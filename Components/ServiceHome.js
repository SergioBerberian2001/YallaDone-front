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
const ServiceHome = (props) => {
	const { service, onToggleFavorite, onOrder } = props;

	const handleToggleFavorite = () => {
		onToggleFavorite(service.service_id, !service.isFavorite);
	};

	const handleOrder = (order) => {
		onOrder(order);
	};

	const truncateDescription = (text, maxLength) => {
		return text.length > maxLength
			? `${text.substring(0, maxLength)}...`
			: text;
	};

	const truncatedDescription = truncateDescription(
		service.service_description,
		120
	); // Adjust maxLength for desired line count (assuming ~20 characters per line)

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
					<Text style={styles.description}>{truncatedDescription}</Text>
					<View style={styles.row}>
						{service.isFavorite ? (
							<TouchableOpacity onPress={handleToggleFavorite}>
								<MaterialCommunityIcons
									name="heart"
									color={myColors.red}
									size={26}
								/>
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={handleToggleFavorite}>
								<MaterialCommunityIcons name="heart" color="#ccc" size={26} />
							</TouchableOpacity>
						)}

						<TouchableOpacity
							style={styles.orderButton}
							onPress={() => handleOrder(service)}
						>
							<Text style={styles.orderText}>Order Service</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ServiceHome;

const styles = StyleSheet.create({
	shadowView: {
		shadowColor: "#cccccc",
		shadowOpacity: 0.5,
		shadowRadius: 5,
		shadowOffset: { width: 2, height: 2 },
		elevation: 10,
	},
	main: {
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 20,
		borderColor: "white",
		marginHorizontal: 8,
		width: (windowWidth * 9) / 10,
		aspectRatio: 2.5,
		marginVertical: 4,
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
	orderButton: {
		backgroundColor: myColors.red,
		padding: 6,
		borderRadius: 32,
	},
	orderText: {
		fontFamily: "SF",
		fontSize: 14,
		color: "white",
	},
});
