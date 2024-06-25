import {
	Dimensions,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
	SafeAreaView,
	Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { myColors, myDarkColors } from "../../utils/myColors";
import OrderListItem from "../../Components/OrderListItem";
import { Ionicons } from "react-native-vector-icons";
import axios from "axios";
import { getBearerToken } from "../../utils/bearer";
import { useMyColorTheme } from "../../utils/ThemeContext";
import Loading from "../../Components/Loading";

const OrdersHistory = ({ navigation, route }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const navigateBack = () => {
		navigation.goBack();
	};
	const [ordersHistory, setOrdersHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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

				let fetchedOrders = response.data;

				// Sort the fetched orders by updated_at date
				fetchedOrders.sort(
					(a, b) => new Date(b.updated_at) - new Date(a.updated_at)
				);

				setOrdersHistory(fetchedOrders);
				setIsLoading(false);
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

	const navigateToOrder = (order) => {
		navigation.navigate("OrderInfo", order);
	};

	if (isLoading) {
		return <Loading />;
	}

	return (
		<SafeAreaView style={theme.container}>
			<View
				style={Platform.OS === "ios" ? theme.topView : theme.topViewAndroid}
			>
				<TouchableOpacity style={theme.back} onPress={navigateBack}>
					<Ionicons name="chevron-back" color={myColors.blue} size={32} />
					<Text style={theme.topText}>Close</Text>
				</TouchableOpacity>
			</View>
			<View style={theme.titleCont}>
				<Text style={theme.title}>Orders History</Text>
			</View>
			<View>
				<FlatList
					style={theme.list}
					showsVerticalScrollIndicator={false}
					data={ordersHistory}
					keyExtractor={(item) => item.order_id.toString()}
					renderItem={({ item }) => (
						<OrderListItem notification={item} onNavigate={navigateToOrder} />
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OrdersHistory;

const styles = StyleSheet.create({
	container: {},
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
		marginTop: "8%",
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
		height: "90%",
	},
});

const dark = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myDarkColors.white,
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
	topViewAndroid: {
		marginLeft: 10,
		alignSelf: "flex-start",
		flexDirection: "row",
		alignItems: "center",
		marginTop: "8%",
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
		height: "90%",
	},
});
