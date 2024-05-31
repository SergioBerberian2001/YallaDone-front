import {
	StyleSheet,
	Text,
	View,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import ServiceHome from "../Components/ServiceHome";
import myColors from "../utils/myColors";
import { Ionicons } from "react-native-vector-icons";
import Loading from "../Components/Loading";
import axios from "axios";

const CategoryServices = ({ navigation, route }) => {
	const { category, services, loadCategory } = route.params;
	const [myServices, setMyServices] = useState();
	const [isLoading, setIsLoading] = useState();

	const updateUrl = async () => {
		if (category === "Car Services") {
			return `http://192.168.1.100:8000/api/car-services`;
		} else if (category === "Transportation Services") {
			return `http://192.168.1.100:8000/api/transportation-services`;
		} else if (category === "Paperwork Services") {
			return `http://192.168.1.100:8000/api/paperwork-services`;
		} else if (category === "Delivery Services") {
			return `http://192.168.1.100:8000/api/delivery-services`;
		}
	};

	useEffect(() => {
		if (services) {
			setMyServices(services);
		} else if (loadCategory) {
			const fetchData = async () => {
				const categoryUrl = await updateUrl();
				try {
					const response = await axios.get(categoryUrl);
					// console.log(response.data);
					setMyServices(response.data);
					setIsLoading(false);
				} catch (error) {
					console.error("Error fetching data:", error);
					if (error.response) {
						console.error("Status:", error.response.status);
						console.error("Data:", error.response.data);
					}
					console.log(mydata);
				}
			};

			fetchData();
		}
	}, []);
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

	if (isLoading) {
		return <Loading />;
	}
	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity style={styles.topView} onPress={navigate}>
				<Ionicons name="chevron-back-outline" color={myColors.blue} size={32} />
				<Text style={styles.topText}>Back</Text>
			</TouchableOpacity>
			<Text style={styles.title}>{category}</Text>
			<View style={styles.ServiceContainer}>
				<FlatList
					style={styles.carousel}
					showsVerticalScrollIndicator={false}
					data={myServices}
					keyExtractor={(item) => item.service_id.toString()}
					renderItem={({ item }) => (
						<ServiceHome
							service={item}
							onToggleFavorite={onToggleFavorite}
							onOrder={handleOrder}
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default CategoryServices;

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
});
