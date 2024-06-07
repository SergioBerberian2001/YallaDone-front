import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	Platform,
	Image,
	ScrollView,
	Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useMyColorTheme } from "../utils/ThemeContext";
import { Ionicons } from "react-native-vector-icons";
import { myColors, myDarkColors } from "../utils/myColors";
import ServiceItem from "../Components/ServiceItem";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";
import LiveTrack from "../Components/LiveTrack";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const NotificationInfo = ({ navigation, route }) => {
	const notification = route.params;
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const [isMaxTrack, setIsMaxTrack] = useState();
	const date = parseISO(notification.created_at);

	// // Step 2: Convert the timestamp to the desired time zone
	// //   const zonedDate = utcToZonedTime(date, timeZone);

	// Step 3: Format the timestamp into the desired output format
	const formattedDate = format(date, "dd/MM/yyyy - hh:mm ");

	const navigate = () => {
		navigation.goBack();
	};

	const handleTitle = () => {
		if (notification.data[0].order_info.status === "waiting") {
			return "Your order has been placed";
		} else if (notification.data[0].order_info.status === "inprogress") {
			return "Your order is in Progress";
		} else if (notification.data[0].order_info.status === "done") {
			return "Your order is complete";
		}
	};

	const handleType = () => {
		if (notification.data[0].order_info.payments.type === "visa") {
			return "Visa Card";
		} else if (notification.data[0].order_info.payments.type === "cash") {
			return "Cash On Delivery";
		} else if (notification.data[0].order_info.payments.type === "yallacoin") {
			return "YALLACOINS";
		}
	};

	const handleTypeIcon = () => {
		if (notification.data[0].order_info.payments.type === "visa") {
			return "card";
		} else if (notification.data[0].order_info.payments.type === "cash") {
			return "wallet";
		}
	};
	const togglesetIsMaxTrack = () => {
		setIsMaxTrack(!isMaxTrack);
	};
	return (
		<SafeAreaView style={theme.container}>
			<ScrollView>
				<TouchableOpacity
					style={Platform.OS === "ios" ? theme.topView : theme.topViewAndroid}
					onPress={navigate}
				>
					<Ionicons
						name="chevron-back-outline"
						color={isDarkMode ? myDarkColors.blue : myColors.blue}
						size={32}
					/>
					<Text style={theme.topText}>Back</Text>
				</TouchableOpacity>
				<Text style={theme.mainTitle}>{handleTitle()}</Text>
				<Text style={theme.title}>Order Info:</Text>
				<ServiceItem service={notification.data[0].service_info} />
				<View style={theme.row}>
					<Text style={theme.title}>Method of payment: </Text>
					{notification.data[0].order_info.payments.type === "yallacoin" ? (
						<Image
							source={require("../assets/images/YallaCoin.png")}
							style={theme.yallacoin}
						/>
					) : (
						<View style={theme.typeIcon}>
							<Ionicons
								name={handleTypeIcon()}
								color={isDarkMode ? myDarkColors.blue : myColors.blue}
								size={20}
							/>
						</View>
					)}
					<Text style={theme.typeText}>{handleType()}</Text>
				</View>
				<Text style={theme.title}>Date: {formattedDate}</Text>
				<Text style={theme.title}>Order Tacking</Text>
				<View style={theme.trackRow}>
					<View
						style={[
							theme.circle,
							(notification.data[0].order_info.status === "waiting") |
								(notification.data[0].order_info.status === "inprogress") |
								(notification.data[0].order_info.status === "done") && {
								backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
							},
						]}
					></View>
					<View
						style={[
							theme.circle,
							(notification.data[0].order_info.status === "inprogress") |
								(notification.data[0].order_info.status === "done") && {
								backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
							},
						]}
					></View>
					<View
						style={[
							theme.circle,
							notification.data[0].status === "done" && {
								backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
							},
						]}
					></View>
					<View
						style={[
							theme.rectangle,
							(notification.data[0].order_info.status === "inprogress") |
								(notification.data[0].order_info.status === "done") && {
								backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
							},
						]}
					></View>
					<View
						style={[
							theme.rectangle,
							{ left: "50%" },
							notification.data[0].order_info.status === "done" && {
								backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
							},
						]}
					></View>
				</View>
				<View style={theme.trackRowText}>
					<Text style={theme.statusText}>Waiting</Text>
					<Text style={theme.statusText}>In Progress</Text>
					<Text style={theme.statusText}>Complete</Text>
				</View>
				<View style={theme.mapOptions}>
					<TouchableOpacity
						style={theme.mapOptionsTouchable}
						onPress={togglesetIsMaxTrack}
					>
						<Text style={theme.maximize}>Maximize</Text>
						<View style={theme.arrowsCont}>
							<View style={theme.arrowUp}>
								<Ionicons
									name="expand"
									color={isDarkMode ? myDarkColors.black : myColors.white}
									size={12}
								/>
							</View>
						</View>
					</TouchableOpacity>
				</View>
				<View style={theme.map}>
					<LiveTrack userLocation={notification.data[0].address_info} />
				</View>
			</ScrollView>
			{isMaxTrack && (
				<View style={theme.darkBg}>
					<TouchableOpacity
						onPress={togglesetIsMaxTrack}
						style={theme.closeMap}
					>
						<Ionicons
							name="close"
							color={isDarkMode ? myDarkColors.black : myColors.white}
							size={30}
						/>
					</TouchableOpacity>
					<View style={isMaxTrack ? theme.maxMap : theme.map}>
						<LiveTrack userLocation={notification.data[0].address_info} />
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default NotificationInfo;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myColors.white,
	},
	topView: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	topViewAndroid: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		marginTop: "8%",
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.blue,
	},
	yallacoin: {
		width: 20,
		height: 20,
	},
	row: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
	},
	trackRow: {
		flexDirection: "row",
		width: "90%",
		alignItems: "center",
		marginHorizontal: 16,
		justifyContent: "space-between",
	},
	circle: {
		width: 45,
		height: 45,
		backgroundColor: myColors.grey,
		borderRadius: "100%",
	},
	rectangle: {
		width: "50%",
		height: 15,
		backgroundColor: myColors.grey,
		borderRadius: "100%",
		position: "absolute",
		zIndex: -1,
	},
	trackRowText: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 12,
		justifyContent: "space-between",
	},
	title: {
		margin: 8,
		fontFamily: "SF-medium",
		color: myColors.blue,
		fontSize: 16,
	},
	mainTitle: {
		margin: 8,
		fontFamily: "SF-bold",
		color: myColors.blue,
		fontSize: 20,
		alignSelf: "center",
	},
	typeIcon: {
		marginRight: 4,
	},
	statusText: {
		fontFamily: "SF",
		margin: 8,
	},
	typeText: {},
	map: {
		width: "90%",
		aspectRatio: 2,
		alignSelf: "center",
	},
	mapOptions: {
		width: "90%",
		justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "gray",
		alignSelf: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	mapOptionsTouchable: {
		flexDirection: "row",
		alignItems: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 8,
	},
	arrowUp: {},
	arrowsCont: {},
	maximize: {
		fontFamily: "SF",
		fontSize: 14,
		marginHorizontal: 4,
		color: myDarkColors.black,
	},
	maxMap: {
		width: screenWidth,
		height: screenHeight * 0.8,
		zIndex: 100,
	},
	darkBg: {
		backgroundColor: "rgba(0,0,0,0.5)",
		width: screenWidth,
		height: screenHeight,
		position: "absolute",
		zIndex: 10,
		paddingVertical: "10%",
	},
	closeMap: {
		marginLeft: "90%",
		marginVertical:16
	},
});
const dark = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myDarkColors.white,
	},
	topView: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
	},
	topViewAndroid: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		marginTop: "8%",
	},
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myDarkColors.blue,
	},
	yallacoin: {
		width: 20,
		height: 20,
		marginHorizontal: 2,
	},

	title: {
		margin: 8,
		fontFamily: "SF-medium",
		color: myDarkColors.blue,
		fontSize: 16,
	},
	mainTitle: {
		margin: 8,
		fontFamily: "SF-bold",
		color: myDarkColors.blue,
		fontSize: 20,
		alignSelf: "center",
	},
	typeIcon: {
		marginRight: 4,
	},
	row: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
	},
	trackRow: {
		flexDirection: "row",
		width: "90%",
		alignItems: "center",
		marginHorizontal: 16,
		justifyContent: "space-between",
	},
	circle: {
		width: 45,
		height: 45,
		backgroundColor: myColors.grey,
		borderRadius: "100%",
	},
	rectangle: {
		width: "50%",
		height: 15,
		backgroundColor: myColors.grey,
		borderRadius: "100%",
		position: "absolute",
		zIndex: -1,
	},
	trackRowText: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 12,
		justifyContent: "space-between",
	},
	title: {
		margin: 8,
		fontFamily: "SF-medium",
		color: myDarkColors.blue,
		fontSize: 16,
	},
	mainTitle: {
		margin: 8,
		fontFamily: "SF-bold",
		color: myDarkColors.blue,
		fontSize: 20,
		alignSelf: "center",
	},
	typeIcon: {
		marginRight: 4,
	},
	statusText: {
		color: myDarkColors.black,
		fontFamily: "SF",
		margin: 8,
	},
	typeText: {
		color: myDarkColors.black,
	},
	map: {
		width: "90%",
		aspectRatio: 2,
		alignSelf: "center",
	},
	mapOptions: {
		width: "90%",
		justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "gray",
		alignSelf: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	mapOptionsTouchable: {
		flexDirection: "row",
		alignItems: "center",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 8,
	},
	arrowUp: {},
	arrowsCont: {},
	maximize: {
		fontFamily: "SF",
		fontSize: 14,
		marginHorizontal: 4,
		color: myDarkColors.black,
	},
	maxMap: {
		width: screenWidth,
		height: screenHeight * 0.8,
		zIndex: 100,
	},
	darkBg: {
		backgroundColor: "rgba(0,0,0,0.5)",
		width: screenWidth,
		height: screenHeight,
		position: "absolute",
		zIndex: 10,
		paddingVertical: "10%",
	},
	closeMap: {
		marginLeft: "90%",
		marginVertical:16
	},
});
