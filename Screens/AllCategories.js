import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
	Platform,
} from "react-native";
import React from "react";
import ServiceHome from "../Components/ServiceHome";
import { myColors, myDarkColors } from "../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import Category from "../Components/Category";
import { useMyColorTheme } from "../utils/ThemeContext";

const AllCategories = ({ navigation, route }) => {
	const { isDarkMode } = useMyColorTheme();
	const theme = isDarkMode ? dark : styles;
	const navigate = () => {
		navigation.goBack();
	};

	const onToggleFavorite = (serviceId, isFav) => {
		// setServices(
		// 	services.map((service) =>
		// 		service.service_id === serviceId ? { ...service, isFav } : service
		// 	)
		// );
	};

	const handleOrder = (order) => {
		navigation.navigate("OrderForm", order);
	};

	const navigateToCategory = (category, services) => {
		navigation.navigate("CategoryServices", {
			category,
			services,
			loadCategory: true,
		});
	};
	return (
		<SafeAreaView style={theme.container}>
			<TouchableOpacity
				style={Platform.OS === "ios" ? theme.topView : theme.topViewAndroid}
				onPress={navigate}
			>
				<Ionicons name="chevron-back-outline" color={myColors.blue} size={32} />
				<Text style={theme.topText}>Back</Text>
			</TouchableOpacity>
			<Text style={theme.title}>All Categories</Text>
			<TouchableOpacity
				style={theme.category}
				onPress={() => {
					navigateToCategory("Car Services");
				}}
			>
				<Category />
			</TouchableOpacity>
			<TouchableOpacity
				style={theme.category}
				onPress={() => {
					navigateToCategory("Transportation Services");
				}}
			>
				<Category />
			</TouchableOpacity>
			<TouchableOpacity
				style={theme.category}
				onPress={() => {
					navigateToCategory("Paperwork Services");
				}}
			>
				<Category />
			</TouchableOpacity>
			<TouchableOpacity
				style={theme.category}
				onPress={() => {
					navigateToCategory("Delivery Services");
				}}
			>
				<Category />
			</TouchableOpacity>
			<View style={theme.ServiceContainer}></View>
		</SafeAreaView>
	);
};

export default AllCategories;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myColors.white,
	},
	title: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myColors.blue,
		alignSelf: "center",
		margin: 16,
	},
	ServiceContainer: {
		alignItems: "center",
		width: "100%",
	},
	topView: {
		marginTop: 8,
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
	category: {
		flex: 0.2,
		backgroundColor: myColors.blue,
		margin: 16,
	},
});

const dark = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: myDarkColors.white,
	},
	title: {
		fontFamily: "SF-medium",
		fontSize: 20,
		color: myDarkColors.blue,
		alignSelf: "center",
		margin: 16,
	},
	ServiceContainer: {
		alignItems: "center",
		width: "100%",
	},
	topView: {
		marginTop: 8,
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
	category: {
		flex: 0.2,
		backgroundColor: myDarkColors.blue,
		margin: 16,
	},
});
