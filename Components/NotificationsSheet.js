import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
	ActivityIndicator,
	Alert,
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
	const [reload, setReload] = useState(true);
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
		}, [reload])
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

	const showDeleteConfirmation = () => {
		Alert.alert(
			"Delete Notifications",
			"Are you sure you want to delete all your notifications?",
			[
				{ text: "Cancel", style: "cancel" },
				{ text: "Delete", onPress: handleClearAll },
			]
		);
	};

	const handleClearAll = async () => {
		try {
			const token = await getBearerToken();
			const response = await axios.delete(
				"http://192.168.1.100:8000/api/DeleteUserNotification",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// navigation.navigate("Splash");
			setReload(!reload);
		} catch (error) {
			console.error("Error fetching data:", error);
			if (error.response) {
				console.error("Status:", error.response.status);
				console.error("Data:", error.response.data);
			}
		}
	};

	const handleReadOneNotification = async (notId) => {
		try {
			const token = await getBearerToken();

			const notificationId = notId; // Assuming address_id is a number
			const url = `http://192.168.1.100:8000/api/markAsRead/${notificationId}`;

			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setReload(!reload);
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const handleReadAll = async () => {
		try {
			const token = await getBearerToken();
			const url = `http://192.168.1.100:8000/api/ReadAllUserNotification`;

			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log("success")
			setReload(!reload);
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
	};

	const handleDeleteOne = async (notId) => {
		try {
			const token = await getBearerToken();

			const notificationId = notId; 
			const url = `http://192.168.1.100:8000/api/DestroyUserNotifiation/${notificationId}`;

			const response = await axios.delete(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setReload(!reload);
		} catch (error) {
			console.error("Error:", error);
			throw error; // Throw the error to be caught by the caller
		}
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
								<Ionicons
									name="chevron-down"
									color={isDarkMode ? myDarkColors.blue : myColors.blue}
									size={28}
								/>
								<Text style={theme.topText}>Close</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={theme.clear}
								onPress={showDeleteConfirmation}
							>
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
										onRead={handleReadOneNotification}
										onDelete={handleDeleteOne}
									/>
								)}
							/>
							<TouchableOpacity style={theme.markAll} onPress={handleReadAll}>
								<Text style={theme.markAllText}>Mark all as read</Text>
							</TouchableOpacity>
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
		height: "80%",
	},
	indicatorView: {
		paddingTop: "20%",
	},
	markAll: {
		alignItems: "center",
		padding: 8,
		paddingTop: 12,
		width: "100%",
		borderTopColor: "#c1c1c1",
		borderTopWidth: 1,
	},
	markAllText: {
		fontSize: 18,
		fontFamily: "SF-medium",
		color: myColors.blue,
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
		borderColor: myDarkColors.black,
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
		height: "73%",
	},
	indicatorView: {
		paddingTop: "20%",
	},
	markAll: {
		alignItems: "center",
		padding: 8,
		paddingTop: 12,
		width: "100%",
		borderTopColor: "white",
		borderTopWidth: 1,
	},
	markAllText: {
		fontSize: 18,
		fontFamily: "SF-medium",
		color: myDarkColors.blue,
	},
	
});
