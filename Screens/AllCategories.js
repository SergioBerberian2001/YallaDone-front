import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React from "react";
import ServiceHome from "../Components/ServiceHome";
import myColors from "../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import Category from "../Components/Category";

const AllCategories = ({ navigation, route }) => {
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
		navigation.navigate("CategoryServices", { category, services, loadCategory : true });
	};
	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity style={styles.topView} onPress={navigate}>
				<Ionicons name="chevron-back-outline" color={myColors.blue} size={32} />
				<Text style={styles.topText}>Back</Text>
			</TouchableOpacity>
			<Text style={styles.title}>All Categories</Text>
			<TouchableOpacity
				style={styles.category}
				onPress={() => {
					navigateToCategory("Car Services");
				}}
			>
				<Category />
			</TouchableOpacity>
            <TouchableOpacity
				style={styles.category}
				onPress={() => {
					navigateToCategory("Transportation Services");
				}}
			>
				<Category />
			</TouchableOpacity>
            <TouchableOpacity
				style={styles.category}
				onPress={() => {
					navigateToCategory("Paperwork Services");
				}}
			>
				<Category />
			</TouchableOpacity>
            <TouchableOpacity
				style={styles.category}
				onPress={() => {
					navigateToCategory("Delivery Services");
				}}
			>
				<Category />
			</TouchableOpacity>
			<View style={styles.ServiceContainer}></View>
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
	topText: {
		fontFamily: "SF-medium",
		fontSize: 16,
		color: myColors.blue,
	},
	category: {
		flex: 0.2,
		backgroundColor: myColors.blue,
        margin:16
	},
});
