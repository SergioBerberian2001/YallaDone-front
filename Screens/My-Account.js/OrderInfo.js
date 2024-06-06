import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	SafeAreaView,
	Platform,
	Image,
} from "react-native";
import React from "react";
import { useMyColorTheme } from "../../utils/ThemeContext";
import { Ionicons } from "react-native-vector-icons";
import { myColors, myDarkColors } from "../../utils/myColors";
import ServiceItem from "../../Components/ServiceItem";
import { parseISO } from "date-fns";
import { format, utcToZonedTime } from "date-fns-tz";

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
const OrderInfo = ({ navigation, route }) => {
	const order = route.params;
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;

    const date = parseISO(order.created_at);

	// // Step 2: Convert the timestamp to the desired time zone
	// //   const zonedDate = utcToZonedTime(date, timeZone);

	// Step 3: Format the timestamp into the desired output format
	const formattedDate = format(date, "dd/MM/yyyy - hh:mm ");

	const navigate = () => {
		navigation.goBack();
	};

	const handleTitle = () => {
		if (order.status === "waiting") {
			return "Your order has been placed";
		} else if (order.status === "inprogress") {
			return "Your order is in Progress";
		} else if (order.status === "done") {
			return "Your order is complete";
		}
	};

	const handleType = () => {
		if (order.payment.type === "visa") {
			return "Visa Card";
		} else if (order.payment.type === "cash") {
			return "Cash On Delivery";
		} else if (order.payment.type === "yallacoin") {
			return "YALLACOINS";
		}
	};

	const handleTypeIcon = () => {
		if (order.payment.type === "visa") {
			return "card";
		} else if (order.payment.type === "cash") {
			return "wallet";
		}
	};
	return (
		<SafeAreaView style={theme.container}>
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
			<Text>{handleTitle()}</Text>
			<Text>Order Info:</Text>
			<ServiceItem service={order.service} />
			<View style={theme.row}>
				<Text>Method of payment: </Text>
				{order.payment.type === "yallacoin" ? (
					<Image
						source={require("../../assets/images/YallaCoin.png")}
						style={theme.yallacoin}
					/>
				) : (
					<Ionicons
						name={handleTypeIcon()}
						color={isDarkMode ? myDarkColors.blue : myColors.blue}
						size={20}
					/>
				)}
				<Text>{handleType()}</Text>
			</View>
            <Text>Date: {formattedDate}</Text>
			<Text>Order Tacking</Text>
			<View style={theme.trackRow}>
				<View
					style={[
						theme.circle,
						(order.status === "waiting") |
							(order.status === "inprogress") |
							(order.status === "done") && {
							backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
						},
					]}
				></View>
				<View
					style={[
						theme.circle,
						(order.status === "inprogress") | (order.status === "done") && {
							backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
						},
					]}
				></View>
				<View
					style={[
						theme.circle,
						order.status === "done" && {
							backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
						},
					]}
				></View>
				<View
					style={[
						theme.rectangle,
						(order.status === "inprogress") | (order.status === "done") && {
							backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
						},
					]}
				></View>
				<View
					style={[
						theme.rectangle,
						{ left: "50%" },
						order.status === "done" && {
							backgroundColor: isDarkMode ? myDarkColors.blue : myColors.blue,
						},
					]}
				></View>
			</View>
			<View style={theme.trackRowText}>
				<Text>Waiting</Text>
				<Text>In Progress</Text>
				<Text>Complete</Text>
			</View>
		</SafeAreaView>
	);
};

export default OrderInfo;

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
	},
});
