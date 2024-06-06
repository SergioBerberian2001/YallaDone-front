import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	call,
} from "react-native-reanimated";
import { myColors, myDarkColors } from "../utils/myColors";
import NotificationListItem from "./NotificationListItem";
import { Ionicons } from "react-native-vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { getBearerToken } from "../utils/bearer";
import { useMyColorTheme } from "../utils/ThemeContext";
import { isLabeledStatement } from "typescript";

const notifications = [
	{
		id: 0,
		title: " Your order has been accepted",
		description:
			"Description of notification 1 that will be a breif description",
		type: "order",
		created_at: "2024-05-30T19:20:49.000000Z",
		isRead: false,
	},
	{
		id: 1,
		title: " Your email has been accepted",
		description:
			"Description of notification 1 that will be a breif description",
		type: "email",
		created_at: "2024-05-30T19:20:49.000000Z",
		isRead: false,
	},
	{
		id: 2,
		title: " Your order has been accepted",
		description:
			"Description of notification 1 that will be a breif description",
		type: "order",
		created_at: "2024-05-30T19:20:49.000000Z",
		isRead: true,
	},
];

// {
// 	"id": "68141c51-51aa-4d87-bc23-638c039650ae",
// 	"type": "App\\Notifications\\OrderNotification",
// 	"notifiable_type": "App\\Models\\users",
// 	"notifiable_id": 6,
// 	"data": [
// 		{
// 			"user_id": 6,
// 			"payment_id": 14,
// 			"form_id": 14,
// 			"status": "waiting",
// 			"updated_at": "2024-06-06T16:08:53.000000Z",
// 			"created_at": "2024-06-06T16:08:53.000000Z",
// 			"order_id": 14,
// 			"payments": {
// 				"payment_id": 14,
// 				"created_at": "2024-06-06T16:08:51.000000Z",
// 				"updated_at": "2024-06-06T16:08:51.000000Z",
// 				"user_id": 6,
// 				"type": "cash",
// 				"service_name": "Car Detailing",
// 				"price": 50
// 			},
// 			"service_forms": {
// 				"form_id": 14,
// 				"created_at": "2024-06-06T16:08:51.000000Z",
// 				"updated_at": "2024-06-06T16:08:51.000000Z",
// 				"user_id": 6,
// 				"Service_id": 1,
// 				"service_date": "2024-06-06 18:58:00",
// 				"user_name": "Sergio",
// 				"user_lastname": "Berberian",
// 				"email": "sergio@gmail.com",
// 				"phone_number": 78945623,
// 				"location": "Gggg",
// 				"additional_info": "Ggggg"
// 			}
// 		}
// 	],
// 	"read_at": null,
// 	"created_at": "2024-06-06T16:08:53.000000Z",
// 	"updated_at": "2024-06-06T16:08:53.000000Z"
// }
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
const NotificationsSheet = (props) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const { onToggle } = props;
	const navigation = useNavigation();
	const [myNotifications, setMyNotifications] = useState();
	const translateY = useSharedValue(0);
	const context = useSharedValue({ y: 0 });
	const [isLoading, setIsLoading] = useState(true);
	useFocusEffect(
		React.useCallback(() => {
			const fetchData = async () => {
				try {
					const token = await getBearerToken();
					const response = await axios.get(
						"http://192.168.1.100:8000/api/getUserNotification",
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					setMyNotifications(response.data);
					setIsLoading(false);
				} catch (error) {
					console.error("Error fetching data:", error);
					// Handle errors appropriately
				}
			};

			fetchData();
		}, [])
	);

	const toggleSheet = () => {
		translateY.value = withSpring(0, { damping: 50 });
		setTimeout(() => {
			onToggle(); // Toggle notification sheet visibility
		}, 1000); // Delay for 1 second (1000 milliseconds)
	};

	const gesture = Gesture.Pan().onEnd(() => {
		if (translateY.value > -SCREEN_HEIGHT / 3) {
			translateY.value = withSpring(0, { damping: 50 });
		}
	});

	useEffect(() => {
		translateY.value = withSpring(-SCREEN_HEIGHT * 0.8, { damping: 50 });
	}, []);

	const rBottomSheetStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateY: translateY.value }],
		};
	});

	const navigateToNotificationInfo = (notification) => {
		navigation.navigate("NotificationInfo", notification);
	};

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[theme.bottmSheetCont, rBottomSheetStyle]}>
				{isLoading ? (
					<View style={theme.indicatorView}>
						<ActivityIndicator
							color={isDarkMode ? "white" : "gray"}
							size={30}
						/>
					</View>
				) : (
					<View style={theme.bg}>
						<View style={theme.topView}>
							<TouchableOpacity style={theme.back} onPress={toggleSheet}>
								<Ionicons name="chevron-down" color={myColors.blue} size={28} />
								<Text style={theme.topText}>Close</Text>
							</TouchableOpacity>
							<TouchableOpacity style={theme.clear}>
								<Text style={theme.topText}>Clear all</Text>
							</TouchableOpacity>
						</View>
						<View style={theme.titleCont}>
							<Text style={theme.title}>Notifications</Text>
						</View>
						<View>
							<FlatList
								style={theme.list}
								showsVerticalScrollIndicator={false}
								data={myNotifications}
								keyExtractor={(item) => item.id.toString()}
								renderItem={({ item }) => (
									<NotificationListItem
										notification={item}
										onNavigate={navigateToNotificationInfo}
									/>
								)}
							/>
						</View>
					</View>
				)}
			</Animated.View>
		</GestureDetector>
	);
};

export default NotificationsSheet;

const styles = StyleSheet.create({
	bottmSheetCont: {
		height: SCREEN_HEIGHT,
		width: "100%",
		backgroundColor: myColors.dirtyWhite,
		position: "absolute",
		top: SCREEN_HEIGHT,
		borderRadius: 25,
	},
	line: {
		width: 75,
		height: 4,
		backgroundColor: myColors.blue,
		alignSelf: "center",
		marginVertical: 15,
		borderRadius: 2,
	},
	title: {
		fontSize: 20,
		fontFamily: "SF-medium",
		color: myColors.blue,
	},
	titleCont: {
		paddingVertical: 4,
		width: "100%",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#c1c1c1",
	},
	topView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	back: {
		padding: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	topText: {
		fontSize: 16,
		fontFamily: "SF-medium",
		color: myColors.blue,
	},
	clear: {
		padding: 8,
	},
	list: {
		height: "70%",
	},
	indicatorView: {
		paddingTop: "20%",
	},
});

const dark = StyleSheet.create({
	bottmSheetCont: {
		height: SCREEN_HEIGHT,
		width: "100%",
		backgroundColor: myDarkColors.dirtyWhite,
		position: "absolute",
		top: SCREEN_HEIGHT,
		borderRadius: 25,
	},
	line: {
		width: 75,
		height: 4,
		backgroundColor: myDarkColors.blue,
		alignSelf: "center",
		marginVertical: 15,
		borderRadius: 2,
	},
	title: {
		fontSize: 20,
		fontFamily: "SF-medium",
		color: myDarkColors.blue,
	},
	titleCont: {
		paddingVertical: 4,
		width: "100%",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: "#c1c1c1",
	},
	topView: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	back: {
		padding: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	topText: {
		fontSize: 16,
		fontFamily: "SF-medium",
		color: myDarkColors.blue,
	},
	clear: {
		padding: 8,
	},
	list: {
		height: "70%",
	},
	indicatorView: {
		paddingTop: "20%",
	},
});
