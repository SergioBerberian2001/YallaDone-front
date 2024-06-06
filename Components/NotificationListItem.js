import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../utils/bearer";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";

const NotificationListItem = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { notification,onNavigate } = props;

	// const inputTimestamp = "2024-05-30T19:20:49.000000Z";
	const timeZone = "America/New_York";

	// Step 1: Parse the input timestamp
	const date = parseISO(notification.updated_at);

	// Step 2: Convert the timestamp to the desired time zone
	//   const zonedDate = utcToZonedTime(date, timeZone);

	// Step 3: Format the timestamp into the desired output format
	const formattedDate = format(date, "dd/MM/yyyy - hh:mm a");

	// const handleShowIcon = () => {
	// 	if (notification.service.category === "Car") {
	// 		return "car-sport-sharp";
	// 	} else if (notification.service.category === "Delivery") {
	// 		return "gift-outline";
	// 	} else if (notification.service.category === "Paperwork") {
	// 		return "document-sharp";
	// 	} else if (notification.service.category === "Transportation") {
	// 		return "bus-sharp";
	// 	}
	// };

	const handleDotColor = () => {
		if (notification.data[0].status === "waiting") {
			return myColors.red;
		} else if (notification.data[0].status === "inprogress") {
			return myDarkColors.blue;
		} else if (notification.data[0].status === "done") {
			return "#00cc00";
		}
	};
	const handleTitle = () => {
		if (notification.type === "App\\Notifications\\OrderNotification") {
			if (notification.data[0].status === "waiting") {
				return (
					"Order for " +
					notification.data[0].payments.service_name +
					" placed"
				);
			} else if (notification.data[0].status === "inprogress") {
				return (
					"Order for " +
					notification.data[0].payments.service_name +
					" in progress"
				);
			} else if (notification.data[0].status === "done") {
				return (
					"Order for " +
					notification.data[0].payments.service_name +
					" is complete"
				);
			}
		}
	};

	const navigate = (notification)=> {
		onNavigate(notification)
	}
	const handleDescription = () => {
		if (notification.type === "App\\Notifications\\OrderNotification") {
			if (notification.data[0].status === "waiting") {
				const description =
					"Your order for " +
					notification.data[0].payments.service_name +
					" was placed successfully, Please wait for it to be accepted";
				return description;
			} else if (notification.data[0].status === "inprogress") {
				const description =
					"Your order for " +
					notification.data[0].payments.service_name +
					" is in Progress, Click to track the driver";
				return description;
			} else if (notification.data[0].status === "done") {
				const description =
					"Your order for " +
					notification.data[0].payments.service_name +
					" is in Complete";
				return description;
			}
		}
	};
	return (
		<TouchableOpacity style={theme.container} onPress={() => navigate(notification)}>
			<View style={theme.leftCont}>
				<View style={theme.icon}>
					<Ionicons name="chevron-back" color={myColors.blue} size={40} />
				</View>
			</View>
			<View style={theme.rightCont}>
				<View style={theme.topCont}>
					<Text style={theme.title}>{handleTitle()}</Text>
					{!notification.isRead && (
						<View
							style={[theme.dot, { backgroundColor: handleDotColor() }]}
						></View>
					)}
				</View>
				<Text style={theme.description}>{handleDescription()}</Text>
				<Text style={theme.date}>{formattedDate}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default NotificationListItem;

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
