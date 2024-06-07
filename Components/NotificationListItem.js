import { StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import axios from "axios";
import { Ionicons } from "react-native-vector-icons";
import { getBearerToken } from "../utils/bearer";
import { myColors, myDarkColors } from "../utils/myColors";
import { useMyColorTheme } from "../utils/ThemeContext";
import { ListItem } from "@rneui/themed";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const NotificationListItem = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { notification, onNavigate, onRead, onDelete } = props;
	// const inputTimestamp = "2024-05-30T19:20:49.000000Z";
	const timeZone = "America/New_York";

	// Step 1: Parse the input timestamp
	const date = parseISO(notification.created_at);

	// Step 2: Convert the timestamp to the desired time zone
	//   const zonedDate = utcToZonedTime(date, timeZone);

	// Step 3: Format the timestamp into the desired output format
	const formattedDate = format(date, "dd/MM/yyyy - hh:mm a");

	const handleDotColor = () => {
		if (notification.read_at === null) {
			return myColors.red;
		}
	};
	const handleTitle = () => {
		if (notification.type === "App\\Notifications\\OrderNotification") {
			if (notification.data[0].order_info.status === "waiting") {
				return (
					"Order for " +
					notification.data[0].service_info.service_name +
					" placed"
				);
			} else if (notification.data[0].order_info.status === "inprogress") {
				return (
					"Order for " +
					notification.data[0].service_info.service_name +
					" in progress"
				);
			} else if (notification.data[0].order_info.status === "done") {
				return (
					"Order for " +
					notification.data[0].service_info.service_name +
					" is complete"
				);
			}
		}
	};

	const navigate = (notification) => {
		onNavigate(notification);
	};
	const handleDescription = () => {
		if (notification.type === "App\\Notifications\\OrderNotification") {
			if (notification.data[0].order_info.status === "waiting") {
				const description =
					"Your order for " +
					notification.data[0].service_info.service_name +
					" was placed successfully, Please wait for it to be accepted";
				return description;
			} else if (notification.data[0].order_info.status === "inprogress") {
				const description =
					"Your order for " +
					notification.data[0].service_info.service_name +
					" is in Progress, Click to track the driver";
				return description;
			} else if (notification.data[0].order_info.status === "done") {
				const description =
					"Your order for " +
					notification.data[0].service_info.service_name +
					" is in Complete";
				return description;
			}
		}
	};
	return (
		<View style={theme.mainCont}>
			<ListItem.Swipeable
				rightContent={(reset) => (
					<TouchableOpacity style={theme.deleteContainer} onPress={() => {onDelete(notification.id); reset()}} >
						<Ionicons name="trash" color="white" size={30} />
					</TouchableOpacity>
				)}
				leftContent={(reset) => (
					<TouchableOpacity style={theme.markAsReadCont} onPress={() => {onRead(notification.id); reset()}}>
						<Ionicons name="mail-open-outline" color="white" size={30} />
					</TouchableOpacity>
				)}
				containerStyle={{ margin: 0, padding: 0 }}
			>
				<ListItem.Content>
					<Pressable
						style={theme.container}
						onPress={() => {
							navigate(notification);
							onRead(notification.id);
							onDelete(notification.id);
						}}
					>
						<View style={theme.leftCont}>
							<View style={theme.icon}>
								<Ionicons
									name="chevron-back"
									color={isDarkMode ? myDarkColors.blue : myColors.blue}
									size={40}
								/>
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
					</Pressable>
				</ListItem.Content>
			</ListItem.Swipeable>
		</View>
	);
};

export default NotificationListItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
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
	mainCont:{
		width:"100%"
	},
	listItem: {
		backgroundColor: myDarkColors.dirtyWhite,
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: myDarkColors.dirtyWhite,
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
		borderColor: myDarkColors.black,
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
	},
	date: {
		fontSize: 14,
		fontFamily: "SF",
		color: myDarkColors.black,
		alignSelf: "flex-end",
	},
	deleteContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myDarkColors.red,
		height: "100%",
		width:"100%",
	},
	markAsReadCont:{
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myDarkColors.blue,
		height: "100%",
		width:"100%",
	}
});
