import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { React, useState } from "react";
import { myColors, myDarkColors } from "../utils/myColors";
import { Ionicons } from "react-native-vector-icons";

const AddressComponent = (props) => {
	const { item, onNavigate } = props;
	const getIconfromType = () => {
		if (item.location_type == "Work") {
			return "briefcase";
		} else if (item.location_type == "Home") {
			return "home-sharp";
		} else if (item.location_type == "Other") {
			return "location-sharp";
		}
	};

	const handleNavigation = () => {
		onNavigate(item);
	}

	return (
		<View style={styles.textInput}>
			<View style={styles.leftContainer}>
				<View style={styles.homeView}>
					<Ionicons name={getIconfromType()} color={myColors.white} size={22} />
				</View>
				<Text style={styles.titleText}>{item.name}</Text>
			</View>
			<TouchableOpacity
				style={styles.rightContainer}
				onPress={handleNavigation}
			>
				<Text style={styles.titleText}>Edit</Text>
				<View style={styles.homeRightView}>
					<Ionicons name="create-outline" color={myColors.white} size={22} />
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default AddressComponent;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: "100%",
		opacity: 1,
		//   justifyContent: "center",
		alignItems: "center",
	},
	logoView: {
		marginVertical: 40,
	},
	title: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myColors.blue,
	},
	container: {
		width: "100%",
		padding: 20, // Add padding for better spacing
	},
	textInput: {
		width: "100%",
		fontSize: 16,
		borderRadius: 8,
		marginVertical: 8,

		backgroundColor: "rgba(255,255,255,0.4)",
		flexDirection: "row",
		fontFamily: "SF",
		alignItems: "center",
		justifyContent: "space-between",
	},
	button: {
		backgroundColor: myColors.red,
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: 12,
	},
	buttonText: {
		fontFamily: "SF-bold",
		color: myColors.white,
		fontSize: 16,
	},
	topView: {
		marginTop: 40,
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.white,
	},
	homeView: {
		padding: 4,
		paddingRight: 8,
	},
	titleText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.white,
	},
	leftContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		padding: 14,
	},
	rightContainer: {
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: myColors.blue,
		height: "100%",
		padding: 14,
		borderTopEndRadius: 8,
		borderBottomEndRadius: 8,
	},
	homeRightView: {
		padding: 4,
		paddingLeft: 8,
	},
});
