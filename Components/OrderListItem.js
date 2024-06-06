import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../utils/bearer";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

// {
//     "order_id": 1,
//     "created_at": "2024-06-04T17:24:38.000000Z",
//     "updated_at": "2024-06-04T17:24:38.000000Z",
//     "user_id": 2,
//     "Payment_id": 1,
//     "Form_id": 1,
//     "status": "waiting",
//     "payment": {
//         "payment_id": 1,
//         "created_at": "2024-06-04T17:24:36.000000Z",
//         "updated_at": "2024-06-04T17:24:36.000000Z",
//         "user_id": 2,
//         "type": "cash",
//         "service_name": "Car Detailing",
//         "price": 50
//     },
//     "service_form": {
//         "form_id": 1,
//         "created_at": "2024-06-04T17:24:36.000000Z",
//         "updated_at": "2024-06-04T17:24:36.000000Z",
//         "user_id": 2,
//         "Service_id": 1,
//         "service_date": "2024-06-04 20:18:00",
//         "user_name": "Sergio",
//         "user_lastname": "berberian",
//         "email": "sergioberberian2001@gmail.com",
//         "phone_number": 81384086,
//         "location": "Home",
//         "additional_info": null
//     },
//     "service": {
//         "service_id": 1,
//         "created_at": "2024-06-04T17:22:24.000000Z",
//         "updated_at": "2024-06-04T17:22:24.000000Z",
//         "image": "../assets/images/service-image.png",
//         "category": "Car",
//         "price": 50,
//         "service_name": "Car Detailing",
//         "service_description": "This service is made to help you make car detailing for your car while you are relaxed and doing your thing without worrying about it",
//         "isEmergency": 0,
//         "laravel_through_key": 1
//     }
// },

const OrderListItem = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { notification, onNavigate } = props;
	// console.log(notification)
	// const inputTimestamp = "2024-05-30T19:20:49.000000Z";
	const timeZone = "America/New_York";

	// // Step 1: Parse the input timestamp
	const date = parseISO(notification.updated_at);

	// // Step 2: Convert the timestamp to the desired time zone
	// //   const zonedDate = utcToZonedTime(date, timeZone);

	// Step 3: Format the timestamp into the desired output format
	const formattedDate = format(date, "dd/MM/yyyy - hh:mm a");

	const handleNavigation = (order) => {
		onNavigate(order);
	};

	const handleShowIcon = () => {
		if (notification.service.category === "Car") {
			return "car-sport-sharp";
		} else if (notification.service.category === "Delivery") {
			return "gift-outline";
		} else if (notification.service.category === "Paperwork") {
			return "document-sharp";
		} else if (notification.service.category === "Transportation") {
			return "bus-sharp";
		}
	};

	const handleDotColor = () => {
		if (notification.status === "waiting") {
			return myColors.red;
		} else if (notification.status === "inprogress") {
			return myDarkColors.blue;
		} else if (notification.status === "done") {
			return "#00cc00";
		}
	};

	const handleTitle = () => {
		if (notification.status === "waiting") {
			return "Your order has been placed";
		} else if (notification.status === "inprogress") {
			return "Your order is in Progress";
		} else if (notification.status === "done") {
			return "Your order is complete";
		}
	};

	return (
		<TouchableOpacity
			style={theme.container}
			onPress={() => handleNavigation(notification)}
		>
			<View style={theme.leftCont}>
				<View style={theme.icon}>
					<Ionicons name={handleShowIcon()} color={isDarkMode? myDarkColors.black : myColors.blue} size={40} />
				</View>
			</View>
			<View style={theme.rightCont}>
				<View style={theme.topCont}>
					<Text style={theme.title}>{handleTitle()}</Text>
					<View
						style={[styles.dot, { backgroundColor: handleDotColor() }]}
					></View>
				</View>
				<Text style={theme.description}>"hello world description"</Text>
				<Text style={theme.date}>{formattedDate}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default OrderListItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",

		width: "100%",
	},
	dot: {
		width: 8,
		height: 8,
		backgroundColor: myColors.red,
		borderRadius: "100%",
	},
	topCont: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		justifyContent: "space-between",
	},
	leftCont: {
		width: "15%",
		alignItems: "center",
		justifyContent: "center",
	},
	rightCont: {
		width: "85%",
		padding: 8,
		borderBottomWidth: 1,
		borderColor: "#c1c1c1",
	},
	title: {
		fontSize: 18,
		fontFamily: "SF-medium",
		color: myColors.blue,
		paddingVertical: 4,
	},
	description: {
		fontSize: 14,
		fontFamily: "SF",
		color: "#717171",
		paddingBottom: 4,
	},
	date: {
		fontSize: 14,
		fontFamily: "SF",
		color: "#717171",
		alignSelf: "flex-end",
	},
});

const dark = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	dot: {
		width: 8,
		height: 8,
		backgroundColor: myDarkColors.red,
		borderRadius: "100%",
	},
	topCont: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
		justifyContent: "space-between",
	},
	leftCont: {
		width: "15%",
		alignItems: "center",
		justifyContent: "center",
	},
	rightCont: {
		width: "85%",
		padding: 8,
		borderBottomWidth: 1,
		borderColor: "#c1c1c1",
	},
	title: {
		fontSize: 18,
		fontFamily: "SF-medium",
		color: myDarkColors.blue,
		paddingVertical: 4,
	},
	description: {
		fontSize: 14,
		fontFamily: "SF",
		color: myDarkColors.black,
		paddingBottom: 4,
		opacity:0.9
	},
	date: {
		fontSize: 14,
		fontFamily: "SF",
		color: myDarkColors.black,
		alignSelf: "flex-end",
		opacity:0.9
	},
});
