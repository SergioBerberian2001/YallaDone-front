import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
	call,
} from "react-native-reanimated";
import myColors from "../utils/myColors";
import NotificationListItem from "./NotificationListItem";
import { Ionicons } from "react-native-vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { getBearerToken } from "../utils/bearer";

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
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
const NotificationsSheet = (props) => {
	const { onToggle } = props;
	const translateY = useSharedValue(0);

	const context = useSharedValue({ y: 0 });

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
					console.log(response.data);
					// setIsLoading(false);
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
	}

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

	return (
		<GestureDetector gesture={gesture}>
			<Animated.View style={[styles.bottmSheetCont, rBottomSheetStyle]}>
				<View style={styles.bg}>
					<View style={styles.topView}>
						<TouchableOpacity style={styles.back} onPress={toggleSheet}>
							<Ionicons name="chevron-back" color={myColors.blue} size={32} />
							<Text style={styles.topText}>Close</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.clear}>
							<Text style={styles.topText}>Clear all</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.titleCont}>
						<Text style={styles.title}>Notifications</Text>
					</View>
					<View>
						<FlatList
							style={styles.list}
							showsVerticalScrollIndicator={false}
							data={notifications}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (
								<NotificationListItem notification={item} />
							)}
						/>
					</View>
				</View>
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
});
