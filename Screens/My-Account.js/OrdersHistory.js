import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
	SafeAreaView,
	Platform
} from "react-native";
import React, { useEffect } from "react";
import myColors from "../../utils/myColors";
import OrderListItem from "../../Components/OrderListItem";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { getBearerToken } from "../../utils/bearer";

const orders = [
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
		title: " Your order has been accepted",
		description:
			"Description of notification 1 that will be a breif description",
		type: "order",
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


const OrdersHistory = ({ navigation, route }) => {
	const navigateBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = await getBearerToken();

				const response = await axios.get(
					"http://192.168.1.100:8000/api/getOrderHistory",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				// const userData = response.data.data;
				console.log(response.data)
			} catch (error) {
				console.error("Error fetching data:", error);
				if (error.response) {
					console.error("Status:", error.response.status);
					console.error("Data:", error.response.data);
				}
			}
		};

		fetchData();
	}, []);

	return (
		<SafeAreaView>
			<View style={Platform.OS === "ios" ? styles.topView : styles.topViewAndroid}>
				<TouchableOpacity style={styles.back} onPress={navigateBack}>
					<Ionicons name="chevron-back" color={myColors.blue} size={32} />
					<Text style={styles.topText}>Close</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.titleCont}>
				<Text style={styles.title}>Orders History</Text>
			</View>
			<View>
				<FlatList
					style={styles.list}
					showsVerticalScrollIndicator={false}
					data={orders}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <OrderListItem notification={item} />}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OrdersHistory;

const styles = StyleSheet.create({
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
	topViewAndroid: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		marginTop:"8%"
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
