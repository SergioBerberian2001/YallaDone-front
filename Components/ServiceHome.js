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
const ServiceHome = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { service, onToggleFavorite, onOrder, showFav } = props;

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
		<View style={theme.shadowView}>
			<View style={theme.main}>
				<View style={theme.imageView}>
					<Image
						source={require("../assets/images/service-image.png")}
						style={theme.image}
					/>
				</View>
				<View style={theme.contentView}>
					<View style={theme.row}>
						<Text style={theme.title}>{service.service_name}</Text>
						<Text style={theme.price}>$ {service.price}</Text>
					</View>
					<Text style={theme.description}>{truncatedDescription}</Text>
					<View style={theme.row}>
						{showFav ? (
							<TouchableOpacity>
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
										<MaterialCommunityIcons
											name="heart"
											color="#ccc"
											size={26}
										/>
									</TouchableOpacity>
								)}
							</TouchableOpacity>
						) : null}

						<TouchableOpacity
							style={theme.orderButton}
							onPress={() => handleOrder(service)}
						>
							<Text style={theme.orderText}>Order Service</Text>
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
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: { width: 2, height: 2 },
		elevation: 10,
	},
	main: {
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 25,
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
		padding: 8,
		borderRadius: 32,
	},
	orderText: {
		fontFamily: "SF",
		fontSize: 14,
		color: "white",
	},
});

const dark = StyleSheet.create({
	// shadowView: {
	// 	shadowColor: "#cccccc",
	// 	shadowOpacity: 0.3,
	// 	shadowRadius: 5,
	// 	shadowOffset: { width: 2, height: 2 },
	// 	elevation: 10,
	// },
	main: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor:myDarkColors.dirtyWhite,
		borderRadius: 25,
		marginHorizontal: 8,
		width: (windowWidth * 9) / 10,
		aspectRatio: 2.5,
		marginVertical: 4,
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
		color:myDarkColors.black
	},
	price: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color:myDarkColors.black
	},
	description: {
		fontFamily: "SF",
		fontSize: 12,
		color:myDarkColors.black
	},
	orderButton: {
		backgroundColor: myDarkColors.red,
		padding: 8,
		borderRadius: 32,
	},
	orderText: {
		fontFamily: "SF",
		fontSize: 14,
		color:myDarkColors.black
	},
});

